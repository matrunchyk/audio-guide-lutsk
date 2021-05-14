<template>
  <div class="AppLocations">
    <LocationItem
      v-for="location in locations"
      :key="location.name"
      :location="location" />
  </div>
</template>

<script>
import LocationItem from './LocationItem.vue';
import faker from 'faker';

export default {
  name: "AppLocations",
  components: {
    LocationItem,
  },
  setup() {
    const locations = Array(30).fill(0).map((_, index) => ({
      name: faker.lorem.sentence(),
      image: faker.image.city() + '?index=' + index,
      icon: faker.image.abstract(20, 20) + '?index=' + index,
      recommended: faker.datatype.boolean(),
      rated: faker.datatype.boolean(),
      rating: faker.datatype.number({ min: 0, max: 5 }),
      pinned: faker.datatype.boolean(),
    }))
    .sort((a, b) => -b.recommended - +a.recommended)
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

<style scoped>

</style>
