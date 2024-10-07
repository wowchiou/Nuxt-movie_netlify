<template>
  <!-- pages/[type]/[id]/photos -->
  <div class="px-6">
    <!-- 背景 -->
    <h2 class="flex items-end">
      <p class="text-4xl">
        {{ $t('Backdrops') }}
      </p>
      <p class="ml-4 text-gray-400">
        {{
          $t('{numberOfImages} Images', {
            numberOfImages: data?.images?.backdrops.length || 0,
          })
        }}
      </p>
    </h2>
    <div class="mt-6">
      <div
        v-if="data?.images?.backdrops?.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <div
          v-for="(pic, idx) in data.images.backdrops"
          :key="`backdrop-${idx}`"
        >
          <CardPhoto :data="pic" width="400" height="250" />
        </div>
      </div>
      <div v-else class="text-3xl text-gray-400">
        No Backdrop Photos Result.
      </div>
    </div>

    <!-- 海報 -->
    <h2 class="flex items-end mt-14">
      <p class="text-4xl">
        {{ $t('Posters') }}
      </p>
      <p class="ml-4 text-gray-400">
        {{
          $t('{numberOfImages} Images', {
            numberOfImages: data?.images?.posters?.length || 0,
          })
        }}
      </p>
    </h2>
    <div class="mt-6">
      <div
        v-if="data?.images?.posters?.length"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
      >
        <div v-for="(pic, idx) in data.images.posters" :key="`poster-${idx}`">
          <CardPhoto :data="pic" width="250" height="400" />
        </div>
      </div>
      <div v-else class="text-gray-400 text-3xl">No Poster Photos Result.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MovieDetails } from '~/types';

defineProps<{
  data: MovieDetails;
}>();
</script>
