<template>
  <div class="Tutorial absolute inset-0 bg-opacity-60 flex justify-center content-center bg-black w-full flex-col items-center gap-1">
    <div class="w-2/4">
      <icon-model-close
        class="w-4 ml-auto cursor-pointer"
        @click="Application.resetRatingVenue()" />
    </div>
    <div class="w-2/4 bg-white py-5 px-12 text-sm rounded-md">
      <div class="text-center mb-2 text-xl font-semibold">Оцінити локацію</div>
      <div class="pb-4 text-center text-sm">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.</div>
      <venue-rating />
      <app-button>Оцінити</app-button>
    </div>
  </div>
</template>

<script lang="ts">
import AppButton from '@/components/AppButton.vue';
import VenueRating from '@/components/VenueRating.vue';
import Application from '@/models/Application';
import IconModelClose from '@/assets/icon-modal-close.svg';

export default {
  name: "RateVenueModal",
  components: {
    VenueRating,
    IconModelClose,
    AppButton,
  },
  setup() {
    return {
      Application,
    }
  }
};
</script>

<style scoped>

</style>
