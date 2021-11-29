<template>
  <div
    class="z-50 Tutorial absolute inset-0 bg-opacity-60 flex justify-center content-center bg-black w-full flex-col items-center gap-1">
    <div class="w-10/12 relative sm:w-2/5 bg-white py-5 text-sm rounded-xl">
      <img
        src="@/assets/svg/icon-modal-close.svg"
        alt=""
        width="16"
        height="16"
        class="w-4 absolute right-0 -mt-10  cursor-pointer"
        @click="Application.resetRatingVenue()" />
      <div class="text-center mb-2 text-xl font-semibold">{{ $t('modals.make_rate') }}</div>
      <div class="p-4 text-center text-sm">{{ $t('modals.make_rate_content') }}
      </div>
      <venue-rating />
      <app-button @click="makeRated">{{ venue.rated ? $t('venues.change_rating') : $t('venues.rate') }}</app-button>

    </div>
    <ThankyouModal v-if="isRatingVenueForThankModal" />
  </div>
</template>

<script lang="ts">
import Application from '@/models/Application';
import LocationRating from "@/models/LocationRating";
import Venue from '@/models/Venue';
import { defineAsyncComponent, defineComponent, Ref, ref } from "vue";

export default defineComponent({
  name: "RateVenueModal",
  components: {
    VenueRating: defineAsyncComponent(() => import(/* webpackPrefetch: true */ '@/components/VenueRating.vue')),
    AppButton: defineAsyncComponent(() => import(/* webpackPrefetch: true */ '@/components/AppButton.vue')),
    ThankyouModal: defineAsyncComponent(() => import(/* webpackPrefetch: true */ '@/components/ThankyouModal.vue')),
  },
  async setup() {
    const venues = Application.venues as Ref<Venue[]>;
    const venue = Application.ratingVenue as Ref<Venue | null>;
    const locationRating = ref(new LocationRating()) as Ref<LocationRating>;

    async function makeRated() {
      Application.showLoader();
      locationRating.value.guestUuid = localStorage.getItem('guestUuid') || '';
      if (!venue.value) return;
      locationRating.value.rating = venue.value.rating;
      locationRating.value.locationUuid = venue.value.uuid;
      if (venue.value.rated) {
        await locationRating.value.update();
      } else {
        await locationRating.value.create();
      }
      venue.value.rated = true;
      venue.value.averageRating = venue.value.rating;
      Application.hideLoader();
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
});
</script>

