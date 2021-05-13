<template>
  <div class="absolute inset-0 justify-center items-center bg-opacity-60 bg-black flex z-10">
    <div
        class=" group-hover:block z-20 bg-white py-6  px-2.5 shadow-xl bg-white rounded-lg">
      <div v-on:click="$emit('select', 'uk')"
          class="flex cursor-pointer hover:shadow-md pr-32 pl-3.5 py-2.5 rounded-md border border-transparent hover:border-gray-300 gap-2 hover:block">
        <img class="flex-none" src="@/assets/flags/uk.svg" alt=""/>
        <div class="flex-grow text-black text-md flex">Українська мова</div>
      </div>
      <div v-on:click="$emit('select', 'de')"
          class="flex cursor-pointer hover:shadow-md pr-32 pl-3.5 py-2.5 rounded-md border border-transparent hover:border-gray-300 hover:block gap-2">
        <img class="flex-none" src="@/assets/flags/de.svg" alt=""/>
        <div class="">Deutsche Sprache</div>
      </div>
      <div v-on:click="$emit('select', 'en')"
          class="flex cursor-pointer hover:shadow-md pr-32 pl-3.5 py-2.5 rounded-md border border-transparent hover:border-gray-300 hover:block  gap-2">
        <img class="flex-none " src="@/assets/flags/en.svg" alt=""/>
        <div class="">English language</div>
      </div>
      <div v-on:click="$emit('select', 'pl')"
          class="flex cursor-pointer hover:shadow-md pr-32 pl-3.5 py-2.5 rounded-md border border-transparent hover:border-gray-300 hover:block  gap-2">
        <img class="flex-none" src="@/assets/flags/pl.svg" alt=""/>
        <div class="">Język polski</div>
      </div>
      <div v-on:click="$emit('select', 'ru')"
          class="flex cursor-pointer hover:shadow-md pr-32 pl-3.5 py-2.5 rounded-md border border-transparent hover:border-gray-300 hover:block  gap-2">
        <img class="flex-none" src="@/assets/flags/ru.svg" alt=""/>
        <div class="">Русский язык</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LanguageSelector",
  emits: ['select'],
}

</script>

<style scoped>


</style>
