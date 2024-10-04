<template>
  <!-- components/Dialog/Video -->
  <div class="flex justify-center items-center h-screen">
    <div class="w-full">
      <iframe
        v-if="video.key"
        ref="el"
        allow="autoplay; encrypted-media"
        allowfullscreen
        :src="getVideoLink(video.key)"
        class="w-full lg:w-[70vw] aspect-[16/9] m-auto"
      />
      <div v-else class="text-md sm:text-2xl text-gray-300 text-center">
        Sorry, something went wrong.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Video } from '~/types';

defineProps<{
  video: Video;
}>();
</script>
