<template>
  <div class="z-0 Map h-screen">
    <div class="google-map h-full z-30" id="google-map" ref="googleMap"></div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';
import useMap from '@/components/use/useMap';
import Application from "../models/Application";

export default {
  name: "appMap",
  data: () => ({
    google: useMap().getMapData().google,
    map: useMap().getMapData().map,
  }),
  async mounted() {
    const loader = new Loader({
      apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
    })
    this.google = await loader.load();
    this.initializeMap();
    this.generateRoute();
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
      if (window.innerWidth <= 640) {
        this.generateMarker();
      }
      useMap().generateMyGeoPosition();
      useMap().initMap(this.google, this.map);
    },
    createMarker(lat, lng, icon) {
      return new this.google.maps.Marker({
        position: {lat, lng},
        map: this.map,
        icon,
      });
    },
    generateRoute() {
      Application.venues.value.forEach(venue => {
        if (!venue.isMakeRoute) return;
        venue.generateRoute();
      });
    },
    generateMarker() {
      Application.venues.value.forEach((venue) => {
        if (venue.isRecommended) {
          venue.marker = this.createMarker(+venue.lat, +venue.lng, venue.markerIconRecommended);
        } else {
          venue.marker = this.createMarker(+venue.lat, +venue.lng, venue.markerIcon);
        }
        venue.toggleFavorite();
      });
    }
  },
}
</script>
