<template>
  <div class="flex h-screen justify-center gap-4  items-center flex-col w-full">
    <img src="@/assets/svg/man.svg"
         alt="" />
    <div class="text-xl">{{ $t('errors.oops') }}</div>
    <div>{{ $t('errors.sorry_but') }} <br />{{ $t('errors.not_found') }}</div>
    <router-link
      to="/"
    >
      <div class="button-back p-3 rounded-md">{{ $t('errors.back_to') }}</div>
    </router-link>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "ErrorPage",
});
</script>

<style scoped>
.button-back {
  background: #1F3D87;
  color:      #FFFFFF;
}
</style>
