<template>
  <!-- components/InfiniteLoad/Category -->
  <InfiniteLoad
    :page="page"
    :total-page="totalPage"
    :loading="loading"
    @load="loadMoreData"
  >
    <CardGroup>
      <CardMedia
        v-for="(itm, idx) in searchList"
        :key="`${type}-${itm.id}-${idx}`"
        :path="`/${type}/${itm.id}/overview`"
        :media="itm"
      />
    </CardGroup>
  </InfiniteLoad>
</template>

<script setup lang="ts">
import type { SearchResult } from '~/types';

const props = defineProps<{
  type: string;
  query: string;
}>();

const page = ref(1);
const totalPage = ref(1);
const loading = ref(false);
const searchList = ref<SearchResult[]>([]);

getCategoryData();

async function getCategoryData() {
  try {
    loading.value = true;
    const res = await getTMDBMediaWithQuery(
      props.type,
      props.query,
      page.value
    );
    searchList.value = [...searchList.value, ...res.results];
    totalPage.value = res.total_pages;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

function loadMoreData() {
  if (page.value > totalPage.value) return;
  page.value++;
  getCategoryData();
}
</script>
