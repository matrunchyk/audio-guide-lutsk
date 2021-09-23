<template>
  <div class="z-0 Map h-screen">
    <div class="google-map h-full" id="google-map" ref="googleMap"></div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';
import takeData from '@/components/use/useMap.ts';
import Application from "@/models/Application";

export default {
  name: "map-page",
  components: {},
  data: () => ({
    apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
    google: null,
    map: null,

  }),
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    })
    this.google = googleMapApi
    this.initializeMap()

  },
  methods: {
    initializeMap() {
      const lutsk = {lat: 50.74734154237352, lng: 25.324579628477217};
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(
          mapContainer, {
            zoom: 14,
            center: lutsk,
          }
      )

      this.generateMarker()
      this.myGeoPosition()
      takeData().initMap(this.google, this.map);
    },
    createMarker(lat, lng, icon) {
      return new this.google.maps.Marker({
        position: {lat, lng},
        map: this.map,
        icon
      })
    },
    myGeoPosition() {
      if (!navigator.geolocation) return
      navigator.geolocation.getCurrentPosition(position => {
            this.createMarker(position.coords.latitude, position.coords.longitude, '/marker-icons/user-location-icon.svg');
          },
          error => {
            console.log(error.message)
            this.createMarker(50.754311645428764, 25.332929592093258);
          })

    },
    generateMarker() {
      // const images = '/img/marker-church-icon.svg';
      // const icon = {
      //   path: "M17.6405 13.7825V18.1673V18.1818H20.3127V15.327L17.6405 13.7825Z, M5.68182 18.1818H8.354V18.1673V13.7791L5.68182 15.327V18.1818Z, M8.82587 12.2867V18.1672H11.5654V15.6741C11.5654 14.8921 12.1994 14.2582 12.9813 14.2582H13.0128C13.7948 14.2582 14.4287 14.8921 14.4287 15.6741V18.1672H17.1683V12.2867L12.9971 8.82666L8.82587 12.2867Z, M6.9798 11.6744L7.68755 12.5333L12.9972 8.15816L18.3068 12.5333L19.0146 11.6744L13.3275 6.98836V5.94557H14.3484V5.28483H13.3275V4.54541H12.6668V5.28483H11.6459V5.94557H12.6668V6.98836L6.9798 11.6744Z",
      //   fillColor: "black",
      //   strokeWeight: 0,
      //   fillOpacity: 0.9,
      //   scale: 2,
      //
      // }
      Application.venues.value.forEach((venue) => {


        if(venue.isRecommended) {
          venue.marker = this.createMarker(+venue.lat, +venue.lng, venue.markerIconRecommended)
        } else {
          venue.marker = this.createMarker(+venue.lat, +venue.lng, venue.markerIcon)
        }
      })
    }
  },
}
</script>
