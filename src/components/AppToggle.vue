<template>
  <!-- Toggle A -->
  <div class="flex items-center">
    <label
        for="toogleA"
        class="flex items-center cursor-pointer"
    >
      <!-- toggle -->
      <span class="relative block">
        <!-- input -->
        <input id="toogleA" type="checkbox" class="sr-only" @click="sortByRating"/>
        <!-- line -->
        <span class="toggle-line w-6 h-2.5 rounded-full shadow-inner block"></span>
        <!-- dot -->
        <span class="dot absolute w-4 h-4 bg-white rounded-full shadow -left-1 -top-1 transition duration-300 block"></span>
      </span>
      <!-- label -->
      <span class="ml-1 text-black font-normal text-xs ml-3 mr-3 block">
        {{ $t('header.sort_by_rating') }}
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import Application from "@/models/Application";

export default {
  name: "AppToggle",
  setup() {

    function sortByRating() {
      Application.isSortedByRating.value = true;
      if (Application.isSortedByRating.value) {
        Application.venues.value.sort((a, b) => b.rating - a.rating);
      }
    }
    return {
      sortByRating,
    };
  },
}
</script>

<style scoped>
/* Toggle A */
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #EF1E2A;
}

/* Toggle B */
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #EF1E2A;
}

.toggle-line {
  background: rgba(34, 31, 31, 0.26);
}
</style>
