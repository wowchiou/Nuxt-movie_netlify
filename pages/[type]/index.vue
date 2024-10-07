<template>
  <!-- pages/[type]/index -->
  <div class="py-4">
    <MediaTypeBox
      v-for="(itm, idx) in pageQuery"
      :key="`media-${itm.title}`"
      :data="itm"
      :class="idx !== 0 && 'mt-8'"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
  middleware: 'movie-or-tv',
});

const route = useRoute();
const pageType = computed(() => route.params.type);
const pageQuery = computed(() => {
  if (pageType.value === 'movie' || pageType.value === 'tv') {
    return QUERY_LIST[pageType.value];
  }
  return [];
});

useHead({
  title: pageType.value === 'movie' ? 'Movies' : 'TV Shows',
});
</script>
