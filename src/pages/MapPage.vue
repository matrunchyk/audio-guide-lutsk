<template>
  <div class="MapPage">
    <AppMap/>
  </div>
<!--  <RouteModal/>-->
</template>

<script>
// import RouteModal from '../components/RouteModal.vue';
import AppMap from "@/components/AppMap.vue"

export default {
  name: "map-page",
  components: {
    // RouteModal
    AppMap,
  },
}
</script>
