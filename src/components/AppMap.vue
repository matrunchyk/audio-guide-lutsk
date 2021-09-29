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
  data: () => ({
    apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
    google: null,
    map: null,
  }),
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey,
    });
    this.google = googleMapApi;
    this.initializeMap();
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
      );
      this.generateMarker();
      this.generateMyGeoPosition();
      takeData().initMap(this.google, this.map);
    },
    createMarker(lat, lng, icon) {
      return new this.google.maps.Marker({
        position: {lat, lng},
        map: this.map,
        icon,
      });
    },
    generateMyGeoPosition() {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(position => {
            this.createMarker(position.coords.latitude, position.coords.longitude, '/marker-icons/user-location-icon.svg');
          },
          error => {
            console.log(error.message);
            this.createMarker(50.754311645428764, 25.332929592093258);
          })
    },
    generateMarker() {
      Application.venues.value.forEach((venue) => {
        if (venue.isRecommended) {
          venue.marker = this.createMarker(+venue.lat, +venue.lng, venue.markerIconRecommended);
        } else {
          venue.marker = this.createMarker(+venue.lat, +venue.lng, venue.markerIcon);
        }
      });
    }
  },
}
</script>
