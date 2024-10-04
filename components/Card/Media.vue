<template>
  <!-- components/Card/Media -->
  <div class="group">
    <div
      class="aspect-[2/3] bg-gray-800 flex justify-center items-center sm:group-hover:ring-1 sm:group-hover:ring-primary sm:duration-75 p-[2px]"
    >
      <NuxtImg
        v-if="media.poster_path"
        :src="getExternalPic(media.poster_path)"
        :alt="media.title || media.name"
        width="400"
        height="600"
        fit="cover"
        format="webp"
        loading="lazy"
        class="w-full h-full"
        :style="{ 'view-transition-name': `item-${media.id}` }"
      />
      <p v-else class="text-3xl">
        <NuxtIcon name="material-symbols:image-sharp" />
      </p>
    </div>
    <p class="text-[16px] mt-1 line-clamp-1">
      {{ media.title || media.name }}
    </p>
    <div class="mt-1 flex items-center">
      <ImageBarStar
        class="w-[50%] sm:w-[40%] max-w-[100px]"
        :percent="setStars(media.vote_average)"
      />
      <p class="text-sm ml-2 text-gray-400 leading-none">
        {{ formatRate(media.vote_average / 2) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SearchResult } from '~/types';

defineProps<{
  media: SearchResult;
}>();
</script>
