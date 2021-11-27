<template>
  <div
    class=" Tutorial z-50 absolute inset-0 bg-opacity-60 h-full flex justify-center content-center bg-black w-full flex-col items-center gap-1">
    <div class="w-3/4">
      <img
        src="@/assets/svg/icon-modal-close.svg"
        alt=""
        width="16"
        height="16"
        class="w-4 ml-auto cursor-pointer"
        @click="Application.setTutorialOpen(false)" />
    </div>
    <div class="tutorial-content overflow-auto w-3/4 bg-white py-5 px-12 text-sm rounded-md">
      <div class="text-center mb-2 text-xl font-semibold">{{ $t('header.instruction') }}</div>
      <div class="text-tutorial pb-4">
        {{ $t('header.instruction_content') }}
      </div>
      <div class="text-tutorial pb-4">
        {{ $t('header.instruction_content') }}
      </div>
      <div class="text-tutorial pb-4">
        {{ $t('header.instruction_content') }}
      </div>
      <div class="text-tutorial pb-4">
        {{ $t('header.instruction_content') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Application from '@/models/Application';

export default {
  name: "AppTutorial",
  setup() {
    return {
      Application,
    };
  },
};
</script>

<style>
@media (max-width: 810px) {
  .text-tutorial {
    font-size: 13px;
  }

  .tutorial-content {
    height:   85%;
    overflow: auto;
  }
}
</style>

