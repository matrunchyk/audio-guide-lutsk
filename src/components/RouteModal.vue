<template>
  <div
      class=" z-10 absolute inset-0 bg-opacity-60 flex justify-center content-center bg-black w-full flex-col items-center gap-1">
    <div class="w-10/12 relative sm:w-2/5 bg-white py-5 text-sm rounded-xl">
      <IconModelClose
          @click="Application.setRouteModalOpen(false)"
          class="w-4 absolute right-0 -mt-10  cursor-pointer"/>
      <div class="text-center mb-2 text-xl font-semibold">{{ $t('make_route') }}</div>
      <div class="pb-4 text-center text-sm">{{ $t('modals.make_route_content') }}
      </div>
      <AppButton @click="Application.setRouteModalOpen(false)">{{ $t('buttons.agree') }}</AppButton>

    </div>
  </div>
</template>

<script lang="ts">
import Application from '@/models/Application';
import {defineAsyncComponent} from "vue";

export default {
  name: "RouteModal",
  components: {
    IconModelClose: defineAsyncComponent(() => import('@/assets/svg/icon-modal-close.svg')),
    AppButton: defineAsyncComponent(() => import('@/components/AppButton.vue')),
  },
  setup() {
    return {
      Application,
    };
  },
};
</script>
