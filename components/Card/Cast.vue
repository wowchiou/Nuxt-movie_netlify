<template>
  <NuxtLinkLocale :to="path" class="group">
    <div
      class="aspect-[1/1] rounded-[50%] overflow-hidden bg-gray-700 p-[2px] sm:group-hover:ring-1 sm:group-hover:ring-primary sm:duration-75"
    >
      <NuxtImg
        v-if="cast.profile_path"
        class="w-full h-full rounded-[50%]"
        :src="getExternalPic(cast.profile_path)"
        width="200"
        height="200"
        fit="cover"
        format="webp"
      />
      <p v-else class="text-3xl w-full h-full flex justify-center items-center">
        <NuxtIcon
          class="text-gray-400 text-6xl"
          name="material-symbols:person"
        />
      </p>
    </div>
    <p class="mt-4 line-clamp-1">{{ cast.name }}</p>
    <p class="text-gray-400 mt-2 line-clamp-1">
      {{ cast.character || cast.known_for_department }}
    </p>
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
import type { Cast } from '~/types';

withDefaults(
  defineProps<{
    cast: Cast;
    path: string;
  }>(),
  { path: '' }
);
</script>
