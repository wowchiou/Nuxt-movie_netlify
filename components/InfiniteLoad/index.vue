<template>
  <div class="infinite_loader">
    <div v-infinite-scroll="loadMoreData" :infinite-scroll-disabled="disabled">
      <slot />
    </div>
    <div v-if="loading" class="text-5xl text-gray-300 text-center py-8">
      <NuxtIcon name="line-md:loading-twotone-loop" />
    </div>
    <div v-else-if="noMoreData">
      <p class="text-3xl text-gray-400 text-center py-8">No more data</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading: boolean;
  page: number;
  totalPage: number;
}>();

const emit = defineEmits<{
  (e: 'load'): void;
}>();

const noMoreData = computed(() => props.page >= props.totalPage);
const disabled = computed(() => noMoreData.value || props.loading);

function loadMoreData() {
  if (disabled.value) return;
  emit('load');
}
</script>
