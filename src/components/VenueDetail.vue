<template>
  <div class="inset-0 bg-black bg-opacity-50 flex justify-end absolute px-2"
       :style="{ height:  !venueMinimized ? '100%' : '0%'}">

    <div class="venue-detail-content bg-white rounded-lg bottom-0 pt-2.5 -m-1.5 fixed pb-7 left-3"
         :class="{'venue-player':  venueMinimized}">
      <div class="w-30 z-50 absolute right-2 -mt-1">
        <img
          src="@/assets/svg/icon-close.svg"
          alt=""
          width="16"
          height="16"
          class="w-4 cursor-pointer"
          @click="backToNormalZoom()" />
      </div>
      <div class="flex justify-center mb-1 cursor-pointer">
        <img
          src="@/assets/svg/icon-collapse.svg"
          alt=""
          width="15"
          height="15"
          v-if="!venueMinimized"
          @click="Application.setDetailVenueMinimized(true)"
        />
        <img
          src="@/assets/svg/icon-expand.svg"
          alt=""
          width="15"
          height="15"
          v-else
          @click="Application.setDetailVenueMinimized(false)" />
      </div>
      <div
        class="px-3 bg-cover w-auto bg-no-repeat bg-center h-80 iphone678:h-60"
        v-if="!venueMinimized"
        :style="{backgroundImage: `url(${venue.image})`}" />
      <div>
        <img
          src="@/assets/svg/bookmark.svg"
          alt=""
          width="25"
          height="25"
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
        <div @click="showOnMap"
             class="underline text-xs cursor-pointer">{{ $t('venues.show_on_map') }}
        </div>
        <div v-if="!venue.isFavorite"
             @click="toggleFavorite"
             class="underline text-xs cursor-pointer">{{ $t('venues.add_to_favourites') }}
        </div>

        <div v-else
             @click="toggleFavorite"
             class="underline text-xs cursor-pointer">{{ $t('venues.remove_from_favourites') }}
        </div>
      </div>
      <app-button @click="generateRoute"
                  v-if="!venueMinimized && venue.isFavorite"
                  class="mt-4 flex ">
        <img src="@/assets/svg/icon-route.svg"
             alt=""
             class="text-white"
             width="14"
             height="14" />
        {{ $t('make_route') }}
      </app-button>
    </div>
  </div>
</template>

<script lang="ts">
import useMap from '@/components/use/useMap';
import Application from '@/models/Application';
import Venue from '@/models/Venue';
import router from "@/router";
import { computed, defineAsyncComponent, defineComponent, Ref } from "vue";
import { event } from 'vue-gtag';

export default defineComponent({
  name: "VenueDetail",
  components: {
    AppPlayer: defineAsyncComponent(() => import(/* webpackPrefetch: true */ '@/components/AppPlayer.vue')),
    AppButton: defineAsyncComponent(() => import(/* webpackPrefetch: true */ '@/components/AppButton.vue')),
  },
  setup() {
    const mapData = useMap();
    const venue = Application.detailVenue as Ref<Venue>;
    const venues = Application.venues as Ref<Venue[]>;
    const venueLocalization = computed(() => venue.value?.localizations?.find(l => l.language.code === Application.language.value));
    const locationTitle = computed(() => venueLocalization.value?.locationTitle || '');
    const locationDescription = computed(() => venueLocalization.value?.locationDescription || '');

    function toggleFavorite() {
      if (!venue.value) return;
      venue.value.isFavorite = !venue.value.isFavorite;
      venue.value.isMakeRoute = !venue.value.isMakeRoute;
      if (!venue.value.isFavorite) {
        (mapData.getMapData()).directionsRenderer.setDirections({ routes: [] });
      }
      venue.value.toggleFavorite();

      event('venue-toggle-favorite', {
        value: `venue: ${venue.value?.localizations?.[0]?.name}, isFavorite: ${!venue.value?.isFavorite}`,
      });
    }

    function generateRoute() {
      if (window.innerWidth <= 640) {
        switchView('map');
      }
      venues.value.forEach(venue => {
        if (venue.isFavorite && window.innerWidth >= 640) {
          venue.generateRoute();
        } else {
          return;
        }
      });
    }

    function switchView(name: string) {
      Application.setMenuOpen(false);
      return router.push({ name });
    }

    function showOnMap() {
      if (window.innerWidth <= 640) {
        switchView('map');
      }
      if (!venue.value) return;
      if (venue.value.isRecommended) {
        venue.value.marker?.setIcon(venue.value.markerIconRecommendedFavorite);
      } else {
        venue.value.marker?.setIcon(venue.value.markerIconFavorite);
      }
      mapData.getMapData().map.setZoom(17);
      mapData.getMapData().map.setCenter(new (mapData.getMapData()).google.maps.LatLng(venue.value.lat, venue.value.lng));
    }

    function backToNormalZoom() {
      if (venue.value.isRecommended) {
        venue.value.marker?.setIcon(venue.value.markerIconRecommended);
      } else {
        venue.value.marker?.setIcon(venue.value.markerIcon);
      }
      Application.resetDetailVenue();
      if (!mapData.getMapData().map) return;
      mapData.getMapData().map.setZoom(14);
    }

    return {
      venue,
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
});
</script>

<style scoped>
.venue-detail-content {
  width: 336px;
}

.venue-player {
  min-width: 300px;
}

@media (max-width: 640px) {
  .venue-detail-content {
    width: 97%;
  }

  .venue-player {
    width: 99%;
  }
}
</style>
