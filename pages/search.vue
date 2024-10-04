<template>
  <!-- pages/search -->
  <div>
    <div
      class="flex items-center px-3 sm:px-6 py-4 border-b-[1px] border-gray-600"
    >
      <NuxtIcon class="text-3xl mr-2" name="material-symbols:search-rounded" />
      <ElInput
        v-model="currentSearch"
        :placeholder="$t('Search')"
        size="large"
        @change="handleSearch"
      />
    </div>
    <div class="px-3 sm:px-6">
      <div class="pt-2">
        <p class="text-3xl">
          {{ $t('Search result for: {currentSearch}', { currentSearch }) }}
        </p>
        <p class="mt-1 text-xl">{{ $t('{count} items', { count }) }}</p>
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
definePageMeta({ middleware: 'search' });
useHead({ title: 'Search' });

const route = useRoute();
const router = useRouter();
const key = route.query.key as string;

// data
const currentSearch = ref(key);
const count = ref(0);

// methods
function handleSearch() {
  router.replace({ query: { ...route.query, key: currentSearch.value } });
}
</script>
