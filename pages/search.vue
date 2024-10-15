<template>
  <!-- pages/search -->
  <div>
    <div
      class="sticky top-0 left-0 z-20 flex items-center p-6 border-b-[1px] border-gray-600 backdrop-blur-md backdrop-brightness-50"
    >
      <ElInput
        v-model="currentSearch"
        :placeholder="$t('Type something to search...')"
        size="large"
        @change="handleSearch"
      />
      <NuxtIcon
        class="text-5xl ml-4 cursor-pointer"
        name="material-symbols:search-rounded"
        @click="handleSearch"
      />
    </div>
    <div class="px-6">
      <div class="pt-4">
        <p class="text-4xl">
          {{ $t('Search result for: {currentSearch}', { currentSearch }) }}
        </p>
        <p class="mt-2 text-3xl">{{ $t('{count} items', { count }) }}</p>
      </div>
      <div class="mt-4">
        <InfiniteLoadSearch
          :search="currentSearch"
          @get-total="(t) => (count = t)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: 'search' });

const route = useRoute();
const router = useRouter();
const key = route.query.key as string;
const currentSearch = ref(key);
const count = ref(0);

function handleSearch() {
  router.replace({ query: { ...route.query, key: currentSearch.value } });
}

useHead({ title: 'Search' });
useSeoMeta({ ogUrl: useRequestURL().href });
</script>
