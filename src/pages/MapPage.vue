<template>
  <div class="MapPage">
    <iframe
        class="flex-grow h-full sm:block w-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80797.7896696666!2d25.263965228817042!3d50.73976997371188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472599eba185965d%3A0xd25274a2228db86c!2z0JvRg9GG0YzQuiwg0JLQvtC70LjQvdGB0YzQutCwINC-0LHQu9Cw0YHRgtGM!5e0!3m2!1suk!2sua!4v1620169394908!5m2!1suk!2sua"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        title=""/>
  </div>
  <RouteModal/>
</template>

<script>
import RouteModal from '../components/RouteModal.vue';

export default {
  name: "map-page",
  components: {
    RouteModal
  },
}
</script>

<style scoped>
.MapPage {
  height: calc(100vh - 96px);
}
</style>