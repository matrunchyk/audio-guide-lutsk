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
import router from "@/router";
import {event} from "vue-gtag";
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
      const marker = new google.value.maps.Marker({
        position: {lat, lng},
        map: map.value,
        icon,
      });
      marker.addListener("click", () => {
        Application.venues.value.forEach(venue => {
          if (+venue.lat === lat) {
            if (venue.isRecommended) {
              venue.marker?.setIcon(venue.markerIconRecommendedFavorite);
            } else {
              venue.marker?.setIcon(venue.markerIconFavorite);
            }
            venue.showDetail();
          }
        });
        if (window.innerWidth <= 640) {
          router.push({path: `/`});
        }
        map.value.setZoom(15);
      });
      return marker;
    }
    function generateShowOnMap() {
      Application.venues.value.forEach(venue => {
        if (!(useMap().getMapData())) return;
        if (!venue.isShowOnMap) return;
        if (venue.isRecommended) {
          venue.marker?.setIcon(venue.markerIconRecommendedFavorite);
        } else {
          venue.marker?.setIcon(venue.markerIconFavorite);
        }
        useMap().getMapData().map.setZoom(17);
        useMap().getMapData().map.setCenter(new (useMap().getMapData()).google.maps.LatLng(venue.lat, venue.lng));
      });
    }

    function generateRouteForMobile() {
      Application.venues.value.forEach(venue => {
        if (!venue.isMakeRoute) return;
        function createLatLng(lat: any, lng: any) {
          const latLng =  new google.value.maps.LatLng(lat, lng);
          return latLng;
        }

        function generateRoute() {
          // Sentry.captureMessage("Something went wrong");
          const directionsRenderer = new google.value.maps.DirectionsRenderer({suppressMarkers: true});
          const directionsService = new google.value.maps.DirectionsService();
          directionsRenderer.setMap(map.value);

          calculateAndDisplayRoute(directionsService, directionsRenderer);
        }

        function calculateAndDisplayRoute(
          directionsService: any,
          directionsRenderer: any,
      ) {
          Application.showLoader();
          const waypoints: { location: any; stopover: boolean; }[] = [];
          Application.venues.value.forEach(item => {
            if (item.isFavorite) {
              waypoints.push({
                location: createLatLng(+item.lat, +item.lng),
                stopover: true,
              });
            }
          });
          navigator.geolocation.watchPosition(position => {
              console.log('lat', position.coords.latitude);
              console.log('lng', position.coords.longitude);
              if (!venue) return;
              directionsService.route({
                origin: createLatLng(position.coords.latitude, position.coords.longitude),
                destination: createLatLng(+venue.lat, +venue.lng),
                waypoints: waypoints,
                optimizeWaypoints: true,
                travelMode: google.value.maps.TravelMode.WALKING,
              }).then((response: any) => {
                console.log(response);
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
    generateShowOnMap();
    });

    return {
      google,
      map,
      googleMap,
    };
  },
});
</script>
