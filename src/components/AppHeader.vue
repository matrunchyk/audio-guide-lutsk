<template>
  <div class="sm:flex relative">
    <div class="first-line justify-end flex py-3 px-4 bg-white gap-4 sm:flex-row-reverse sm:flex-1 items-center">
      <svg-map class="flex-none sm:hidden cursor-pointer opacity-30"/>
      <div class="flex-grow sm:hidden h-5 w-5 cursor-pointer self-center flex">
        <svg-list/>
      </div>
      <div class="flex">
        <div class="bg-white w-10 rounded absolute z-40 images-align pb-1.5 -mt-1 -ml-1" :class="{
          hidden: !showLanguageDropdown,
          block: showLanguageDropdown,
        }">
          <component
            v-for="lang in languages"
            :key="lang"
            class="mx-auto pt-1 hover:block cursor-pointer"
            :is="getImage(lang)"
            @click="selectLanguage(lang)"
          />
        </div>
        <component
          class="flex-none cursor-pointer current-language"
          @click="showLanguageDropdown = !showLanguageDropdown"
          :is="currentLanguageImage" />
      </div>
      <svg-divider class="flex-none"/>
      <icon-close
        v-if="menuOpen"
        class="flex-none cursor-pointer w-6"
        @click="Application.setMenuOpen(false)" />
      <icon-hamburger
        v-else
        class="flex-none cursor-pointer w-6"
        @click="Application.setMenuOpen(true)" />
    </div>
    <div class="second-line sm:flex bg-white mt-0.5 py-3 sm:items-center px-4">
      <AppToggle />
    </div>
    <language-selector
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
        <span v-if="pinnedVenues" class="rounded-md bg-blue-900 text-white py-0 px-3">{{ pinnedVenues }}</span>
      </div>
      <div @click="openTutorial" class="cursor-pointer hover:text-x-red">Інструкція</div>
      <div class="z-30 absolute bottom-0 flex gap-2.5 border left-0 w-full py-6 px-4 justify-end">
        <LogoTwotowers class="mr-auto"/>
        <LogoEu/>
        <LogoPlbyua/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LanguageSelector from "@/components/LanguageSelector.vue";
import { onBeforeMount, reactive, ref, shallowRef } from 'vue';
import Application from '../models/Application';
import AppToggle from './AppToggle.vue';
import LogoTwotowers from '@/assets/logo-twotowers.svg';
import LogoEu from '@/assets/logo-eu.svg';
import LogoPlbyua from '@/assets/logo-plbyua.svg';
import SvgMap from '@/assets/map.svg';
import SvgList from '@/assets/list.svg';
import SvgDivider from '@/assets/divider.svg';
import IconClose from '@/assets/icon-close.svg';
import IconHamburger from '@/assets/icon-hamburger.svg';

const images = require.context('../assets/flags/', false, /\.svg$/);

// noinspection JSUnusedGlobalSymbols
export default {
  name: "AppHeader",
  components: {
    AppToggle,
    LanguageSelector,
    LogoTwotowers,
    LogoEu,
    LogoPlbyua,
    SvgMap,
    SvgList,
    SvgDivider,
    IconClose,
    IconHamburger,
  },
  setup() {
    let languageSelected = ref('uk');
    let showLanguageList = ref(true);
    let languages = reactive(['uk', 'pl', 'de', 'ru', 'en']);
    let showLanguageDropdown = ref(false);

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

    let currentLanguageImage = shallowRef(getImage('uk'));

    function selectLanguage(lang: string) {
      localStorage.setItem('languageSelected', lang);

      languageSelected.value = lang;
      showLanguageDropdown.value = false;
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
      showLanguageDropdown,
      languages,
      getImage,
      openTutorial,
      Application,
      menuOpen: Application.menuOpen,
      pinnedVenues: Application.pinnedVenues,
    };
  },
};
</script>

<style>
.images-align {
  margin-left: -9px;
  box-shadow:  0 0 3px rgba(0, 0, 0, 0.1);
}

.left-menu {
  height: calc(100vh - 54px);
}
</style>
