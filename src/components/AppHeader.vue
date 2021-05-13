<template>
  <div class="sm:flex">
    <div class="first-line justify-end flex py-3 px-4 bg-white gap-4 sm:flex-row-reverse">
      <img class="flex-none sm:hidden cursor-pointer opacity-30"
           src="@/assets/map.svg"
           alt="" />
      <div class="flex-grow sm:hidden h-5 w-5 cursor-pointer self-center flex">
        <img src="@/assets/list2.svg"
             alt="" />
      </div>
      <div class="flex group">
        <div
          class="bg-white w-10 hidden rounded shadow-lg absolute z-40 images-align" :class="{
            'group-hover:block': showLanguageList,
          }">
          <img v-for="lang in languages" :key="lang" class="ml-auto mr-auto pt-1 hover:block cursor-pointer"
               :src="getImage(lang)"
               alt=""
               @click="selectLanguage(lang)"
          />
        </div>
        <img class="flex-none cursor-pointer mt-px"
             :src="currentLanguageImage"
             alt="" />
      </div>
      <img class="flex-none"
           src="@/assets/divider.svg"
           alt="" />
      <img class="flex-none cursor-pointer"
           src="@/assets/hamburger.svg"
           alt="" />
    </div>
    <div class="second-line sm:flex bg-white mt-0.5 py-3 sm:items-center px-4">
      <AppToggle />
    </div>
    <LanguageSelector
      v-if="!languageSelected"
      v-on:select="selectLanguage" />
  </div>
</template>

<style>
.images-align {
  margin-left: -9px;
  box-shadow:  0 0 3px rgba(0, 0, 0, 0.1);
}
</style>

<script>
import LanguageSelector from "@/components/LanguageSelector";
import { onBeforeMount, ref, reactive } from 'vue';
import Application from '../models/application';
import AppToggle from './AppToggle.vue';

const images = require.context('../assets/flags/', false, /\.svg$/);

// noinspection JSUnusedGlobalSymbols
export default {
  name: "AppHeader",
  components: {
    AppToggle,
    LanguageSelector,
  },
  setup() {
    let languageSelected = ref('uk');
    let showLanguageList = ref(true);
    let languages = reactive(['uk', 'pl', 'de', 'ru', 'en']);

    onBeforeMount(() => {
      languageSelected.value = localStorage.getItem('languageSelected');

      if (!languageSelected.value) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    });

    function getImage(lang) {
      return images(`./${lang}.svg`).default;
    }

    let currentLanguageImage = ref(getImage('uk'));

    function selectLanguage(lang) {
      localStorage.setItem('languageSelected', lang);

      languageSelected.value = lang;

      currentLanguageImage.value = images('./' + lang + ".svg").default;

      Application.setLanguage(lang);

      showLanguageList.value = false;

      languages.sort((a) => (a === languageSelected.value ? -1 : 1));

      setTimeout(() => {
        showLanguageList.value = true;
      }, 1000);
    }

    return {
      languageSelected,
      selectLanguage,
      currentLanguageImage,
      showLanguageList,
      languages,
      getImage,
    };
  },
};
</script>
