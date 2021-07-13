<template>
  <div class="flex items-center hover:underline">
    <DistancePic/>
     <div class="ml-3 text-black font-normal text-xs">
      Прокласти маршрут
    </div>
  </div>
</template>

<script>
import DistancePic from '../assets/distance.svg';

export default {
name: "MakeAroute",
  components: {
    DistancePic
  },
}
</script>

<style scoped>

</style>