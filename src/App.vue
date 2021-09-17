<template>
  <div class="flex">
    <div
        class="flex-grow "
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
      <div id="google-map" ref="googleMap"></div>
    </div>
    <language-selector
        v-if="!languageSelected"
        @select="selectLanguage" />
  </div>
</template>

<script lang="ts">
import {onBeforeMount, onMounted, Ref, ref} from 'vue';
import Application from '@/models/Application';
import AppHeader from './components/AppHeader.vue';
import AppTutorial from './components/AppTutorial.vue';
import RateVenueModal from './components/RateVenueModal.vue';
import LanguageSelector from "@/components/LanguageSelector.vue";
import GoogleMapsApiLoader from 'google-maps-api-loader';

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
    const apiKey = "AIzaSyDPLBnaFBaQa3XTLMSNnv_D_x8K0ZiHSBA";
    const google: Ref<any> = ref()
    const map = ref(null);
    const googleMap = ref(null)

    onBeforeMount(() => {
      languageSelected.value = localStorage.getItem('languageSelected') || '';

      if (!languageSelected.value) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    });

    onMounted(async () => {
      const googleMapApi = await GoogleMapsApiLoader({
        apiKey: apiKey
      })
      google.value = googleMapApi
      initializeMap()
    });

  function  initializeMap() {
    const lutsk = { lat: 50.76702937034824, lng: 25.308253865549478 };
    const mapContainer = googleMap.value;
    map.value = new google.value.maps.Map(
        mapContainer, {
          zoom: 4,
          center: lutsk,
        }
    )
  }

    function selectLanguage(lang: string) {
      languageSelected.value = lang;

      Application.setLanguage(lang);
    }

    return {
      googleMap,
      languageSelected,
      selectLanguage,
      initializeMap,
      menuOpen: Application.menuOpen,
      tutorialOpen: Application.tutorialOpen,
      ratingVenue: Application.ratingVenue,
    }
  }
}
</script>

<style scoped>
#google-map {
  z-index: 0;
  width: 100%;
  height: 100%;
}
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
