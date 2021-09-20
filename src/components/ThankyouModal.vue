<template>
  <div class="z-10 absolute inset-0 bg-opacity-60 flex justify-center content-center bg-black w-full flex-col items-center gap-1">
    <div class=" bg-white flex rounded-md relative px-2">
      <div class="flex-grow flex text-xl px-28 py-14 content-center justify-center">
        Дякуємо за відгук!
        <IconModelClose
            @click="closeThankyouModal"
            class="w-4 absolute right-0 -mt-20  cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>

<script>
import IconModelClose from '@/assets/icon-modal-close.svg';

export default {
  name: "ThankyouModal",
  components: {
    IconModelClose
  },
  methods: {
    closeThankyouModal() {
      console.log('close')
    }
  }

}
</script>

<style scoped>

</style>