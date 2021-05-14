<template>
  <div class="absolute inset-0 bg-black bg-opacity-50 flex venue-detail justify-end flex-col px-2">
    <div class="w-full pb-1">
      <icon-model-close
        class="w-4 ml-auto cursor-pointer"
        @click="Application.resetDetailVenue()" />
    </div>
    <div class="bg-white w-full rounded-lg bottom-0 px-5 pt-2.5 pb-7">
      <div class="flex justify-center mb-1 cursor-pointer">
        <icon-collapse />
      </div>
      <img
        :src="venue.image"
        alt="" />
      <div class="mt-2 mb-3 text-center font-semibold">{{ venue.name }}</div>
      <div class="text-xs text-center">{{ venue.description }}</div>
      <app-player/>
    </div>
  </div>
</template>

<script lang="ts">
import IconCollapse from '@/assets/icon-collapse.svg';
import IconModelClose from '@/assets/icon-modal-close.svg';
import AppPlayer from '@/components/AppPlayer.vue';
import Application from '@/models/Application';
import Venue from '@/models/Venue';
import { Ref } from 'vue';

export default {
  name: "VenueDetail",
  components: {
    AppPlayer,
    IconCollapse,
    IconModelClose,
  },
  setup() {
    return {
      venue: Application.detailVenue as Ref<Venue>,
      Application,
    }
  }
};
</script>

<style scoped>
.venue-detail {
  height: calc(100vh - 54px);
}
</style>
