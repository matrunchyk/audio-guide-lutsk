<template>
  <div class=" recs p-1 relative LocationItem bg-transparent">
    <div class="text-recommended text-x-red mt-1 mb-2">Рекомендовано</div>
    <div class="sound flex bg-x-red justify-center items-center rounded-full absolute top-0 right-0 mt-32 mr-3 w-12 h-12">
      <img src="@/assets/volume.svg" class=" w-6 h-6">
    </div>
    <img src="@/assets/flags/castle.svg" class="w-full">
    <div>
      <img src="@/assets/red-line.svg" class="absolute top-0 -right-7 p-9">
    </div>
    <div class="flex icon bg-x-red gap-4 pl-4 py-2.5">
      <img class="flex-none cursor-pointer" src="@/assets/flags/icon-castle.svg">
      <div class="flex-grow cursor-pointer text-white text-md flex">Покровська церква</div>
    </div>
    <div class="flex stars gap-4 px-4 py-2.5">
      <div class="flex-none cursor-pointer">Рейтинг</div>
      <div class="flex-grow cursor-pointer flex">
        <img src="@/assets/flags/star-grey.svg">
        <img src="@/assets/flags/star-grey.svg">
        <img src="@/assets/flags/star-grey.svg">
        <img src="@/assets/flags/star-grey.svg">
        <img src="@/assets/flags/star-grey.svg">
      </div>
      <div class="flex-none cursor-pointer">Оцінити</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LocationItem"
}
</script>

<style scoped>
 .recs {
   background: #F5E4E4;
 }
 .stars {
   background: #FFFFFF;
 }
</style>