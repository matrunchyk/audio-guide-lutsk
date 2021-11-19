<template>
  <audio @timeupdate="updateTime" :src="`data:audio/mp3;base64, ${locationAudio}`" preload="auto" ref="audioPlayer"></audio>
  <div class="flex flex-col  app-player mt-4 px-3">
    <div @click="updateProgressBarTime($event)" ref="progressBar"
         class="w-full py-1.5 flex tracking relative cursor-pointer mb-4">
      <div class="border w-full border-gray-200 absolute"/>
      <div :style="{width: progress}" class="border border-red-600 absolute z-10"/>
      <div :style="{left: progress}" class="h-2 w-2 absolute z-20 top-0.5 bg-red-600 rounded-full tracking-dot"/>
    </div>
    <div class="controls flex gap-5 items-center justify-center">
      <fast-backward class="cursor-pointer" @click="rewindBackward"/>
      <pause-track class="cursor-pointer" @click="togglePlayerPlay" v-if="isPlaying"/>
      <play-track class="cursor-pointer" @click="togglePlayerPlay" v-else/>
      <fast-forward class="cursor-pointer" @click="rewindForward"/>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineAsyncComponent, ref} from "vue";
import Application from "@/models/Application";

export default {
  name: "AppPlayer",
  components: {
    FastForward: defineAsyncComponent(() => import('@/assets/svg/player/fast-forward.svg')),
    FastBackward: defineAsyncComponent(() => import('@/assets/svg/player/fast-backward.svg')),
    PlayTrack: defineAsyncComponent(() => import('@/assets/svg/player/play-track.svg')),
    PauseTrack: defineAsyncComponent(() => import('@/assets/svg/player/pause-track.svg')),
  },
  setup() {
    const isPlaying = ref(false);
    const venue = Application.detailVenue;
    const audioPlayer = ref<HTMLAudioElement>();
    const progressBar = ref<HTMLProgressElement>();
    const progress = ref('');
    // @ts-ignore
    const locationAudio = computed(() => venue.value.localizations.find(l => l.language.code === Application.language.value).audioData);
    function togglePlayerPlay() {
      if (isPlaying.value && audioPlayer.value) {
        audioPlayer.value?.pause();
      } else {
        audioPlayer.value?.play();
      }
      isPlaying.value = !isPlaying.value;
    }

    function updateTime() {
      updateProgressBar(audioPlayer.value?.currentTime, audioPlayer.value?.duration);
    }

    function updateProgressBar(currentTime: any, duration: any) {
      progress.value = String(Math.floor((currentTime / duration) * 100) + '%');
    }

    function updateProgressBarTime(e: any) {
      if (!progressBar.value) return;
      const changeTimeNum = (e.layerX / progressBar.value.offsetWidth);
      if (!audioPlayer.value) return;
      audioPlayer.value.currentTime = (audioPlayer.value?.duration || 0) * changeTimeNum;
      progress.value = String((changeTimeNum * 100) + '%');
    }

    function rewindBackward() {
      if (!audioPlayer.value) return;
      audioPlayer.value.currentTime -= 3;
    }

    function rewindForward() {
      if (!audioPlayer.value) return;
      audioPlayer.value.currentTime += 3;
    }

    return {
      venue,
      progress,
      isPlaying,
      audioPlayer,
      progressBar,
      locationAudio,
      updateTime,
      rewindBackward,
      rewindForward,
      updateProgressBar,
      updateProgressBarTime,
      togglePlayerPlay,
    };
  },
};
</script>

<style scoped>
.tracking-dot {
  top: 3px;
}
</style>
