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
      <Suspense>
        <AppHeader v-if="$route.name !== '404'" />
      </Suspense>
      <router-view />
      <RouteModal v-if="routeModalOpen" />
      <AppTutorial v-if="tutorialOpen" />
      <Suspense>
        <RateVenueModal v-if="ratingVenue" />
      </Suspense>
    </div>
    <div
      class="hidden flex-grow"
      :class="{
        'bg-opacity-60': menuOpen,
        'sm:block': $route.name !== '404',

      }">
      <AppMap v-if="windowWidth >= 640" />
    </div>
    <Suspense>
      <language-selector
        v-if="!languageSelected"
        @select="selectLanguage" />
    </Suspense>
  </div>
</template>

<script lang="ts">
import Application from '@/models/Application';
import Venue from '@/models/Venue';
import { v4 as uuid } from 'uuid';
import { defineAsyncComponent, defineComponent, onBeforeMount, onMounted, Ref, ref } from 'vue';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export default defineComponent({
  name: 'App',
  components: {
    AppHeader: defineAsyncComponent(() => import('@/components/AppHeader.vue')),
    AppTutorial: defineAsyncComponent(() => import('@/components/AppTutorial.vue')),
    RateVenueModal: defineAsyncComponent(() => import('@/components/RateVenueModal.vue')),
    LanguageSelector: defineAsyncComponent(() => import('@/components/LanguageSelector.vue')),
    RouteModal: defineAsyncComponent(() => import('@/components/RouteModal.vue')),
    AppMap: defineAsyncComponent(() => import('@/components/AppMap.vue')),
  },

  setup() {
    const windowWidth = ref(window.innerWidth)
    let languageSelected = ref('uk');
    onBeforeMount(() => {
      if (!localStorage.getItem('guestUuid')) {
        localStorage.setItem('guestUuid', uuid());
      }
      languageSelected.value = localStorage.getItem('languageSelected') || '';
      Application.language.value = localStorage.getItem('languageSelected') || 'uk';
      if (!languageSelected.value) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    });
    onMounted(async () => {
      Application.showLoader();

      await Application.setVenues();

      Application.hideLoader();
    });

    function selectLanguage(lang: string) {
      localStorage.setItem('languageSelected', lang);
      languageSelected.value = lang;
      Application.setLanguage(lang);
    }

    return {
      windowWidth,
      languageSelected,
      selectLanguage,
      menuOpen: Application.menuOpen,
      tutorialOpen: Application.tutorialOpen,
      ratingVenue: Application.ratingVenue as Ref<Venue>,
      routeModalOpen: Application.routeModalOpen,
    }
  }
})
</script>

<style scoped>
.left-column {
  background: #f3f3f3;
  min-width:  348px;
}

@media (min-width: 640px) {
  .left-column {
    max-width: 20%;
  }
}
</style>
