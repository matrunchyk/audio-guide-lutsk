<template>
  <div class="absolute bg-black bg-opacity-50 flex inset-0 items-center justify-center z-20">
  <div class="absolute inset-0 justify-center items-center bg-opacity-60 bg-black flex z-10">
    <div class="z-20 bg-white py-6 px-2.5 shadow-xl bg-white rounded-lg">
      <div @click="$emit('select', 'uk')"
           class="flex cursor-pointer hover:shadow-md pr-32 pl-3.5 py-2.5 rounded-md border border-transparent hover:border-gray-300 gap-2 hover:block">
        <flag-uk class="flex-none"/>
        <div class="flex-grow text-black text-md flex">Українська мова</div>
      </div>
      <div @click="$emit('select', 'de')"
           class="flex cursor-pointer hover:shadow-md pr-32 pl-3.5 py-2.5 rounded-md border border-transparent hover:border-gray-300 hover:block gap-2">
        <flag-de class="flex-none"/>
        <div class="">Deutsche Sprache</div>
      </div>
      <div @click="$emit('select', 'en')"
           class="flex cursor-pointer hover:shadow-md pr-32 pl-3.5 py-2.5 rounded-md border border-transparent hover:border-gray-300 hover:block  gap-2">
        <flag-en class="flex-none"/>
        <div class="">English language</div>
      </div>
      <div @click="$emit('select', 'pl')"
           class="flex cursor-pointer hover:shadow-md pr-32 pl-3.5 py-2.5 rounded-md border border-transparent hover:border-gray-300 hover:block  gap-2">
        <flag-pl class="flex-none"/>
        <div class="">Język polski</div>
      </div>
      <div @click="$emit('select', 'ru')"
           class="flex cursor-pointer hover:shadow-md pr-32 pl-3.5 py-2.5 rounded-md border border-transparent hover:border-gray-300 hover:block  gap-2">
        <flag-ru class="flex-none"/>
        <div class="">Русский язык</div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import FlagUk from '@/assets/svg/flags/uk.svg';
import FlagDe from '@/assets/svg/flags/de.svg';
import FlagEn from '@/assets/svg/flags/en.svg';
import FlagPl from '@/assets/svg/flags/pl.svg';
import FlagRu from '@/assets/svg/flags/ru.svg';

export default {
  name: "LanguageSelector",
  components: {
    FlagUk,
    FlagDe,
    FlagEn,
    FlagPl,
    FlagRu,
  },
  emits: ['select'],
}
</script>

<style scoped>


</style>
