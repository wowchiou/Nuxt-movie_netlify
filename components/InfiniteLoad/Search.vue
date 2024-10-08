<template>
  <!-- Components/InfiniteLoad/Search -->
  <InfiniteLoad
    :page="page"
    :total-page="totalPage"
    :loading="loading"
    @load="loadMoreData"
  >
    <CardGroup>
      <CardMedia
        v-for="itm in searchList"
        :key="itm.id"
        :path="`/${itm.media_type}/${itm.id}/overview`"
        :media="itm"
      />
    </CardGroup>
  </InfiniteLoad>
</template>

<script setup lang="ts">
import type { SearchResult } from '~/types';

const props = defineProps<{
  search: string;
}>();

const emit = defineEmits<{
  (e: 'getTotal', total: number): void;
}>();

const route = useRoute();
const searchList = ref<SearchResult[]>([]);
const page = ref(1);
const totalPage = ref(1);
const totalResults = ref(0);
const loading = ref(false);
const noMoreData = computed(() => page.value > totalPage.value);

watch(
  () => route.query.key,
  () => {
    searchList.value = [];
    page.value = 1;
    getSearchData();
  }
);

getSearchData();

async function getSearchData() {
  if (!route.query.key) return setTotalCount(0);
  if (noMoreData.value) return;
  try {
    loading.value = true;
    const res = await searchTMDB(props.search, page.value);
    searchList.value = [...searchList.value, ...res.results];
    totalPage.value = res.total_pages;
    setTotalCount(res.total_results);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

function setTotalCount(count: number) {
  totalResults.value = count;
  emit('getTotal', count);
}

function loadMoreData() {
  page.value++;
  getSearchData();
}
</script>
