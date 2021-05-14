<template>
  <div class="AppVenues">
    <AppVenue
      v-for="venue in venues"
      :key="venue.index"
      :venue="venue" />
  </div>
</template>

<script lang="ts">
import AppVenue from '@/components/AppVenue.vue';
import Venue from '@/models/Venue';
import faker from 'faker';

const images = require.context('../assets/venues/', false, /\.jpg$/);

export default {
  name: "AppVenues",
  components: {
    AppVenue: AppVenue,
  },
  setup() {
    const venues = Array(7).fill(0).map((_, index) => new Venue({
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
    .map(
      (venue, index, arr) => venue.enhanceRecommended(
        !index && !!venue.recommended,
        !!venue.recommended && arr[index + 1] && !arr[index + 1].recommended,
      )
    );

    return {
      venues,
    };
  },
};
</script>
