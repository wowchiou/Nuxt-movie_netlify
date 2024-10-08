<template>
  <!-- components/Card/Photo -->
  <div class="bg-gray-800" :class="`aspect-[${width}/${height}]`">
    <NuxtImg
      :src="getExternalPic(data.file_path)"
      :width="width"
      :height="height"
      loading="lazy"
      fit="cover"
      format="webp"
      class="w-full h-full"
    />
  </div>
</template>

<script setup lang="ts">
import type { Image } from '~/types';

withDefaults(
  defineProps<{
    data: Image;
    width: string;
    height: string;
  }>(),
  {
    width: '200',
    height: '300',
  }
);
</script>
