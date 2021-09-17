<template>
  <div class="Map">
    <div id="google-map" ref="googleMap"> </div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'

export default {
  name: "map-page",
  components: {

  },
  data: () => ({
    apiKey: "AIzaSyDPLBnaFBaQa3XTLMSNnv_D_x8K0ZiHSBA",
    google: null,
    map: null,
  }),
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    })
    this.google = googleMapApi
    this.initializeMap();

  },
  methods: {
    initializeMap() {
      const directionsRenderer = new this.google.maps.DirectionsRenderer();
      const directionsService = new this.google.maps.DirectionsService();
      const lutsk = { lat: 50.76702937034824, lng: 25.308253865549478 };
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(
          mapContainer, {
            zoom: 14,
            center: lutsk,
          }
      )
      directionsRenderer.setMap(this.map);

      this.createMarker(this.createLatLng(50.758741155650625, 25.350550096593707));
      this.createMarker(this.createLatLng(50.74270304771435, 25.323703361173983));
      this.calculateAndDisplayRoute(directionsService, directionsRenderer);

    },
    createLatLng(lat, lng) {
      return new this.google.maps.LatLng(lat, lng);
    },
    createMarker(latLng) {
      new this.google.maps.Marker({
        position: latLng,
        map: this.map,
      });
    },
    calculateAndDisplayRoute(
        directionsService,
        directionsRenderer,
    ) {

      directionsService.route({
        origin: this.createLatLng(50.758741155650625, 25.350550096593707),
        destination: this.createLatLng(50.74270304771435, 25.323703361173983),
        travelMode: this.google.maps.TravelMode.WALKING
      }).then((response) => {
        directionsRenderer.setDirections(response)
      })
    }
  },
}
</script>

<style scoped>
.Map {
  height: calc(100vh);
}
#google-map {
  height: 100%;
}
</style>