<template>
  <audio @timeupdate="updateTime"
         :src="locationAudio"
         preload="auto"
         ref="audioPlayer"></audio>
  <div class="flex flex-col  app-player mt-4 px-3">
    <div @click="updateProgressBarTime($event)"
         ref="progressBar"
         class="w-full py-1.5 flex tracking relative cursor-pointer mb-4">
      <div class="border w-full border-gray-200 absolute" />
      <div :style="{width: progress}"
           class="border border-red-600 absolute z-10" />
      <div :style="{left: progress}"
           class="h-2 w-2 absolute z-20 top-0.5 bg-red-600 rounded-full tracking-dot" />
    </div>
    <div class="controls flex gap-5 items-center justify-center">
      <img src="@/assets/svg/player/fast-backward.svg"
           alt=""
           class="cursor-pointer"
           width="32"
           height="30"
           @click="rewindBackward" />
      <img src="@/assets/svg/player/pause-track.svg"
           alt=""
           width="32"
           height="30"
           class="cursor-pointer"
           @click="togglePlayerPlay"
           v-if="isPlaying" />
      <img src="@/assets/svg/player/play-track.svg"
           alt=""
           width="32"
           height="30"
           class="cursor-pointer"
           @click="togglePlayerPlay"
           v-else />
      <img src="@/assets/svg/player/fast-forward.svg"
           alt=""
           width="32"
           height="30"
           class="cursor-pointer"
           @click="rewindForward" />
    </div>
  </div>
</template>

<script lang="ts">
import Application from "@/models/Application";
import Venue from '@/models/Venue';
import { computed, defineComponent, Ref, ref } from "vue";
import { event } from 'vue-gtag';

export default defineComponent({
  name: "AppPlayer",
  setup() {
    const isPlaying = ref(false);
    const venue = Application.detailVenue as Ref<Venue>;
    const audioPlayer = ref<HTMLAudioElement>();
    const progressBar = ref<HTMLProgressElement>();
    const progress = ref('');
    const locationAudio = computed(() => venue.value?.localizations?.find(l => l.language.code === Application.language.value)?.audioUrl);

    function togglePlayerPlay() {
      if (isPlaying.value && audioPlayer.value) {
        audioPlayer.value?.pause();
      } else {
        audioPlayer.value?.play();
      }
      isPlaying.value = !isPlaying.value;
      event('venue-toggle-play', {
        value: `venue: ${venue.value?.localizations?.[0]?.name}, isPlaying: ${!isPlaying.value}`,
      });
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
});
</script>

<style scoped>
.tracking-dot {
  top: 3px;
}
</style>
