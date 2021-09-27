<template>
  <div
      class="p-1.5 m-1.5 relative VenueItem bg-transparent"
      :class="{
      'bg-red-100 border-l border-r border-red-300 my-0': venue.recommended,
      'rounded-t-md border-t mt-1.5': venue.firstRecommended,
      'rounded-b-md border-b mb-1.5': venue.lastRecommended,
    }"
  >
    <div
        v-if="venue.firstRecommended && venue.recommended"
        class="text-recommended text-x-red mt-1 mb-2">Рекомендовано
    </div>
    <div
        class="sound bg-x-red flex justify-center items-center rounded-full absolute right-3 w-12 h-12 cursor-pointer"
        :class="{
      'top-32': venue.firstRecommended && venue.recommended,
      'top-24': !(venue.firstRecommended && venue.recommended),
    }"
        onmouseover="this.svg='whitesound.svg';">
      <svg-volume class="w-6 volume h-6" @click="venue.showDetail(false)"/>
    </div>
    <img
        :src="venue.image"
        alt=""
        @click="venue.showDetail()"
        class="w-full h-52 cursor-pointer">
    <div>

      <svg-bookmark
          v-if="venue.isFavorite"
          class="absolute right-2"
          :class="{
            'top-9': venue.firstRecommended && venue.recommended,
            'top-0.5': !(venue.firstRecommended && venue.recommended),
           }"
      />
    </div>
    <div class="flex icon bg-x-red gap-4 pl-4 py-2.5">
      <img
          class="flex-none cursor-pointer self-center"
          alt=""
          :src="venue.icon"
      >
      <div class="flex-grow cursor-pointer text-white text-md flex" @click="venue.showDetail()">{{ venue.name }}</div>
    </div>
    <div class="flex stars gap-4 px-4 py-2.5 rounded-b-md">
      <div class="flex-none text-xs">Рейтинг</div>
      <div class="flex-grow flex">
        <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            v-for="(star, index) in stars"
            :key="index"
            class="mr-1">
          <g clip-path="url(#clip0)">
            <path
                d="M8.44311 0.583618L10.3511 5.09956L15.2359 5.5192C15.5747 5.54845 15.7125 5.97117 15.4553 6.1937L11.7502 9.40375L12.8605 14.1792C12.9375 14.511 12.5779 14.7721 12.2869 14.5957L8.08892 12.064L3.89098 14.5957C3.59916 14.7713 3.24035 14.5103 3.31735 14.1792L4.42766 9.40375L0.721741 6.19293C0.464568 5.9704 0.601624 5.54768 0.941186 5.51843L5.82595 5.09879L7.73396 0.583618C7.8664 0.269465 8.31068 0.269465 8.44311 0.583618Z"
                :fill="star.fill"
                stroke="none"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect
                  width="15"
                  height="15"
                  fill="white"
                  transform="translate(0.588379)"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <div class="flex-none text-xs underline cursor-pointer" @click="venue.showRatingModal()">
        {{ venue.rated ? 'Оцінити' : 'Змінити оцінку' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Venue from '@/models/Venue';
import {PropType, reactive} from 'vue';
import SvgVolume from "@/assets/svg/volume.svg";
import SvgBookmark from '@/assets/svg/bookmark.svg';

export default {
  name: "AppVenue",
  components: {
    SvgVolume,
    SvgBookmark,
  },
  props: {
    venue: {
      type: Object as PropType<Venue>,
      required: true,
    },
  },
  setup(props: any) {
    const stars = reactive(Array(5).fill(0).map((_, index) => ({
      index,
      fill: props.venue.rated ? '#b3b3b3' : '#f1cd0d',
      rated: props.venue.rating <= index + 1,
    })));

    return {
      stars,
    };
  },
};
</script>

<style scoped>
.stars {
  background: #FFFFFF;
}
</style>
