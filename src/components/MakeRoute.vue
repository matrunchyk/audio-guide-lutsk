<template>
  <div v-if="recommendedNum" class="flex items-center hover:underline">
    <DistancePic/>
     <div class="ml-3 text-black font-normal text-xs">
      Прокласти маршрут
    </div>
  </div>
</template>

<script>
import DistancePic from '../assets/svg/distance.svg';
import Application from "@/models/Application";
import {computed} from "vue";

export default {
name: "MakeRoute",
  components: {
    DistancePic
  },
  setup() {
    const venues = Application.venues
    const recommendedNum = computed(() => {
      return  venues.value.filter((venue) => venue.isFavorite === true).length;
    })
    return {
      venues,
      recommendedNum
    }
  }
}
</script>

