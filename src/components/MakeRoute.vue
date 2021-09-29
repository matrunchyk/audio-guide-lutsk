<template>
  <div class="flex items-center hover:underline">
    <DistancePic/>
    <div @click="generateRoute" class="ml-3 text-black font-normal text-xs">
      Прокласти маршрут
    </div>
  </div>
</template>

<script>
import Application from "@/models/Application";
import {computed, defineAsyncComponent} from "vue";

export default {
  name: "MakeRoute",
  components: {
    DistancePic: defineAsyncComponent(() => import('../assets/svg/distance.svg')),
  },
  setup() {
    const venues = Application.venues;
    const recommendedNum = computed(() => venues.value.filter((venue) => venue.isFavorite).length);

    function generateRoute() {
      venues.value.forEach(venue => {
        if (!venue.isFavorite) return;
        venue.generateRoute();
      })
    }

    return {
      venues,
      generateRoute,
      recommendedNum,
    };
  }
};
</script>

