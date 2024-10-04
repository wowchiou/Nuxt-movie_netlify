<template>
  <!-- components/Detail/Videos -->
  <div class="px-3 sm:px-6 text-[18px] sm:text-[22px]">
    <div>
      {{
        $t('{numberOfVideos} Videos', {
          numberOfVideos: data?.length || 0,
        })
      }}
    </div>
    <div
      v-if="data && data.length"
      class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-6"
    >
      <CardVideo
        v-for="v in data"
        :key="v.id"
        class="cursor-pointer"
        :video="v"
      />
    </div>
    <div v-else class="text-[16px] mt-4 text-gray-500">No videos found</div>
  </div>
</template>

<script setup lang="ts">
import type { Video } from '~/types';

defineProps<{
  data: Video[] | undefined;
}>();
</script>
