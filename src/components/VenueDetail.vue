<template>
  <div class="absolute inset-0 bg-black bg-opacity-50 flex venue-detail items-end">
    <div class="bg-white w-full rounded-lg mx-2 bottom-0 px-5 pt-2.5 pb-7">
      <icon-collapse/>
      <img :src="venue.image" alt=""/>
      {{ venue.name }}
    </div>
  </div>
</template>

<script lang="ts">
import IconCollapse from '@/assets/icon-collapse.svg';
import Application from '@/models/Application';
import Venue from '@/models/Venue';
import { Ref } from 'vue';

export default {
  name: "VenueDetail",
  components: {
    IconCollapse,
  },
  setup() {
    return {
      venue: Application.detailVenue as Ref<Venue>,
    }
  }
};
</script>

<style scoped>
.venue-detail {
  height: calc(100vh - 54px);
}
</style>
