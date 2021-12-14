<template>
  <div class="z-0 Map h-screen">
    <div class="google-map h-full z-30" id="google-map" ref="googleMap"></div>
  </div>
</template>

<script lang="ts">
import { Loader } from '@googlemaps/js-api-loader';
import useMap from '@/components/use/useMap';
import Application from "../models/Application";
import { defineComponent, ref, onMounted } from "vue";
// import { event } from 'vue-gtag';

export default defineComponent({
  name: "appMap",

  setup() {
    const googleMap = ref<HTMLElement>();
    const google = ref<any>(null);
    const map = ref<any>(null);

    function initializeMap() {
      const lutsk = {lat: 50.74734154237352, lng: 25.324579628477217};
      const mapContainer = googleMap.value;
      if (mapContainer) {
        map.value = new google.value.maps.Map(
          mapContainer, {
            zoom: 14,
            center: lutsk,
          }
        );
      }
      if (window.innerWidth <= 640) {
        generateMarker();
      }
      useMap().generateMyGeoPosition();
      useMap().initMap(google.value, map.value);
    }

    function createMarker(lat, lng, icon) {
      return new google.value.maps.Marker({
        position: {lat, lng},
        map: map.value,
        icon,
      });
    }

    function generateRouteForMobile() {
      Application.venues.value.forEach(venue => {
        if (!(useMap().getMapData())) return;
        if (!venue.isMakeRoute) return;
        venue.generateRoute();
        //     if (!venue.isMakeRoute) return;
        //      function createLatLng(lat, lng) {
        //       return new (useMap().getMapData()).google.maps.LatLng(lat, lng);
        //     }
        //
        //     function generateRoute() {
        //       // Sentry.captureMessage("Something went wrong");
        //       useMap().getMapData().directionsRenderer.setMap(useMap().getMapData().map);
        //
        //       calculateAndDisplayRoute(useMap().getMapData().directionsService, useMap().getMapData().directionsRenderer);
        //     }
        //     function calculateAndDisplayRoute(
        //       directionsService: any,
        //       directionsRenderer: any,
        //     ) {
        //       Application.showLoader();
        //       const waypoints: { location: any; stopover: boolean; }[] = [];
        //       Application.venues.value.forEach(item => {
        //         if (item.isFavorite) {
        //           waypoints.push({
        //             location: createLatLng(item.lat, item.lng),
        //             stopover: true,
        //           });
        //         }
        //       });
        //       navigator.geolocation.getCurrentPosition(position => {
        //           if (!venue) return;
        //           directionsService.route({
        //             origin: createLatLng(position.coords.latitude, position.coords.longitude),
        //             destination: createLatLng(venue.lat, venue.lng),
        //             waypoints: waypoints,
        //             optimizeWaypoints: true,
        //             travelMode: (useMap().getMapData())?.google.maps.TravelMode.WALKING,
        //           }).then((response) => {
        //             directionsRenderer.setDirections(response);
        //             Application.hideLoader();
        //             event('calculate-route-success', {
        //               value: `source: ${position.coords.latitude}, ${position.coords.longitude}; dest: ${venue.lat}, ${venue.lng}`,
        //             });
        //           });
        //         },
        //         error => {
        //           console.log(error.message);
        //           event('calculate-route-error', { error: error.message });
        //         })
        //     }
        //     generateRoute();
      });
    }

    function generateMarker() {
      Application.venues.value.forEach((venue) => {
        if (venue.isRecommended) {
          venue.marker = createMarker(+venue.lat, +venue.lng, venue.markerIconRecommended);
        } else {
          venue.marker = createMarker(+venue.lat, +venue.lng, venue.markerIcon);
        }
        venue.toggleFavorite();
      });
    }

    onMounted(async () => {
      const loader = new Loader({
      apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
    })
    google.value = await loader.load();
    await initializeMap();
    generateRouteForMobile();
    });

    return {
      google,
      map,
      googleMap,
    };
  },
});
</script>
