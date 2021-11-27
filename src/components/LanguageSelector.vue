<template>
  <div class="absolute bg-black bg-opacity-50 flex inset-0 items-center justify-center z-60">
    <div class="absolute inset-0 justify-center items-center bg-opacity-60 bg-black flex z-50">
      <div class="z-20 bg-white py-6 px-2.5 shadow-xl bg-white rounded-lg">
        <div @click="$emit('select', lang.code)"
             v-for="lang in languages"
             :key="lang.code"
             class="flex cursor-pointer hover:shadow-md pr-32 pl-3.5 py-2.5 rounded-md border border-transparent hover:border-gray-300 gap-2 hover:block">
          <img class="flex-none"
               width="32"
               height="30"
               :src="getImage(lang.code)"
               alt="">
          <div class="flex-grow text-black text-md flex">{{ lang.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import LanguageRepository from "../repositories/LanguageRepository";

const images = require.context('@/assets/svg/flags/', false, /\.svg$/);

export default defineComponent({
  name: "LanguageSelector",

  emits: ['select'],

  async setup() {
    const languageRepository = ref(new LanguageRepository());

    await languageRepository.value.many();

    function getImage(lang: string) {
      return images(`./${lang}.svg`);
    }

    let languages = reactive(languageRepository.value.dataset.all().map(lang => ({
      code: lang.code,
      title: lang.title,
    })));

    return {
      languages,
      getImage,
    };
  },
});
</script>
