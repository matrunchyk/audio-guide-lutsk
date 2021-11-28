<template>
  <div class="MapPage">
    <Suspense>
      <AppHeader v-if="$route.name !== '404'" />
    </Suspense>
    <AppMap/>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  name: "map-page",
  components: {
    AppMap: defineAsyncComponent(() => import(/* webpackPrefetch: true */ '@/components/AppMap.vue')),
    AppHeader: defineAsyncComponent(() => import(/* webpackPrefetch: true */ '@/components/AppHeader.vue')),
  },
});
</script>
