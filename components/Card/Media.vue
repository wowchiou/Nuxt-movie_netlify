<template>
  <!-- components/Card/Media -->
  <NuxtLinkLocale :to="path || ''" class="group">
    <div
      class="bg-gray-800 flex justify-center items-center sm:group-hover:ring-1 sm:group-hover:ring-primary sm:duration-75 p-[2px] aspect-[2/3]"
    >
      <NuxtImg
        v-if="media.poster_path"
        :src="getExternalPic(media.poster_path)"
        :alt="media.title || media.name"
        width="200"
        height="300"
        fit="cover"
        format="webp"
        loading="lazy"
        class="w-full h-full"
        :style="{ 'view-transition-name': `item-${media.id}` }"
      />
      <p v-else class="text-5xl">
        <NuxtIcon name="material-symbols:image-sharp" />
      </p>
    </div>
    <p class="text-3xl mt-4 line-clamp-1">
      {{ media.title || media.name }}
    </p>
    <slot />
    <div class="mt-2 flex items-center">
      <ImageBarStar
        class="w-[50%] sm:w-[40%] max-w-[100px]"
        :percent="setStars(media.vote_average)"
      />
      <p class="text-[1.7rem] ml-4 text-gray-400">
        {{ formatRate(media.vote_average / 2) }}
      </p>
    </div>
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
import type { SearchResult } from '~/types';

defineProps<{
  media: SearchResult;
  path?: string;
}>();
</script>
