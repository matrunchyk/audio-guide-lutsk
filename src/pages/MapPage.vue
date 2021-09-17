<template>
  <div class="MapPage">
    <div id="google-map" ref="googleMap">
    </div>

  </div>
<!--  <RouteModal/>-->
</template>

<script>
// import RouteModal from '../components/RouteModal.vue';
import GoogleMapsApiLoader from 'google-maps-api-loader'

export default {
  name: "map-page",
  components: {
    // RouteModal
  },
  data: () => ({
    apiKey: "AIzaSyDPLBnaFBaQa3XTLMSNnv_D_x8K0ZiHSBA"
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
      const lutsk = { lat: 50.76702937034824, lng: 25.308253865549478 };
      const mapContainer = this.$refs.googleMap;
      console.log(mapContainer);
      this.map = new this.google.maps.Map(
          mapContainer, {
            zoom: 4,
            center: lutsk,
          }
      )
    }
  }
}
</script>

<style scoped>
.MapPage {
  height: calc(100vh - 96px);
  width: 1000px;
}
#google-map {
  height: 100%;
}
</style>