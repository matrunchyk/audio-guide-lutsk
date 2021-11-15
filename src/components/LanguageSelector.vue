<template>
  <div class="absolute bg-black bg-opacity-50 flex inset-0 items-center justify-center z-20">
    <div class="absolute inset-0 justify-center items-center bg-opacity-60 bg-black flex z-10">
      <div class="z-20 bg-white py-6 px-2.5 shadow-xl bg-white rounded-lg">
        <div @click="$emit('select', lang.code)"
               v-for="lang in languages"
               :key="lang.code"
             class="flex cursor-pointer hover:shadow-md pr-32 pl-3.5 py-2.5 rounded-md border border-transparent hover:border-gray-300 gap-2 hover:block">
          <component class="flex-none" :is="`flag-${lang.code}`"></component>
          <div class="flex-grow text-black text-md flex">{{ lang.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineAsyncComponent, reactive, ref} from "vue";
import LanguageRepository from "../repositories/LanguageRepository";

export default {
  name: "LanguageSelector",
  components: {
    FlagUk: defineAsyncComponent(() => import('@/assets/svg/flags/uk.svg')),
    // FlagDe: defineAsyncComponent(() => import('@/assets/svg/flags/de.svg')),
    FlagEn: defineAsyncComponent(() => import('@/assets/svg/flags/en.svg')),
    // FlagPl: defineAsyncComponent(() => import('@/assets/svg/flags/pl.svg')),
    FlagRu: defineAsyncComponent(() => import('@/assets/svg/flags/ru.svg')),
  },
  emits: ['select'],
  async setup() {
    const languageRepository = ref(new LanguageRepository());
    await languageRepository.value.many();
    let languages = reactive(languageRepository.value.dataset.all().map(lang => {
      lang = {
        code: lang.code,
        title: lang.title
      }
      return lang;
    }));
    return {
      languages
    };
  },
};
</script>

<style scoped>


</style>
