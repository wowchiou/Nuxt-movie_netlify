<template>
  <!-- components/ImageBar/Star -->
  <div>
    <ImageBar
      class="stars"
      :dark-image="'/img/stars.webp'"
      :light-image="'/img/stars-filled.webp'"
      :percent="percent"
      origin="left"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  percent: number;
}>();
</script>

<style scoped>
.stars {
  :deep(img) {
    filter: hue-rotate(320deg) !important;
  }
}
</style>
