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
      <app-button @click="makeRated">Оцінити</app-button>

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
    const locationRating = ref(new LocationRating());

    async function makeRated() {
      // @ts-ignore
      locationRating.value.guestUuid = localStorage.getItem('guestUuid');
      locationRating.value.rating = 3;
      // @ts-ignore
      locationRating.value.locationUuid = '3051ccaa-5855-40b2-a64f-a37309031c4a';
      await locationRating.value.create();
      // console.log(locationRating.value);
      Application.setThankYouModalOpen(true);
    }

    return {
      venues,
      Application,
      isRatingVenueForThankModal: Application.isRatingVenueForThankModal,
      makeRated,
      locationRating,
    };
  }
};
</script>

