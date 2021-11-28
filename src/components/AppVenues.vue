<template>
  <div class="app-venues relative mt-16">
    <AppVenue
        v-for="venue in venues"
        :key="venue.uuid"
        :venue="venue"/>
    <VenueDetail v-if="detailVenue"/>
  </div>
</template>

<script lang="ts">
import Application from '@/models/Application';
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  name: "AppVenues",
  components: {
    AppVenue: defineAsyncComponent(() => import(/* webpackPrefetch: true */ '@/components/AppVenue.vue')),
    VenueDetail: defineAsyncComponent(() => import(/* webpackPrefetch: true */ '@/components/VenueDetail.vue')),
  },
  setup() {
    return {
      venues: Application.venues,
      detailVenue: Application.detailVenue,
    };
  },
});
</script>

<style scoped>
@media (max-width: 640px) {
  .app-venues {
    margin-top: 100px;
  }
}
</style>


