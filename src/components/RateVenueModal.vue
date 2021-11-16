<template>
  <div
      class="z-10 Tutorial absolute inset-0 bg-opacity-60 flex justify-center content-center bg-black w-full flex-col items-center gap-1">
    <div class="w-10/12 relative sm:w-2/5 bg-white py-5 text-sm rounded-xl">
      <icon-model-close
          class="w-4 absolute right-0 -mt-10  cursor-pointer"
          @click="Application.resetRatingVenue()"/>
      <div class="text-center mb-2 text-xl font-semibold">Оцінити локацію</div>
      <div class="pb-4 text-center text-sm">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
      </div>
      <venue-rating/>
      <app-button @click="makeRated">{{ venue.rated ? 'Змінити оцінку' : 'Оцінити' }}</app-button>

    </div>
    <ThankyouModal v-if="isRatingVenueForThankModal"/>
  </div>
</template>

<script lang="ts">
import Application from '@/models/Application';
import {defineAsyncComponent, ref} from "vue";
import LocationRating from "@/models/LocationRating";

export default {
  name: "RateVenueModal",
  components: {
    VenueRating: defineAsyncComponent(() => import('@/components/VenueRating.vue')),
    IconModelClose: defineAsyncComponent(() => import('@/assets/svg/icon-modal-close.svg')),
    AppButton: defineAsyncComponent(() => import('@/components/AppButton.vue')),
    ThankyouModal: defineAsyncComponent(() => import('@/components/ThankyouModal.vue')),
  },
  async setup() {
    const venues = Application.venues;
    const venue = Application.ratingVenue;
    const locationRating = ref(new LocationRating());

    async function makeRated() {
      // @ts-ignore
      locationRating.value.guestUuid = localStorage.getItem('guestUuid');
      if (!venue.value) return;
      locationRating.value.rating = venue.value.rating;
      // @ts-ignore
      locationRating.value.locationUuid = venue.value.index;
      if (venue.value.rated) {
        await locationRating.value.update();
      } else {
        await locationRating.value.create();
      }
      venue.value.rated = true;
      venue.value.averageRating = venue.value.rating;
      Application.setThankYouModalOpen(true);
    }

    return {
      venues,
      Application,
      isRatingVenueForThankModal: Application.isRatingVenueForThankModal,
      makeRated,
      venue,
      locationRating,
    };
  }
};
</script>

