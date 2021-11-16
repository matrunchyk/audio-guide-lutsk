<template>
  <div
      class="z-10 absolute inset-0 bg-opacity-60 flex justify-center content-center bg-black w-full flex-col items-center gap-1">
    <div class=" bg-white flex rounded-md relative px-2">
      <div class="flex-grow flex text-xl px-28 py-14 content-center justify-center">
        Дякуємо за відгук!
        <IconModelClose
            @click="closeModal"
            class="w-4 absolute right-0 -mt-20  cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Application from "@/models/Application";
import {defineAsyncComponent} from "vue";

export default {
  name: "ThankyouModal",
  components: {
    IconModelClose: defineAsyncComponent(() => import('@/assets/svg/icon-modal-close.svg')),
  },
  setup() {
    function closeModal() {
      Application.resetRatingVenue();
      Application.setThankYouModalOpen(false)
    }
    return {
      Application,
      closeModal,
    };
  }
};
</script>