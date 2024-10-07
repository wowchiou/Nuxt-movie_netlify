<template>
  <div class="group">
    <div class="aspect-[1/1] rounded-[50%] overflow-hidden bg-gray-700">
      <NuxtImg
        v-if="cast.profile_path"
        class="w-full h-full"
        :src="getExternalPic(cast.profile_path)"
        width="500"
        height="500"
        fit="cover"
        format="webp"
      />
      <p v-else class="text-3xl w-full h-full flex justify-center items-center">
        <NuxtIcon
          class="text-gray-400 text-4xl"
          name="material-symbols:person"
        />
      </p>
    </div>
    <p class="mt-2 line-clamp-1">{{ cast.name }}</p>
    <p class="text-gray-400 mt-2 line-clamp-1">
      {{ cast.character || cast.known_for_department }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Cast } from '~/types';

defineProps<{
  cast: Cast;
}>();
</script>
