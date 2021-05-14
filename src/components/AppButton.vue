<template>
  <div class="flex justify-center cursor-pointer">
    <div
      class="w-72 bg-blue-900 py-2 text-center text-white"
      @click="$emit('click')">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppButton",
  emits: ['click'],
};
</script>

<style scoped>

</style>
