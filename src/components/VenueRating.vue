<template>
  <div class="flex-grow flex mb-3 cursor-pointer justify-center">
    <component @click="setRating(1)" class="flex-none" :is="star >= 1 ? 'star-full' : 'star-empty'"></component>
    <component @click="setRating(2)" class="flex-none" :is="star >= 2 ? 'star-full' : 'star-empty'"></component>
    <component @click="setRating(3)" class="flex-none" :is="star >= 3 ? 'star-full' : 'star-empty'"></component>
    <component @click="setRating(4)" class="flex-none" :is="star >= 4 ? 'star-full' : 'star-empty'"></component>
    <component @click="setRating(5)" class="flex-none" :is="star >= 5 ? 'star-full' : 'star-empty'"></component>
  </div>
</template>

<script lang="ts">
import Application from '@/models/Application';
import {computed, defineAsyncComponent} from 'vue';

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
    const venue = Application.ratingVenue;
    //@ts-ignore
    const star = computed(() => venue.value.rating);
    function setRating(num) {
      if (!venue.value) return;
      venue.value.rating = num;
    }

    return {
      star,
      setRating,
    };
  },
};
</script>
