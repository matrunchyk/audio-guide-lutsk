<template>
  <div class="flex h-screen justify-center gap-4  items-center flex-col w-full">
    <svgMan/>
    <div class="text-xl">Упс!</div>
    <div>Вибачте, але сторінка за цим <br/>посиланням не знайдена.</div>
    <router-link tag="div" to="/" class="buttonback p-3 rounded-md">Повернутись на Головну</router-link>
  </div>

</template>

<script>

import svgMan from '@/assets/man.svg';
export default {
  name: "ErrorPage",
  components: {
    svgMan
  }
}
</script>

<style scoped>
  .buttonback {
    background: #1F3D87;
    color: #FFFFFF;
  }
</style>