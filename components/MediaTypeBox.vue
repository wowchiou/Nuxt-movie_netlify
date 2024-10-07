<template>
  <!-- components/MediaTypeBox -->
  <CardWrapper>
    <template #title>
      <div class="flex justify-between items-center">
        <h2>{{ $t(data.title) }}</h2>
        <NuxtLinkLocale
          :to="`/${data.type}/category/${data.query}`"
          class="text-gray-400 sm:hover:text-gray-300 text-[1.6rem] cursor-pointer"
        >
          {{ $t('Explore more') }}
        </NuxtLinkLocale>
      </div>
    </template>
    <NuxtLinkLocale
      v-for="item in result"
      :key="item.id"
      :to="`/${data.type}/${item.id}/overview`"
      class="w-[40%] sm:w-[25rem] flex-shrink-0"
    >
      <CardMedia :media="item" />
    </NuxtLinkLocale>
  </CardWrapper>
</template>

<script setup lang="ts">
import type { QueryItem } from '~/types';

const props = defineProps<{
  data: QueryItem;
}>();

// 獲取電影或電視劇列表
const res = await getTMDBMediaWithQuery(props.data.type, props.data.query);
const result = ref(res.results);
</script>
