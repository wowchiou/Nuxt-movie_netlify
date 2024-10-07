<template>
  <!-- components/MediaTypeBox -->
  <CardWrapper>
    <template #title>
      <div class="flex justify-between items-center">
        <h2>{{ $t(data.title) }}</h2>
        <NuxtLinkLocale
          :to="`/${data.type}/category/${data.query}`"
          class="text-gray-500 sm:hover:text-gray-300 text-[13px] sm:text-[16px] cursor-pointer"
        >
          {{ $t('Explore more') }}
        </NuxtLinkLocale>
      </div>
    </template>
    <NuxtLinkLocale
      v-for="item in result"
      :key="item.id"
      :to="`/${data.type}/${item.id}/overview`"
      class="w-[50%] sm:w-[250px] flex-shrink-0"
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
