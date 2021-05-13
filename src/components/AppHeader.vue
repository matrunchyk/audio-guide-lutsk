<template>
  <div class="sm:flex">
    <div class="first-line justify-end flex py-3 px-4 bg-white gap-4 sm:flex-row-reverse">
      <img class="flex-none sm:hidden cursor-pointer opacity-30" src="@/assets/map.svg" alt=""/>
      <div class="flex-grow sm:hidden h-5 w-5 cursor-pointer self-center flex">
        <img src="@/assets/list2.svg" alt=""/>
      </div>
      <div class="flex group">
        <div
            class=" bg-white w-10 group-hover:block hidden rounded shadow-lg absolute z-40 images-align">
          <img class=" ml-auto mr-auto pt-1 hover:block cursor-pointer" src="@/assets/flags/ukraine.svg" alt=""/>
          <img class="ml-auto mr-auto pt-2 hover:block cursor-pointer" src="@/assets/flags/germany.svg" alt=""/>
          <img class="ml-auto mr-auto pt-2 hover:block cursor-pointer" src="@/assets/flags/usa.svg" alt=""/>
          <img class="ml-auto mr-auto pt-2 hover:block cursor-pointer" src="@/assets/flags/poland.svg" alt=""/>
          <img class="ml-auto mr-auto pt-2 hover:block pb-2  cursor-pointer" src="@/assets/flags/russia.svg" alt=""/>
        </div>
        <img class="flex-none cursor-pointer mt-px" src="@/assets/flags/ukraine.svg" alt=""/>
      </div>
      <img class="flex-none" src="@/assets/divider.svg" alt=""/>
      <img class="flex-none cursor-pointer" src="@/assets/hamburger.svg" alt=""/>
    </div>
    <div class="second-line sm:flex bg-white mt-0.5 py-3 sm:items-center px-4">
      <AppToggle/>
    </div>
    <LanguageSelector v-if="!languageSelected" v-on:select="hideLanguageSelector"/>
  </div>
</template>

<style>
.images-align {
  margin-left: -9px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
}
</style>

<script lang="ts">
import { onBeforeMount, ref } from 'vue';
import AppToggle from './AppToggle.vue';
import LanguageSelector from "@/components/LanguageSelector";


// noinspection JSUnusedGlobalSymbols
export default {
  name: "AppHeader",
  components: {
    AppToggle,
    LanguageSelector,
  },
  setup() {
    let languageSelected = ref(null);

    onBeforeMount(() => {
      languageSelected.value = localStorage.getItem('languageSelected');

      if (!languageSelected.value) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    });

    function hideLanguageSelector(lang) {
      console.log(lang)
      localStorage.setItem('languageSelected', lang);
      languageSelected.value = lang;
    }

    return {
      languageSelected,
      hideLanguageSelector,
    }
  }
}
</script>
