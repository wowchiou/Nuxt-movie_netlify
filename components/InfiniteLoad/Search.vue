<template>
  <!-- Components/InfiniteLoad/Search -->
  <InfiniteLoad
    :page="page"
    :total-page="totalPage"
    :loading="loading"
    @load="loadMoreData"
  >
    <CardGroup>
      <NuxtLinkLocale
        v-for="itm in searchList"
        :key="itm.id"
        :to="`/${itm.media_type}/${itm.id}/overview`"
      >
        <CardMedia :media="itm" />
      </NuxtLinkLocale>
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

// data
const searchList = ref<SearchResult[]>([]);
const page = ref(1);
const totalPage = ref(1);
const loading = ref(false);

// computed
const noMoreData = computed(() => page.value > totalPage.value);

// watch
watch(
  () => route.query.key,
  () => {
    searchList.value = [];
    page.value = 1;
    getSearchData();
  }
);

// created
getSearchData();

// methods
async function getSearchData() {
  if (!props.search) return;
  if (noMoreData.value) return;
  try {
    loading.value = true;
    const res = await searchTMDB(props.search, page.value);
    searchList.value = [...searchList.value, ...res.results];
    totalPage.value = res.total_pages;
    emit('getTotal', res.total_results);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

function loadMoreData() {
  page.value++;
  getSearchData();
}
</script>
