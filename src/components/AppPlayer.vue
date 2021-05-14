<template>
  <div class="flex flex-col app-player mt-4">
    <div class="flex tracking relative cursor-pointer mb-4">
      <div class="border w-full border-gray-200 absolute" />
      <div class="border w-1/3 border-red-600 absolute z-10" />
      <div class="h-2 w-2 absolute z-20 left-1/3 -top-0.5 bg-red-600 rounded-full tracking-dot" />
    </div>
    <div class="controls flex gap-5 items-center justify-center">
      <prev-track class="cursor-pointer"/>
      <fast-backward class="cursor-pointer" />
      <pause-track class="cursor-pointer" v-if="isPlaying" />
      <play-track class="cursor-pointer" v-else />
      <fast-forward class="cursor-pointer" />
      <next-track class="cursor-pointer" />
    </div>
  </div>
</template>

<script lang="ts">
import FastBackward from '@/assets/player/fast-backward.svg';
import FastForward from '@/assets/player/fast-forward.svg';
import NextTrack from '@/assets/player/next-track.svg';
import PauseTrack from '@/assets/player/pause-track.svg';
import PlayTrack from '@/assets/player/play-track.svg';
import PrevTrack from '@/assets/player/prev-track.svg';

export default {
  name: "AppPlayer",
  components: {
    FastForward,
    FastBackward,
    NextTrack,
    PrevTrack,
    PlayTrack,
    PauseTrack,
  },
  setup() {
    return {
      isPlaying: false,
    };
  },
};
</script>

<style scoped>
.tracking-dot {
  top: -3px;
}
</style>
