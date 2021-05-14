<template>
  <div
    class="p-1.5 m-1.5 relative LocationItem bg-transparent"
    :class="{
      'bg-red-100 border-l border-r border-red-300 my-0': location.recommended,
      'rounded-t-md border-t mt-1.5': location.firstRecommended,
      'rounded-b-md border-b mb-1.5': location.lastRecommended,
    }"
  >
    <div
      v-if="location.firstRecommended && location.recommended"
      class="text-recommended text-x-red mt-1 mb-2">Рекомендовано
    </div>
    <div
      class="sound bg-x-red flex justify-center items-center rounded-full absolute right-3 w-12 h-12 cursor-pointer"
      :class="{
      'top-32': location.firstRecommended && location.recommended,
      'top-24': !(location.firstRecommended && location.recommended),
    }">
      <img
        src="@/assets/volume.svg"
        alt=""
        class="w-6 h-6">
    </div>
    <img
      :src="location.image"
      alt=""
      class="w-full h-52">
    <div>
      <img
        v-if="location.pinned"
        alt=""
        src="@/assets/red-line.svg"
        class="absolute right-2"
        :class="{
            'top-9': location.firstRecommended && location.recommended,
            'top-0.5': !(location.firstRecommended && location.recommended),
           }"
      >
    </div>
    <div class="flex icon bg-x-red gap-4 pl-4 py-2.5">
      <img
        class="flex-none cursor-pointer self-center"
        alt=""
        :src="location.icon">
      <div class="flex-grow cursor-pointer text-white text-md flex">{{ location.name }}</div>
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
                transform="translate(0.588379)" />
            </clipPath>
          </defs>
        </svg>

      </div>
      <div class="flex-none text-xs underline cursor-pointer">
        {{ location.rated ? 'Оцінити' : 'Змінити оцінку' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, reactive } from 'vue';

export default {
  name: "LocationItem",
  props: {
    location: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup(props) {
    const stars = reactive(Array(5).fill(0).map((_, index) => ({
      index,
      fill: props.location.rated ? '#b3b3b3' : '#f1cd0d',
      rated: props.location.rating <= index + 1,
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
