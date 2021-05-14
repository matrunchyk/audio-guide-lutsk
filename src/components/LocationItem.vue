<template>
  <div
    class="p-1.5 m-1.5 relative LocationItem bg-transparent"
    :class="{
      'bg-red-100 border-l border-r border-red-300 my-0': location.recommended,
      'rounded-t-md border-t mt-1.5': location.firstRecommended,
      'rounded-b-md border-b mb-1.5': location.lastRecommended,
    }"
  >
    <div v-if="location.firstRecommended && location.recommended"
         class="text-recommended text-x-red mt-1 mb-2">Рекомендовано
    </div>
    <div class="sound bg-x-red flex justify-center items-center rounded-full absolute top-0 right-0 mt-32 mr-3 w-12 h-12">
      <img src="@/assets/volume.svg"
           alt=""
           class=" w-6 h-6">
    </div>
    <img :src="location.image"
         alt=""
         class="w-full h-72">
    <div>
      <img v-if="location.pinned"
           alt=""
           src="@/assets/red-line.svg"
           class="absolute top-9 right-2">
    </div>
    <div class="flex icon bg-x-red gap-4 pl-4 py-2.5">
      <img class="flex-none cursor-pointer self-center"
           alt=""
           :src="location.icon">
      <div class="flex-grow cursor-pointer text-white text-md flex">{{ location.name }}</div>
    </div>
    <div class="flex stars gap-4 px-4 py-2.5 rounded-b-md">
      <div class="flex-none cursor-pointer">Рейтинг</div>
      <div class="flex-grow cursor-pointer flex">
        <img src="@/assets/star-grey.svg"
             alt="">
        <img src="@/assets/star-grey.svg"
             alt="">
        <img src="@/assets/star-grey.svg"
             alt="">
        <img src="@/assets/star-grey.svg"
             alt="">
        <img src="@/assets/star-grey.svg"
             alt="">
      </div>
      <div class="flex-none cursor-pointer">Оцінити</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LocationItem",
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.stars {
  background: #FFFFFF;
}
</style>
