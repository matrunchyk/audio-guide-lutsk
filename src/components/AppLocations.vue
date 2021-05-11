<template>
  <div class="AppLocations">
    <LocationItem/>
    <LocationItem/>
    <LocationItem/>
    <LocationItem/>
  </div>
</template>

<script>
import LocationItem from './LocationItem.vue'

export default {
  name: "AppLocations",
  components: {
    LocationItem
  }
}
</script>

<style scoped>

</style>