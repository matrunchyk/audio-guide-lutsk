<template>
  <div class="z-0 Map h-screen">
    <div class="google-map h-full z-30" id="google-map" ref="googleMap"></div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';
import useMap from '@/components/use/useMap';
import Application from "../models/Application";
import { event } from 'vue-gtag';

export default {
  name: "appMap",
  data: () => ({
    google: null,
    map: null,
  }),
  async mounted() {
    const loader = new Loader({
      apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
    })
    this.google = await loader.load();
    this.initializeMap();
    this.generateRouteForMobile();
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
    generateRouteForMobile() {
      Application.venues.value.forEach(venue => {
        if (!venue.isMakeRoute) return;
         function createLatLng(lat, lng) {
          return new (useMap().getMapData()).google.maps.LatLng(lat, lng);
        }

        function generateRoute() {
          // Sentry.captureMessage("Something went wrong");
          useMap().getMapData().directionsRenderer.setMap(useMap().getMapData().map);

          calculateAndDisplayRoute(useMap().getMapData().directionsService, useMap().getMapData().directionsRenderer);
        }
        function calculateAndDisplayRoute(
          directionsService,
          directionsRenderer,
        ) {
          Application.showLoader();
          const waypoints = [];
          Application.venues.value.forEach(item => {
            if (item.isFavorite) {
              waypoints.push({
                location: createLatLng(item.lat, item.lng),
                stopover: true,
              });
            }
          });
          navigator.geolocation.getCurrentPosition(position => {
              if (!venue) return;
              directionsService.route({
                origin: createLatLng(position.coords.latitude, position.coords.longitude),
                destination: createLatLng(venue.lat, venue.lng),
                waypoints: waypoints,
                optimizeWaypoints: true,
                travelMode: (useMap().getMapData())?.google.maps.TravelMode.WALKING,
              }).then((response) => {
                directionsRenderer.setDirections(response);
                Application.hideLoader();
                event('calculate-route-success', {
                  value: `source: ${position.coords.latitude}, ${position.coords.longitude}; dest: ${venue.lat}, ${venue.lng}`,
                });
              });
            },
            error => {
              console.log(error.message);
              event('calculate-route-error', { error: error.message });
            })
        }
        generateRoute();
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
