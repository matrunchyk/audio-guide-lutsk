<template>
  <div class="flex items-center hover:underline">
    <img src="@/assets/svg/distance.svg"
         alt="" />
    <div @click="generateRoute"
         class="ml-3 text-black font-normal text-xs">
      {{ $t('make_route') }}
    </div>
  </div>
</template>

<script lang="ts">
import Application from "@/models/Application";

export default {
  name: "MakeRoute",
  setup() {
    const venues = Application.venues;

    function generateRoute() {
      venues.value.forEach(venue => {
        if (!venue.isFavorite) return;
        venue.generateRoute();
      });
    }

    return {
      venues,
      generateRoute,
    };
  },
};
</script>

