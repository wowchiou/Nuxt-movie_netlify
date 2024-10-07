<template>
  <!-- components/Media/Hero -->
  <div class="relative flex justify-end w-full">
    <div
      class="absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-t lg:bg-gradient-to-r from-gray-950 from-20% lg:from-40%"
    />
    <div
      class="absolute top-1/2 left-0 px-4 sm:px-6 lg:px-0 lg:left-10 lg:-translate-y-1/2 z-20 w-full lg:w-[50%] max-h-[100%]"
    >
      <h1 class="text-2xl sm:text-3xl lg:text-4xl">
        {{ media.name || media.title }}
      </h1>
      <div class="flex items-center gap-2 text-gray-400 text-md mt-2">
        <ImageBarStar
          class="w-[80px] sm:w-[120px]"
          :percent="setStars(media.vote_average)"
        />
        <p class="mt-[2px]">
          {{ formatRate(media.vote_average / 2) }}
        </p>
        <p class="mt-[2px]">
          {{
            $t('{numberOfReviews} Reviews', {
              numberOfReviews: media.vote_count,
            })
          }}
        </p>
        <p v-if="media.release_date" class="hidden sm:block">
          {{ media.release_date }}
        </p>
        <p v-if="media.runtime" class="hidden sm:block">
          {{ formatRunTime(media.runtime) }}
        </p>
      </div>
    </div>
    <div class="aspect-[1220/659] w-full lg:w-[60%]">
      <NuxtImg
        class="w-full h-full"
        :src="getExternalPic(media.backdrop_path)"
        width="1220"
        height="659"
        fit="cover"
        format="webp"
        :style="{ 'view-transition-name': `item-${media.id}` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MovieDetails } from '~/types';

defineProps<{
  media: MovieDetails;
}>();
</script>
