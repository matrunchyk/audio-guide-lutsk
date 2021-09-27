<template>
  <div class="sm:flex relative">
    <div class="first-line justify-end flex py-3 px-4 bg-white gap-4 sm:flex-row-reverse sm:flex-1 items-center">
      <svg-map
          class="flex-none sm:hidden cursor-pointer"
          :class="{
            'opacity-30': $route.name === 'map',
          }"
          @click="switchView('map')"
      />
      <div class="flex-grow sm:hidden h-5 w-5 cursor-pointer self-center flex">
        <svg-list
            :class="{
            'opacity-30': $route.name === 'list',
          }"
            @click="switchView('list')"
        />
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
            :is="currentLanguageImage"/>
      </div>
      <svg-divider class="flex-none"/>
      <icon-close
          v-if="menuOpen"
          class="flex-none cursor-pointer w-6"
          @click="Application.setMenuOpen(false)"/>
      <div v-else class="relative space-y-0.5">
        <icon-hamburger class="flex-none cursor-pointer w-6 "
                        @click="Application.setMenuOpen(true)"/>
        <div v-if="recommendedNum" class="absolute  bg-blue-900 text-white number rounded-sm w-4 pl-1.5">
          {{ recommendedNum }}
        </div>
      </div>
    </div>
    <div class="second-line sm:flex bg-white mt-0.5 py-3 sm:items-center px-4">
      <AppToggle class="" v-if="$route.name !== 'map'"/>
      <MakeRoute v-else/>
    </div>
    <div
        class="left-menu bg-white absolute z-20 top-14 w-full overflow-hidden transform transition-transform ease-in p-4 flex-col justify-center gap-3"
        :class="{
        'translate-x-0 flex': menuOpen,
        'translate-x-96 sm:-translate-x-96 hidden sm:flex': !menuOpen,
      }">
      <div class="cursor-pointer hover:text-x-red block sm:hidden" @click="switchView('map')">Пошук по Карті</div>
      <div class="cursor-pointer hover:text-x-red block sm:hidden" @click="switchView('list')">Пошук по Списку</div>
      <div @click="openDefaultModal" class="cursor-pointer flex justify-between hover:text-x-red">
        Прокласти маршрут
        <span v-if="recommendedNum" class="rounded-md bg-blue-900 text-white py-0 px-3">{{ recommendedNum }}</span>
      </div>
      <div @click="openTutorial" class="cursor-pointer hover:text-x-red">Інструкція</div>
      <div class="z-30 absolute bottom-0 flex gap-2.5 border left-0 w-full py-6 px-4 justify-end">
        <LogoTwotowers @click="linkToSourseSiteLeftIcon" class="mr-auto"/>
        <LogoEu/>
        <LogoPlbyua @click="linkToSourseSiteRightIcon"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, reactive, ref, shallowRef, watch} from 'vue';
import Application from '../models/Application';
import AppToggle from './AppToggle.vue';
import MakeRoute from './MakeRoute.vue';
import LogoTwotowers from '@/assets/svg/logo-twotowers.svg';
import LogoEu from '@/assets/svg/logo-eu.svg';
import LogoPlbyua from '@/assets/svg/logo-plbyua.svg';
import SvgMap from '@/assets/svg/map.svg';
import SvgList from '@/assets/svg/list.svg';
import SvgDivider from '@/assets/svg/divider.svg';
import IconClose from '@/assets/svg/icon-close.svg';
import IconHamburger from '@/assets/svg/icon-hamburger.svg';
import router from '@/router';

const images = require.context('@/assets/svg/flags/', false, /\.svg$/);

// noinspection JSUnusedGlobalSymbols
export default {
  name: "AppHeader",
  components: {
    MakeRoute,
    AppToggle,
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
    let showLanguageList = ref(true);
    let languages = reactive(['uk', 'pl', 'de', 'ru', 'en']);
    let showLanguageDropdown = ref(false);
    const venue = Application.detailVenue;
    const venues = Application.venues;
    const recommendedNum = computed(() => venues.value.filter((venue) => venue.isFavorite).length);

    function getImage(lang: string) {
      return images(`./${lang}.svg`).default;
    }

    let currentLanguageImage = shallowRef(getImage('uk'));

    function selectLanguage(lang: string) {
      localStorage.setItem('languageSelected', lang);

      showLanguageDropdown.value = false;
      currentLanguageImage.value = images('./' + lang + ".svg").default;

      Application.setLanguage(lang);

      showLanguageList.value = false;

      languages.sort((a) => (a === lang ? -1 : 1));

      setTimeout(() => {
        showLanguageList.value = true;
      }, 1000);
    }

    function linkToSourseSiteLeftIcon() {
      window.open('https://www.pbu2020.eu/ua/projects2020/232');
    }

    function linkToSourseSiteRightIcon() {
      window.open('https://www.pbu2020.eu/');
    }

    function openTutorial() {
      Application.setMenuOpen(false);
      Application.setTutorialOpen(true);
    }

    function openDefaultModal() {
      if (recommendedNum.value) return;
      Application.setMenuOpen(false);
      Application.setRouteModalOpen(true);
    }

    function switchView(name: string) {
      Application.setMenuOpen(false);
      return router.push({name});
    }

    watch(Application.language, lang => selectLanguage(lang));

    return {
      selectLanguage,
      linkToSourseSiteLeftIcon,
      linkToSourseSiteRightIcon,
      currentLanguageImage,
      showLanguageList,
      showLanguageDropdown,
      languages,
      openDefaultModal,
      getImage,
      openTutorial,
      switchView,
      recommendedNum,
      venue,
      venues,
      Application,
      menuOpen: Application.menuOpen,
      pinnedVenues: Application.pinnedVenues,
    };
  },
};
</script>

<style>
.number {
  font-size: 7px;
  Height: 9px;
  left: 13px;
}

.images-align {
  margin-left: -9px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
}

.left-menu {
  height: calc(100vh - 54px);
}
</style>
