<template>
  <!-- pages/[type]/category/[category] -->
  <div class="px-3 sm:px-6 py-4">
    <div class="text-[18px] sm:text-[22px]">
      {{ $t(queryItem.title) }}
    </div>
    <div class="mt-4">
      <InfiniteLoadCategory :type="type" :query="category" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QueryItem } from '~/types';

definePageMeta({
  key: (route) => route.fullPath,
  middleware: 'movie-or-tv',
});

const route = useRoute();
const i18n = useI18n();
const type = route.params.type as 'movie' | 'tv';
const category = route.params.category as string;

if (type !== 'movie' && type !== 'tv') {
  throw new Error('Invalid type');
}

const queryItem = QUERY_LIST[type].find(
  (item) => item.query === category
) as QueryItem;

useHead({
  title: i18n.t(queryItem.title),
});
</script>
