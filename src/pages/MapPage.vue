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
    AppMap: defineAsyncComponent(() => import('@/components/AppMap.vue')),
    AppHeader: defineAsyncComponent(() => import('@/components/AppHeader.vue')),
  },
});
</script>
