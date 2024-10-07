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
import type { MediaType, QueryItem } from '~/types';

definePageMeta({
  key: (route) => route.fullPath,
  middleware: 'movie-or-tv',
});

const route = useRoute();
const i18n = useI18n();
const type = route.params.type as MediaType;
const category = route.params.category as string;
const queryItem = QUERY_LIST[type].find(
  (item) => item.query === category
) as QueryItem;

useHead({
  title: i18n.t(queryItem.title),
});
</script>
