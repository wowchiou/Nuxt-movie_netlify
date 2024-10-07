<template>
  <!-- components/Card/Video -->
  <div class="group" @click="handleOpen">
    <div
      class="aspect-[16/9] p-[2px] bg-gray-700 sm:group-hover:ring-1 sm:group-hover:ring-primary sm:duration-75 relative"
    >
      <NuxtImg
        class="w-full h-full"
        :src="getExternalPic(`/vi/${video.key}/maxresdefault.jpg`, 'yt')"
        width="480"
        height="720"
        fit="fill"
        format="webp"
      />
      <NuxtIcon
        name="material-symbols:smart-display-rounded"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-gray-300 sm:group-hover:text-gray-100 duration-75"
      />
    </div>
    <div class="leading-tight mt-4">
      <p class="text-3xl line-clamp-2">{{ video.name }}</p>
      <p class="text-gray-400 mt-2">{{ video.type }}</p>
    </div>

    <ElDialog
      v-if="showVideo"
      v-model="showVideo"
      class="bg-transparent"
      :show-close="false"
      align-center
      fullscreen
      modal-class="reset-modal"
    >
      <DialogVideo :video="video" />
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import type { Video } from '~/types';

defineProps<{
  video: Video;
}>();

const showVideo = ref(false);

function handleOpen() {
  showVideo.value = !showVideo.value;
}
</script>
