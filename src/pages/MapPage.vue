<template>
  <div class="MapPage">
    <AppMap/>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "map-page",
  components: {
    AppMap: defineAsyncComponent(() => import('@/components/AppMap.vue')),
  },
}
</script>
