<template>
  <!-- components/Card/Photo -->
  <div :class="`aspect-[${data.aspect_ratio}]`" class="bg-gray-800">
    <NuxtImg
      :src="getExternalPic(data.file_path)"
      :width="data.width"
      :height="data.height"
      loading="lazy"
      fit="cover"
      format="webp"
      class="w-full h-full"
    />
  </div>
</template>

<script setup lang="ts">
import type { Image } from '~/types';

defineProps<{
  data: Image;
}>();
</script>
