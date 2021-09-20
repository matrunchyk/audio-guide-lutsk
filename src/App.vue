<template>
  <div class="flex h-screen">
    <div
        class="flex-grow overflow-auto h-full"
        :class="{
         'left-column': $route.name !== '404',
         'sm:flex-grow-0': $route.name !== '404',
         'flex-grow-0': $route.name !== '404',
         'flex': $route.name === '404'
        }"
    >
      <AppHeader v-if="$route.name !== '404'"/>
      <router-view />
      <AppTutorial v-if="tutorialOpen"/>
      <RateVenueModal v-if="ratingVenue"/>
    </div>
    <div
      class="hidden flex-grow"
      :class="{
        'bg-opacity-60': menuOpen,
        'sm:block': $route.name !== '404',

      }">
      <AppMap/>
    </div>
    <language-selector
        v-if="!languageSelected"
        @select="selectLanguage" />
  </div>
</template>

<script lang="ts">
import {onBeforeMount, ref} from 'vue';
import Application from '@/models/Application';
import AppHeader from './components/AppHeader.vue';
import AppTutorial from './components/AppTutorial.vue';
import RateVenueModal from './components/RateVenueModal.vue';
import LanguageSelector from "@/components/LanguageSelector.vue";
import AppMap from "@/components/AppMap.vue"

export default {
  name: 'App',
  components: {
    AppHeader,
    AppTutorial,
    RateVenueModal,
    LanguageSelector,
    AppMap,
  },

  setup() {
    let languageSelected = ref('uk');

    onBeforeMount(() => {
      languageSelected.value = localStorage.getItem('languageSelected') || '';

      if (!languageSelected.value) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    });

    function selectLanguage(lang: string) {
      languageSelected.value = lang;

      Application.setLanguage(lang);
    }

    return {
      languageSelected,
      selectLanguage,
      menuOpen: Application.menuOpen,
      tutorialOpen: Application.tutorialOpen,
      ratingVenue: Application.ratingVenue,
    }
  }
}
</script>

<style scoped>
.left-column {
  background: #f3f3f3;
  min-width:  320px;
}

@media (min-width: 640px) {
  .left-column {
    max-width: 20%;
  }
}
</style>
