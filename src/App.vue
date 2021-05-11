<template>
  <div class="flex">
    <div class="flex-grow sm:flex-none">
      <AppHeader></AppHeader>
      <AppLocations></AppLocations>
    </div>
    <iframe
        class="hidden flex-grow sm:block"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80797.7896696666!2d25.263965228817042!3d50.73976997371188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472599eba185965d%3A0xd25274a2228db86c!2z0JvRg9GG0YzQuiwg0JLQvtC70LjQvdGB0YzQutCwINC-0LHQu9Cw0YHRgtGM!5e0!3m2!1suk!2sua!4v1620169394908!5m2!1suk!2sua"
        style="border:0;" allowfullscreen="" loading="lazy"></iframe>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppLocations from './components/AppLocations.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppLocations
  }
}
</script>

<style scoped>
div {
  background: #E5E5E5;
}
</style>
