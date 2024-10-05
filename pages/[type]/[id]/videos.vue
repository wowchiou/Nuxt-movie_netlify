<template>
  <!-- pages/[type]/[id]/videos -->
  <div class="px-3 sm:px-6 text-[18px] sm:text-[22px]">
    <div>
      {{
        $t('{numberOfVideos} Videos', {
          numberOfVideos: videos?.length || 0,
        })
      }}
    </div>
    <div
      v-if="videos && videos.length"
      class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-6"
    >
      <CardVideo
        v-for="v in videos"
        :key="v.id"
        class="cursor-pointer"
        :video="v"
      />
    </div>
    <div v-else class="text-[16px] mt-4 text-gray-500">No videos found</div>
  </div>
</template>

<script setup lang="ts">
import type { MovieDetails, Video } from '~/types';

const props = defineProps<{
  data: MovieDetails;
}>();

const videos = ref<Video[] | undefined>(
  props.data.videos?.results || undefined
);
</script>
