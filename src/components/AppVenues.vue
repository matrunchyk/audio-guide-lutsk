<template>
  <div class="AppVenues relative">
    <AppVenue
        v-for="venue in venues"
        :key="venue.index"
        :venue="venue"/>
    <VenueDetail v-if="detailVenue"/>
  </div>
</template>

<script lang="ts">
import AppVenue from '@/components/AppVenue.vue';
import Application from '@/models/Application';
import VenueDetail from '@/components/VenueDetail.vue';

export default {
  name: "AppVenues",
  components: {
    AppVenue,
    VenueDetail,
  },
  setup() {
    // icon: image.abstract(20, 20) + '?index=' + item.index,
    return {
      venues: Application.venues,
      detailVenue: Application.detailVenue,
    };
  },
};
</script>


