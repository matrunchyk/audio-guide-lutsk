<template>
  <div class="app-header sm:flex  fixed z-10 ">
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
        <div v-if="isFavoriteNum" class="absolute  bg-blue-900 text-white number rounded-sm w-4 pl-1.5">
          {{ isFavoriteNum }}
        </div>
      </div>
    </div>
    <div class="second-line sm:flex bg-white py-3 sm:items-center px-4">
      <AppToggle class="" v-if="$route.name !== 'map'"/>
      <MakeRoute v-else-if="isFavoriteNum"/>
    </div>
    <div
        class="left-menu bg-white absolute z-20 top-14 w-full overflow-hidden transform transition-transform ease-in p-4 flex-col justify-center gap-3"
        :class="{
        'translate-x-0 flex': menuOpen,
        'translate-x-96 sm:-translate-x-96 hidden sm:flex': !menuOpen,
      }">
      <div class="cursor-pointer hover:text-x-red block sm:hidden" @click="switchView('map')">Пошук по Карті</div>
      <div class="cursor-pointer hover:text-x-red block sm:hidden" @click="switchView('list')">Пошук по Списку</div>
      <div @click="generateRouteInHeader" class="cursor-pointer flex justify-between hover:text-x-red">
        Прокласти маршрут
        <span v-if="isFavoriteNum" class="rounded-md bg-blue-900 text-white py-0 px-3">{{ isFavoriteNum }}</span>
      </div>
      <div @click="openTutorial" class="cursor-pointer hover:text-x-red">Інструкція</div>
      <div class="z-30 absolute bottom-0 flex gap-2.5 border left-0 w-full py-6 px-4 justify-end">
        <LogoTwotowers @click="linkToSourceSiteLeftIcon" class="mr-auto"/>
        <LogoEu/>
        <LogoPlbyua @click="linkToSourceSiteRightIcon"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LanguageRepository from "@/repositories/LanguageRepository";
import {computed, defineAsyncComponent, reactive, ref, shallowRef} from 'vue';
import Application from '../models/Application';
import router from '@/router';

const images = require.context('@/assets/svg/flags/', false, /\.svg$/);

// noinspection JSUnusedGlobalSymbols
export default {
  name: "AppHeader",
  components: {
    MakeRoute: defineAsyncComponent(() => import('./MakeRoute.vue')),
    AppToggle: defineAsyncComponent(() => import('./AppToggle.vue')),
    LogoTwotowers: defineAsyncComponent(() => import('@/assets/svg/logo-twotowers.svg')),
    LogoEu: defineAsyncComponent(() => import('@/assets/svg/logo-eu.svg')),
    LogoPlbyua: defineAsyncComponent(() => import('@/assets/svg/logo-plbyua.svg')),
    SvgMap: defineAsyncComponent(() => import('@/assets/svg/map.svg')),
    SvgList: defineAsyncComponent(() => import('@/assets/svg/list.svg')),
    SvgDivider: defineAsyncComponent(() => import('@/assets/svg/divider.svg')),
    IconClose: defineAsyncComponent(() => import('@/assets/svg/icon-close.svg')),
    IconHamburger: defineAsyncComponent(() => import('@/assets/svg/icon-hamburger.svg')),
  },
  async setup() {
    const languageRepository = ref(new LanguageRepository());
    await languageRepository.value.many();
    let showLanguageList = ref(true);
    let languages = reactive(languageRepository.value.dataset.all().map(l => l.code));
    let showLanguageDropdown = ref(false);
    const venues = Application.venues;
    const isFavoriteNum = computed(() => venues.value.filter((venue) => venue.isFavorite).length);
    let currentLanguageImage = shallowRef(getImage('uk'));

    function getImage(lang: string) {
      return images(`./${lang}.svg`).default;
    }

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

    function linkToSourceSiteLeftIcon() {
      window.open('https://www.pbu2020.eu/ua/projects2020/232');
    }

    function linkToSourceSiteRightIcon() {
      window.open('https://www.pbu2020.eu/');
    }

    function openTutorial() {
      Application.setMenuOpen(false);
      Application.setTutorialOpen(true);
    }

    function generateRouteInHeader() {
      venues.value.forEach(venue => {
        if (!venue.isFavorite) return;
        venue.generateRoute();
      });
      if (window.screen.width <= 640) {
        switchView('map');
      }
      if (!isFavoriteNum.value) {
        openDefaultModal();
      }
    }

    function openDefaultModal() {
      Application.setMenuOpen(false);
      Application.setRouteModalOpen(true);
    }

    function switchView(name: string) {
      Application.setMenuOpen(false);
      return router.push({name});
    }

    // watch(Application.language, lang => selectLanguage(lang));

    return {
      selectLanguage,
      linkToSourceSiteLeftIcon,
      linkToSourceSiteRightIcon,
      currentLanguageImage,
      showLanguageList,
      showLanguageDropdown,
      languages,
      generateRouteInHeader,
      openDefaultModal,
      getImage,
      openTutorial,
      switchView,
      languageRepository,
      isFavoriteNum,
      venues,
      Application,
      menuOpen: Application.menuOpen,
      pinnedVenues: Application.pinnedVenues,
    };
  },
};
</script>

<style>
.app-header {
  min-width: 320px;
}
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

@media (max-width: 640px) {
  .app-header {
    width: 100%;
  }
}
@media (min-width: 640px) {
  .app-header {
    max-width: 20%;
  }
}
</style>
