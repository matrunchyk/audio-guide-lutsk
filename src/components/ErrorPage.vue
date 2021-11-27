<template>
  <div class="flex h-screen justify-center gap-4  items-center flex-col w-full">
    <svgMan/>
    <div class="text-xl">{{ $t('errors.oops') }}</div>
    <div>{{ $t('errors.sorry_but') }} <br/>{{ $t('errors.not_found') }}</div>
    <router-link tag="div" to="/" class="buttonback p-3 rounded-md">{{ $t('errors.back_to') }}</router-link>
  </div>

</template>

<script>
import {defineAsyncComponent} from "vue";

export default {
  name: "ErrorPage",
  components: {
    svgMan: defineAsyncComponent(() => import('@/assets/svg/man.svg')),
  }
};
</script>

<style scoped>
.buttonback {
  background: #1F3D87;
  color: #FFFFFF;
}
</style>
