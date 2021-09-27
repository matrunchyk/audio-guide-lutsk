<template>
  <div
      class=" z-10 absolute inset-0 bg-opacity-60 flex justify-center content-center bg-black w-full flex-col items-center gap-1">
    <div class="w-10/12 relative sm:w-2/5 bg-white py-5 text-sm rounded-xl">
      <IconModelClose
          @click="Application.setRouteModalOpen(false)"
          class="w-4 absolute right-0 -mt-10  cursor-pointer"/>
      <div class="text-center mb-2 text-xl font-semibold">Прокласти маршрут</div>
      <div class="pb-4 text-center text-sm">Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
      </div>
      <AppButton @click="Application.setRouteModalOpen(false)">Зрозуміло</AppButton>

    </div>
  </div>
</template>

<script lang="ts">
import IconModelClose from '@/assets/svg/icon-modal-close.svg';
import AppButton from '@/components/AppButton.vue';
import Application from '@/models/Application';

export default {
  name: "RouteModal",
  components: {
    IconModelClose,
    AppButton,
  },
  setup() {
    return {
      Application,
    };
  },
};
</script>
