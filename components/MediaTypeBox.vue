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
    <CardMedia
      v-for="(item, index) in result"
      :key="`${data.type}-${item.id}-${index}`"
      class="w-[40vw] sm:w-[25rem] flex-shrink-0"
      :path="`/${data.type}/${item.id}/overview`"
      :media="item"
    />
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
