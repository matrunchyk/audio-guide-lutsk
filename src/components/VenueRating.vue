<template>
  <div class="flex-grow flex mb-3 cursor-pointer justify-center">
    <star-full/>
    <star-full/>
    <star-full/>
    <star-full/>
    <star-empty/>
  </div>
</template>

<script lang="ts">
import Application from '@/models/Application';
import Venue from '@/models/Venue';
import {defineAsyncComponent, reactive} from 'vue';

export default {
  name: "VenueRating",
  components: {
    StarEmpty: defineAsyncComponent(() => import('@/assets/svg/stars/empty.svg')),
    StarFull: defineAsyncComponent(() => import('@/assets/svg/stars/full.svg')),
  },
  props: {
    rated: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup() {
    const venue: Venue | null = Application.ratingVenue.value;
    const stars = reactive(Array(5).fill(0).map((_, index) => ({
      index,
      fill: venue?.rated ? '#F1CD0F' : '#F1CD0F',
      rated: venue?.rating && venue?.rating <= index + 1,
    })));

    return {
      stars,
    }
  }
};
</script>
