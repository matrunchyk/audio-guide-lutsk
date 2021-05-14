<template>
  <div class="sm:flex relative">
    <div class="first-line justify-end flex py-3 px-4 bg-white gap-4 sm:flex-row-reverse sm:flex-1">
      <img
        class="flex-none sm:hidden cursor-pointer opacity-30"
        src="@/assets/map.svg"
        alt="" />
      <div class="flex-grow sm:hidden h-5 w-5 cursor-pointer self-center flex">
        <img
          src="@/assets/list2.svg"
          alt="" />
      </div>
      <div class="flex group">
        <div
          class="bg-white w-10 hidden rounded shadow-lg absolute z-40 images-align"
          :class="{
            'group-hover:block': showLanguageList,
          }">
          <img
            v-for="lang in languages"
            :key="lang"
            class="ml-auto mr-auto pt-1 hover:block cursor-pointer"
            :src="getImage(lang)"
            alt=""
            @click="selectLanguage(lang)"
          />
        </div>
        <img
          class="flex-none cursor-pointer mt-px"
          :src="currentLanguageImage"
          alt="" />
      </div>
      <img
        class="flex-none"
        src="@/assets/divider.svg"
        alt="" />
      <img
        v-if="menuOpen"
        class="flex-none cursor-pointer w-6"
        src="@/assets/icon-close.svg"
        @click="Application.setMenuOpen(false)"
        alt="" />
      <img
        v-else
        class="flex-none cursor-pointer w-6"
        src="@/assets/icon-hamburger.svg"
        @click="Application.setMenuOpen(true)"
        alt="" />
    </div>
    <div class="second-line sm:flex bg-white mt-0.5 py-3 sm:items-center px-4">
      <AppToggle />
    </div>
    <LanguageSelector
      v-if="!languageSelected"
      @select="selectLanguage" />
    <div
      class="left-menu bg-white absolute z-20 top-14 w-full overflow-hidden transform transition-transform ease-in p-4 flex-col justify-center gap-3"
      :class="{
        'translate-x-0 flex': menuOpen,
        'translate-x-96 sm:-translate-x-96 hidden sm:flex': !menuOpen,
      }">
      <div class="cursor-pointer hover:text-x-red">Пошук по Карті</div>
      <div class="cursor-pointer hover:text-x-red">Пошук по Списку</div>
      <div class="cursor-pointer flex justify-between hover:text-x-red">
        Прокласти маршрут
        <span v-if="pinnedLocations" class="rounded-md bg-blue-900 text-white py-0 px-3">{{ pinnedLocations }}</span>
      </div>
      <div @click="openTutorial" class="cursor-pointer hover:text-x-red">Інструкція</div>
      <div class="z-30 absolute bottom-0 flex gap-2.5 border left-0 w-full py-6 px-4 justify-end">
        <img src="@/assets/logo-twotowers.svg"
             class="mr-auto"
             alt="">
        <img src="@/assets/logo-eu.svg"
             alt="">
        <img src="@/assets/logo-plbyua.svg"
             alt="">
      </div>
    </div>
  </div>
</template>

<style>
.images-align {
  margin-left: -9px;
  box-shadow:  0 0 3px rgba(0, 0, 0, 0.1);
}

.left-menu {
  height: calc(100vh - 54px);
}
</style>

<script lang="ts">
import LanguageSelector from "@/components/LanguageSelector.vue";
import { onBeforeMount, reactive, ref } from 'vue';
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
      languageSelected.value = localStorage.getItem('languageSelected') || '';

      if (!languageSelected.value) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    });

    function getImage(lang: string) {
      return images(`./${lang}.svg`).default;
    }

    let currentLanguageImage = ref(getImage('uk'));

    function selectLanguage(lang: string) {
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

    function openTutorial() {
      Application.setMenuOpen(false);
      Application.setTutorialOpen(true);
    }

    return {
      languageSelected,
      selectLanguage,
      currentLanguageImage,
      showLanguageList,
      languages,
      getImage,
      openTutorial,
      Application,
      menuOpen: Application.menuOpen,
      pinnedLocations: Application.pinnedLocations,
    };
  },
};
</script>
