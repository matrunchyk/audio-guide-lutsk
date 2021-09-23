<template>
  <div class="z-10 Tutorial absolute inset-0 bg-opacity-60 flex justify-center content-center bg-black w-full flex-col items-center gap-1">
    <div class="w-10/12 relative sm:w-2/5 bg-white py-5 text-sm rounded-xl">
      <icon-model-close
          class="w-4 absolute right-0 -mt-10  cursor-pointer"
          @click="Application.resetRatingVenue()" />
      <div class="text-center mb-2 text-xl font-semibold">Оцінити локацію</div>
      <div class="pb-4 text-center text-sm">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.</div>
      <venue-rating />
      <app-button @click="makeRated">Оцінити</app-button>

    </div>
    <ThankyouModal v-if="isRatingVenueForThankModal"/>
  </div>
</template>

<script lang="ts">
import AppButton from '@/components/AppButton.vue';
import VenueRating from '@/components/VenueRating.vue';
import Application from '@/models/Application';
import IconModelClose from '@/assets/svg/icon-modal-close.svg';
import ThankyouModal from '@/components/ThankyouModal.vue';
// import {computed} from "vue";


export default {
  name: "RateVenueModal",
  components: {
    VenueRating,
    IconModelClose,
    AppButton,
    ThankyouModal,
  },
  setup() {
    const venues = Application.venues;
    // const isRated = computed(() => {
    //   return  !!(venues.value.filter((venue) => venue.isFavorite === true).length);
    // })

    function makeRated() {
      Application.setThankYouModalOpen(true)
    }
    return {
      venues,
      Application,
      isRatingVenueForThankModal: Application.isRatingVenueForThankModal,
      makeRated
    }
  }
};
</script>

<style scoped>

</style>
