<template>
  <div class=" inset-0 bg-black bg-opacity-50 flex justify-end absolute px-2">

    <div class="bg-white rounded-lg bottom-0 px-5 pt-2.5 -m-1.5 fixed pb-7">
      <div class="w-30 z-50 absolute ml-80 -mt-8">
        <icon-model-close
            class="w-4 sm:-ml-8 cursor-pointer"
            @click="Application.resetDetailVenue(), backToNormalZoom()" />
      </div>
      <div class="flex justify-center mb-1 cursor-pointer">
        <icon-collapse
          v-if="!venueMinimized"
          @click="Application.setDetailVenueMinimized(true)"
        />
        <icon-expand
          v-else
          @click="Application.setDetailVenueMinimized(false)" />
      </div>
      <img
        v-if="!venueMinimized"
        :src="venue.image"
        alt="" />
      <div>
        <svg-bookmark
            v-if="venue.isFavorite"
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
      <app-player />
      <div v-if="!venueMinimized"
           class="flex justify-between mt-5">
        <div @click="changeZoom" class="underline text-xs cursor-pointer">Показати на карті</div>
        <div v-if="!venue.isFavorite" @click="toggleFavorite" class="underline text-xs cursor-pointer">Додати в обрані</div>

        <div v-else @click="toggleFavorite" class="underline text-xs cursor-pointer">Прибрати з Обраних</div>
      </div>
      <app-button @click="generateRoute" v-if="!venueMinimized && venue.isFavorite"
                  class="mt-4 flex">
        <icon-route  class="text-white" />
        Прокласти маршрут
      </app-button>
    </div>
  </div>
</template>

<script lang="ts">
import IconCollapse from '@/assets/svg/icon-collapse.svg';
import SvgBookmark from '@/assets/svg/bookmark.svg';
import IconExpand from '@/assets/svg/icon-expand.svg';
import IconModelClose from '@/assets/svg/icon-modal-close.svg';
import IconRoute from '@/assets/svg/icon-route.svg';
import AppButton from '@/components/AppButton.vue';
import AppPlayer from '@/components/AppPlayer.vue';
import Application from '@/models/Application';
// import Venue from "@/models/Venue";
import takeData from '@/components/use/useMap.ts';



export default {
  name: "VenueDetail",
  components: {
    AppPlayer,
    IconCollapse,
    IconExpand,
    IconModelClose,
    IconRoute,
    AppButton,
    SvgBookmark,
  },
  setup() {
    const mapData = takeData()
    const venue = Application.detailVenue;


    function toggleFavorite() {
      if(venue.value === null) return;
      venue.value.toggleFavorite();
    }
    function changeZoom() {
      if(venue.value === null) return
      mapData.getMapData().map.setZoom(17)
      mapData.getMapData().map.setCenter(new (mapData.getMapData()).google.maps.LatLng(venue.value.lat, venue.value.lng));
    }

    function backToNormalZoom() {
      mapData.getMapData().map.setZoom(14)
    }

    function generateMarker() {
      new (mapData.getMapData()).google.maps.Marker({
        position: {lat: 50.7445248, lng:  25.3329408},
        map: mapData.getMapData().map,
      });
    }

    function createLatLng(lat: any, lng: any) {
      return new (mapData.getMapData()).google.maps.LatLng(lat, lng);
    }

    function createMarker(latLng: any) {
      new (mapData.getMapData()).google.maps.Marker({
        position: latLng,
        map: mapData.getMapData().map,
      })
    }

    function calculateAndDisplayRoute(

        directionsService: any,
        directionsRenderer: any,
    ) {
      if(venue.value === null) return
      directionsService.route({
        origin: createLatLng(50.7445248, 25.3329408),
        destination: createLatLng(venue.value.lat, venue.value.lng),
        travelMode: (mapData.getMapData()).google.maps.TravelMode.WALKING
      }).then((response: any) => {
        directionsRenderer.setDirections(response)
      })
    }

    function generateRoute() {
      const directionsRenderer = new (mapData.getMapData()).google.maps.DirectionsRenderer();
      const directionsService = new (mapData.getMapData()).google.maps.DirectionsService();

      directionsRenderer.setMap(mapData.getMapData().map);

      calculateAndDisplayRoute(directionsService, directionsRenderer);


      // if(navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition(position => {
      //         calculateAndDisplayRoute(directionsService, directionsRenderer);
      //     console.log(position.coords.latitude)
      //     console.log(position.coords.longitude)
      //   },
      //   error => {
      //     console.log(error.message)
      //     calculateAndDisplayRoute(directionsService, directionsRenderer);
      //   })
      // } else {
      //   return;
      // }

    }


    return {
      venue,
      venueMinimized: Application.detailVenueMinimized,
      Application,
      toggleFavorite,
      generateRoute,
      generateMarker,
      createLatLng,
      createMarker,
      calculateAndDisplayRoute,
      changeZoom,
      backToNormalZoom,
    }
  }
};
</script>

<style scoped>
.venue-detail {
  height: calc(100vh - 54px);
}
</style>
