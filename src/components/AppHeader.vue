<template>
  <div class="app-header sm:flex fixed z-10 ">
    <div class="first-line justify-end flex py-3 px-4 bg-white gap-4 sm:flex-row-reverse sm:flex-1 items-center">
      <img
        src="@/assets/svg/map.svg"
        alt=""
        width="20"
        height="19"
        class="flex-none sm:hidden cursor-pointer"
        :class="{
            'opacity-30': $route.name === 'map',
          }"
        @click="switchView('map')"
      />
      <div class="flex-grow sm:hidden h-5 w-5 cursor-pointer self-center flex">
        <img
          src="@/assets/svg/list.svg"
          width="20"
          height="19"
          alt=""
          :class="{
            'opacity-30': $route.name === 'list',
          }"
          @click="switchView('list')"
        />
      </div>
      <div class="flex">
        <div class="bg-white w-10 rounded absolute z-40 images-align pb-1.5 -mt-1 -ml-1"
             :class="{
          hidden: !showLanguageDropdown,
          block: showLanguageDropdown,
        }">
          <img
            v-for="lang in languages"
            :key="lang"
            alt=""
            width="16"
            height="15"
            class="mx-auto pt-1 hover:block cursor-pointer"
            :src="getImage(lang)"
            @click="selectLanguage(lang)"
          />
        </div>
        <img
          alt=""
          width="32"
          height="30"
          class="flex-none cursor-pointer current-language"
          @click="showLanguageDropdown = !showLanguageDropdown"
          :src="currentLanguageImage" />
      </div>
      <img src="@/assets/svg/divider.svg"
           alt=""
           width="1"
           height="30"
           class="flex-none" />
      <img
        src="@/assets/svg/icon-close.svg"
        alt=""
        width="16"
        height="16"
        v-if="menuOpen"
        class="flex-none cursor-pointer w-6"
        @click="Application.setMenuOpen(false)" />
      <div v-else
           class="relative space-y-0.5">
        <img src="@/assets/svg/icon-hamburger.svg"
             alt=""
             width="23"
             height="14"
             class="flex-none cursor-pointer w-6 "
             @click="Application.setMenuOpen(true)" />
        <div v-if="isFavoriteNum"
             class="absolute  bg-blue-900 text-white number rounded-sm w-4 pl-1.5">
          {{ isFavoriteNum }}
        </div>
      </div>
    </div>
    <div class="second-line sm:flex bg-white py-3 sm:items-center pl-4 pr-2">
      <AppToggle class=""
                 v-if="$route.name !== 'map'" />
      <MakeRoute v-else-if="isFavoriteNum" />
    </div>
    <div
      class="left-menu bg-white absolute z-20 top-14 w-full overflow-hidden transform transition-transform ease-in p-4 flex-col justify-center gap-3"
      :class="{
        'translate-x-0 flex': menuOpen,
        'translate-x-96 sm:-translate-x-96 hidden sm:flex': !menuOpen,
      }">
      <div class="cursor-pointer hover:text-x-red block sm:hidden"
           @click="switchView('map')">{{ $t('header.search_by_map') }}
      </div>
      <div class="cursor-pointer hover:text-x-red block sm:hidden"
           @click="switchView('list')">{{ $t('header.search_by_list') }}
      </div>
      <div @click="generateRouteInHeader"
           class="cursor-pointer flex justify-between hover:text-x-red">
        {{ $t('make_route') }}
        <span v-if="isFavoriteNum"
              class="rounded-md bg-blue-900 text-white py-0 px-3">{{ isFavoriteNum }}</span>
      </div>
      <div @click="openTutorial"
           class="cursor-pointer hover:text-x-red">{{ $t('header.instruction') }}
      </div>
      <div class="z-30 absolute bottom-0 flex gap-2.5 border left-0 w-full py-6 px-4 justify-end">
        <img @click="linkToSourceSiteLeftIcon"
             src="@/assets/svg/logo-twotowers.svg"
             width="49"
             height="40"
             alt=""
             class="mr-auto" />
        <img src="@/assets/svg/logo-eu.svg"
             width="45"
             height="40"
             alt="" />
        <img src="@/assets/svg/logo-plbyua.svg"
             alt=""
             width="80"
             height="40"
             @click="linkToSourceSiteRightIcon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LanguageRepository from "@/repositories/LanguageRepository";
import router from '@/router';
import { computed, defineAsyncComponent, defineComponent, reactive, ref, shallowRef } from 'vue';
import { event } from 'vue-gtag';
import Application from '../models/Application';

const images = require.context('@/assets/svg/flags/', false, /\.svg$/);

export default defineComponent({
  name: "AppHeader",
  components: {
    MakeRoute: defineAsyncComponent(() => import('./MakeRoute.vue')),
    AppToggle: defineAsyncComponent(() => import('./AppToggle.vue')),
  },
  async setup() {
    const languageRepository = ref(new LanguageRepository());
    await languageRepository.value.many();
    let showLanguageList = ref(true);

    let languages = reactive(languageRepository.value.dataset.all().map(l => l.code));
    let showLanguageDropdown = ref(false);
    const venues = Application.venues;
    const isFavoriteNum = computed(() => venues.value.filter((venue) => venue.isFavorite).length);
    let currentLanguageImage = shallowRef(getImage(localStorage.getItem('languageSelected') || 'uk'));

    function getImage(lang: string) {
      return images(`./${lang}.svg`);
    }

    function selectLanguage(lang: string) {
      localStorage.setItem('languageSelected', lang);
      showLanguageDropdown.value = false;
      currentLanguageImage.value = images('./' + lang + ".svg");
      Application.setLanguage(lang);
      showLanguageList.value = false;
      languages.sort((a) => (a === lang ? -1 : 1));

      setTimeout(() => {
        showLanguageList.value = true;
      }, 1000);

      event('select-language', { lang });
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
      event('open-tutorial', { open: 'true' });
    }

    function generateRouteInHeader() {
      if (window.innerWidth <= 640) {
        switchView('map');
      }
      venues.value.forEach(venue => {
        if (!venue.isFavorite) return;
        venue.generateRoute();
      });
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
      return router.push({ name }).finally(() => {
        event('switch-view', { name });
      })
    }

    return {
      selectLanguage,
      linkToSourceSiteLeftIcon,
      linkToSourceSiteRightIcon,
      currentLanguageImage,
      showLanguageList,
      showLanguageDropdown,
      languages,
      generateRouteInHeader,
      getImage,
      openTutorial,
      switchView,
      languageRepository,
      isFavoriteNum,
      Application,
      menuOpen: Application.menuOpen,
      pinnedVenues: Application.pinnedVenues,
    };
  },
});
</script>

<style>
.app-header {
  min-width:       320px;
  width:           20%;
  justify-content: space-between;
}

.number {
  font-size: 7px;
  Height:    9px;
  left:      13px;
}

.images-align {
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
</style>
