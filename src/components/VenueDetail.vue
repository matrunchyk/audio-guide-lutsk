<template>
    <div class="inset-0 bg-black bg-opacity-50 flex justify-end absolute px-2"
         :style="{ height:  !venueMinimized ? '100%' : '0%'}">

      <div class="venue-detail-content bg-white rounded-lg bottom-0 px-1 pt-2.5 -m-1.5 ml-0.5 fixed pb-7"
           :class="{'venue-player':  venueMinimized}">
        <div class="w-30 z-50 absolute right-0 -mt-8">
          <icon-model-close
            class="w-4 cursor-pointer"
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
          class="px-3 object-cover"
          v-if="!venueMinimized"
          :src="venue.image"
          width="294"
          height="208"
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
        <div class="mt-2 mb-3 text-center font-semibold">{{ locationTitle }}</div>
        <div v-if="!venueMinimized"
             class="px-3 text-xs text-center">{{ locationDescription }}
        </div>
        <app-player />
        <div v-if="!venueMinimized"
             class="flex justify-between mt-5 px-3">
          <div @click="showOnMap" class="underline text-xs cursor-pointer">{{ $t('venues.show_on_map') }}</div>
          <div v-if="!venue.isFavorite" @click="toggleFavorite" class="underline text-xs cursor-pointer">{{ $t('venues.add_to_favourites') }}
          </div>

          <div v-else @click="toggleFavorite" class="underline text-xs cursor-pointer">{{ $t('venues.remove_from_favourites') }}</div>
        </div>
        <app-button @click="generateRoute" v-if="!venueMinimized && venue.isFavorite"
                    class="mt-4 flex ">
          <icon-route class="text-white"/>
          {{ $t('make_route') }}
        </app-button>
      </div>
    </div>
</template>

<script lang="ts">
import Application from '@/models/Application';
import useMap from '@/components/use/useMap.ts';
import {computed, defineAsyncComponent} from "vue";
import router from "@/router";
import { event } from 'vue-gtag';

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
    const mapData = useMap();
    const venue = Application.detailVenue;
    const venues = Application.venues;
    //@ts-ignore
    const locationTitle = computed(() => venue.value.localizations.find(l => l.language.code === Application.language.value).locationTitle || '');
    //@ts-ignore
    const locationDescription = computed(() => venue.value.localizations.find(l => l.language.code === Application.language.value).locationDescription || '');
    function toggleFavorite() {
      if (!venue.value) return;
      venue.value.isFavorite = !venue.value.isFavorite;
      if (!venue.value.isFavorite) {
        (mapData.getMapData()).directionsRenderer.setDirections({routes: []});
      }
      venue.value.toggleFavorite();

      event('venue-toggle-favorite', {
        // @ts-ignore
        value: `venue: ${venue.value?.localizations?.[0]?.name}, isFavorite: ${!venue.value.isFavorite}`,
      });
    }

    function generateRoute() {
      venues.value.forEach(venue => {
        if (!venue.isFavorite) return;
        venue.generateRoute();
      });
      if (window.innerWidth <= 640) {
        switchView('map');
      }
    }

    function switchView(name: string) {
      Application.setMenuOpen(false);
      return router.push({name});
    }

    function showOnMap() {
      if (!venue.value) return;
      if (window.innerWidth <= 640) {
        switchView('map');
      }
      mapData.getMapData().map.setZoom(17);
      mapData.getMapData().map.setCenter(new (mapData.getMapData()).google.maps.LatLng(venue.value.lat, venue.value.lng));
    }

    function backToNormalZoom() {
      Application.resetDetailVenue();
      if (!mapData.getMapData().map) return;
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
      locationTitle,
      locationDescription,
      switchView,
    };
  }
};
</script>

<style scoped>
.venue-detail-minimized {
  height: 0%;
}
.venue-detail {
  height: 100%;
}
.venue-player {
  min-width: 300px;
  width: 19%;
}
@media (max-width: 640px) {
  .venue-detail-content {
    width: 99%;
    left: 0px;
  }
  .venue-player {
    width: 99%;
  }
}
</style>
