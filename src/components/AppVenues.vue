<template>
  <div class="app-venues relative mt-16">
    <AppVenue
        v-for="venue in venues"
        :key="venue.index"
        :venue="venue"/>
    <VenueDetail v-if="detailVenue"/>
  </div>
</template>

<script lang="ts">
import Application from '@/models/Application';
import {defineAsyncComponent} from "vue";

export default {
  name: "AppVenues",
  components: {
    AppVenue: defineAsyncComponent(() => import('@/components/AppVenue.vue')),
    VenueDetail: defineAsyncComponent(() => import('@/components/VenueDetail.vue')),
  },
  setup() {
    return {
      venues: Application.venues,
      detailVenue: Application.detailVenue,
    };
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  .app-venues {
    margin-top: 100px;
  }
}
</style>


