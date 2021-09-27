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
import {reactive} from 'vue';
import StarEmpty from '@/assets/svg/stars/empty.svg';
import StarFull from '@/assets/svg/stars/full.svg';

export default {
  name: "VenueRating",
  components: {
    StarEmpty,
    StarFull,
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
