<template>
  <div class="flex">
    <div class="flex-grow sm:flex-grow-0 left-column flex-grow-0">
      <AppHeader/>
      <router-view />
      <AppTutorial v-if="tutorialOpen"/>
      <RateVenueModal v-if="ratingVenue"/>
    </div>
    <div
      class="hidden flex-grow sm:block"
      :class="{'bg-opacity-60': menuOpen,}">
      <iframe
        class="flex-grow h-full sm:block w-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80797.7896696666!2d25.263965228817042!3d50.73976997371188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472599eba185965d%3A0xd25274a2228db86c!2z0JvRg9GG0YzQuiwg0JLQvtC70LjQvdGB0YzQutCwINC-0LHQu9Cw0YHRgtGM!5e0!3m2!1suk!2sua!4v1620169394908!5m2!1suk!2sua"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        title="" />
    </div>
    <language-selector
        v-if="!languageSelected"
        @select="selectLanguage" />
  </div>
</template>

<script lang="ts">
import { onBeforeMount, ref } from 'vue';
import Application from '@/models/Application';
import AppHeader from './components/AppHeader.vue';
import AppTutorial from './components/AppTutorial.vue';
import RateVenueModal from './components/RateVenueModal.vue';
import LanguageSelector from "@/components/LanguageSelector.vue";

export default {
  name: 'App',
  components: {
    AppHeader,
    AppTutorial,
    RateVenueModal,
    LanguageSelector,
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
