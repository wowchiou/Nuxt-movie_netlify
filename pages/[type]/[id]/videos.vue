<template>
  <!-- pages/[type]/[id]/videos -->
  <div class="px-6">
    <div class="text-4xl">
      {{
        $t('{numberOfVideos} Videos', {
          numberOfVideos: videos?.length || 0,
        })
      }}
    </div>
    <div
      v-if="videos && videos.length"
      class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6"
    >
      <CardVideo
        v-for="v in videos"
        :key="v.id"
        class="cursor-pointer"
        :video="v"
      />
    </div>
    <div v-else class="text-3xl mt-4 text-gray-400">No videos found</div>
  </div>
</template>

<script setup lang="ts">
import type { MovieDetails, Video } from '~/types';

const props = defineProps<{
  data: MovieDetails;
}>();

const emit = defineEmits<{
  (e: 'mounted'): void;
}>();

const videos = ref<Video[] | undefined>(
  props.data.videos?.results || undefined
);

onMounted(() => {
  emit('mounted');
});

useSeoMeta({
  ogUrl: useRequestURL().href,
});
</script>
