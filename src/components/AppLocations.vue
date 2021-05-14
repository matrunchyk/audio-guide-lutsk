<template>
  <div class="AppLocations">
    <LocationItem
      v-for="location in locations"
      :key="location.index"
      :location="location" />
  </div>
</template>

<script>
import LocationItem from './LocationItem.vue';
import faker from 'faker';

const images = require.context('../assets/locations/', false, /\.jpg$/);

export default {
  name: "AppLocations",
  components: {
    LocationItem,
  },
  setup() {
    const locations = Array(7).fill(0).map((_, index) => ({
      index,
      name: faker.lorem.sentence(),
      image: images(`./${index + 1}.jpg`).default,
      icon: faker.image.abstract(20, 20) + '?index=' + index,
      recommended: faker.datatype.number({ min: 0, max: 1 }),
      rated: faker.datatype.boolean(),
      rating: faker.datatype.number({ min: 0, max: 5 }),
      pinned: faker.datatype.boolean(),
    }))
    .sort((a, b) => b.recommended - a.recommended)
    .map((item, index, arr) => ({
      ...item,
      firstRecommended: !index && item.recommended,
      lastRecommended: item.recommended && arr[index + 1] && !arr[index + 1].recommended,
    }));

    return {
      locations,
    };
  },
};
</script>
