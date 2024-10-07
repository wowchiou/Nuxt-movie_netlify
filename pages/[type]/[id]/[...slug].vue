<template>
  <!-- pages/[type]/[id]/[...slug] -->
  <div></div>
</template>

<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
  middleware: 'no-found',
});
</script>
