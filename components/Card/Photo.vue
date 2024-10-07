<template>
  <!-- components/Card/Photo -->
  <div :class="`aspect-[${data.aspect_ratio * 100}/100]`" class="bg-gray-800">
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
    width: '400',
    height: '600',
  }
);
</script>
