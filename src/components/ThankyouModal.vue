<template>
  <div
    class=" z-50 absolute inset-0 bg-opacity-60 flex justify-center content-center bg-black w-full flex-col items-center gap-1">
    <div class=" bg-white flex rounded-md relative px-2 w-3/4">
      <div class="thank-you-modal-content flex-grow flex text-xl px-28 py-14 content-center justify-center">
        {{ $t('modals.thank_you') }}
        <img src="@/assets/svg/icon-modal-close.svg"
             alt=""
             width="16"
             height="16"
             @click="closeModal"
             class="close-modal w-4 absolute right-0 -mt-20  cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Application from "@/models/Application";

export default {
  name: "ThankyouModal",
  components: {},
  setup() {
    function closeModal() {
      Application.resetRatingVenue();
      Application.setThankYouModalOpen(false);
    }

    return {
      Application,
      closeModal,
    };
  },
};
</script>

<style scoped>
@media (max-width: 640px) {
  .thank-you-modal-content {
    padding:   3rem;
    font-size: 17px;
  }

  .close-modal {
    margin-top: -4.4rem;
  }
}
</style>
