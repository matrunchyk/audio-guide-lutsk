<template>
  <div class="flex-grow flex mb-3 cursor-pointer justify-center">
    <img alt=""
         @click="setRating(1)"
         class="flex-none"
         :src="star >= 1 ? require('@/assets/svg/stars/full.svg') : require('@/assets/svg/stars/full.svg')">
    <img alt=""
         @click="setRating(2)"
         class="flex-none"
         :src="star >= 2 ? require('@/assets/svg/stars/full.svg') : require('@/assets/svg/stars/full.svg')">
    <img alt=""
         @click="setRating(3)"
         class="flex-none"
         :src="star >= 3 ? require('@/assets/svg/stars/full.svg') : require('@/assets/svg/stars/full.svg')">
    <img alt=""
         @click="setRating(4)"
         class="flex-none"
         :src="star >= 4 ? require('@/assets/svg/stars/full.svg') : require('@/assets/svg/stars/full.svg')">
    <img alt=""
         @click="setRating(5)"
         class="flex-none"
         :src="star >= 5 ? require('@/assets/svg/stars/full.svg') : require('@/assets/svg/stars/full.svg')">
  </div>
</template>

<script lang="ts">
import Application from '@/models/Application';
import { computed, defineComponent } from 'vue';
import { event } from 'vue-gtag';

export default defineComponent({
  name: "VenueRating",
  props: {
    rated: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup() {
    const venue = Application.ratingVenue;
    const star = computed(() => venue.value?.rating);

    function setRating(num) {
      if (!venue.value) return;
      venue.value.rating = num;

      event('venue-set-rating', {
        value: `venue: ${venue.value?.localizations?.[0]?.name}, rating: ${num}`,
      });
    }

    return {
      star,
      setRating,
    };
  },
});
</script>
