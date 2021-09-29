<template>
  <div class=" inset-0 bg-black bg-opacity-50 flex justify-end absolute px-2">

    <div class="bg-white rounded-lg bottom-0 px-5 pt-2.5 -m-1.5 fixed pb-7">
      <div class="w-30 z-50 absolute ml-80 -mt-8">
        <icon-model-close
            class="w-4 sm:-ml-8 cursor-pointer"
            @click="backToNormalZoom()"/>
      </div>
      <div class="flex justify-center mb-1 cursor-pointer">
        <icon-collapse
            v-if="!venueMinimized"
            @click="Application.setDetailVenueMinimized(true)"
        />
        <icon-expand
            v-else
            @click="Application.setDetailVenueMinimized(false)"/>
      </div>
      <img
          v-if="!venueMinimized"
          :src="venue.image"
          alt=""/>
      <div>
        <svg-bookmark
            v-if="venue.isFavorite && !venueMinimized"
            class="absolute top-6 right-6"
            :class="{
            'top-6': venue.firstRecommended && venue.recommended,
             'top-6': !(venue.firstRecommended && venue.recommended),
           }"
        />
      </div>
      <div class="mt-2 mb-3 text-center font-semibold">{{ venue.name }}</div>
      <div v-if="!venueMinimized"
           class="text-xs text-center">{{ venue.description }}
      </div>
      <app-player/>
      <div v-if="!venueMinimized"
           class="flex justify-between mt-5">
        <div @click="showOnMap" class="underline text-xs cursor-pointer">Показати на карті</div>
        <div v-if="!venue.isFavorite" @click="toggleFavorite" class="underline text-xs cursor-pointer">Додати в обрані
        </div>

        <div v-else @click="toggleFavorite" class="underline text-xs cursor-pointer">Прибрати з Обраних</div>
      </div>
      <app-button @click="generateRoute" v-if="!venueMinimized && venue.isFavorite"
                  class="mt-4 flex">
        <icon-route class="text-white"/>
        Прокласти маршрут
      </app-button>
    </div>
  </div>
</template>

<script lang="ts">
import Application from '@/models/Application';
import takeData from '@/components/use/useMap.ts';
import {defineAsyncComponent} from "vue";

export default {
  name: "VenueDetail",
  components: {
    AppPlayer: defineAsyncComponent(() => import('@/components/AppPlayer.vue')),
    IconCollapse: defineAsyncComponent(() => import('@/assets/svg/icon-collapse.svg')),
    IconExpand: defineAsyncComponent(() => import('@/assets/svg/icon-expand.svg')),
    IconModelClose: defineAsyncComponent(() => import('@/assets/svg/icon-modal-close.svg')),
    IconRoute: defineAsyncComponent(() => import('@/assets/svg/icon-route.svg')),
    AppButton: defineAsyncComponent(() => import('@/components/AppButton.vue')),
    SvgBookmark: defineAsyncComponent(() => import('@/assets/svg/bookmark.svg')),
  },
  setup() {
    const mapData = takeData();
    const venue = Application.detailVenue;
    const venues = Application.venues;

    function toggleFavorite() {
      if (venue.value === null) return;
      venue.value.toggleFavorite();
    }

    function generateRoute() {
      venues.value.forEach(venue => {
        if (!venue.isFavorite) return;
        venue.generateRoute();
      });
    }

    function showOnMap() {
      if (venue.value === null) return;
      mapData.getMapData().map.setZoom(17);
      mapData.getMapData().map.setCenter(new (mapData.getMapData()).google.maps.LatLng(venue.value.lat, venue.value.lng));
    }

    function backToNormalZoom() {
      Application.resetDetailVenue();
      mapData.getMapData().map.setZoom(14);
    }

    return {
      venue,
      venues,
      venueMinimized: Application.detailVenueMinimized,
      Application,
      toggleFavorite,
      generateRoute,
      showOnMap,
      backToNormalZoom,
    };
  }
};
</script>

<style scoped>
.venue-detail {
  height: calc(100vh - 54px);
}
</style>
