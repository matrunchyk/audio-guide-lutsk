<template>
  <audio :src="venue.audioFile" preload="auto" ref="audioPlayer"></audio>
  <div class="flex flex-col  app-player mt-4">
    <div class="flex tracking relative cursor-pointer mb-4">
      <div class="border w-full border-gray-200 absolute" />
      <div class="border w-1/3 border-red-600 absolute z-10" />
      <div class="h-2 w-2 absolute z-20 left-1/3 -top-0.5 bg-red-600 rounded-full tracking-dot" />
    </div>
    <div class="controls flex gap-5 items-center justify-center">
      <prev-track class="cursor-pointer"/>
      <fast-backward class="cursor-pointer" />
      <pause-track class="cursor-pointer"  @click="togglePlayerPlay"  v-if="isPlaying" />
      <play-track class="cursor-pointer" @click="togglePlayerPlay" v-else />
      <fast-forward class="cursor-pointer" />
      <next-track class="cursor-pointer" />
    </div>
  </div>
</template>

<script lang="ts">
import FastBackward from '@/assets/svg/player/fast-backward.svg';
import FastForward from '@/assets/svg/player/fast-forward.svg';
import NextTrack from '@/assets/svg/player/next-track.svg';
import PauseTrack from '@/assets/svg/player/pause-track.svg';
import PlayTrack from '@/assets/svg/player/play-track.svg';
import PrevTrack from '@/assets/svg/player/prev-track.svg';
import {ref} from "vue";
import Application from "@/models/Application";

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
    const isPlaying = ref(false)
    const venue = Application.detailVenue
    const audioPlayer = ref<HTMLAudioElement>()
    function togglePlayerPlay() {
      if(isPlaying.value && audioPlayer.value) {
        audioPlayer.value?.pause()
      } else {
        audioPlayer.value?.play()
      }

      isPlaying.value = !isPlaying.value
    }
    return {
      venue,
      isPlaying,
      audioPlayer,
      togglePlayerPlay
    };
  },
};
</script>

<style scoped>
.tracking-dot {
  top: -3px;
}
</style>
