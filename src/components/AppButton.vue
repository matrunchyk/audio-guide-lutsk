<template>
  <div class="flex justify-center cursor-pointer">
    <div
      class="w-72 bg-blue-900 py-2 text-center text-white justify-center flex gap-2 items-center"
      @click="$emit('click')">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AppButton",
  emits: ['click'],
};
</script>

<style scoped>

</style>
