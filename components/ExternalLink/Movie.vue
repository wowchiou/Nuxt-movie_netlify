<template>
  <div class="text-[2.4rem] flex gap-8 leading-none group">
    <template v-for="link in linksArray" :key="`external-${link.name}`">
      <NuxtLink
        v-if="getExternal(link.name) && link.value"
        :to="`${getExternal(link.name)?.url}${link.value}`"
        target="_blank"
        class="sm:text-gray-400 sm:hover:text-gray-100"
      >
        <NuxtIcon :name="getExternal(link.name)?.icon || ''" />
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ExternalIds } from '~/types';

const props = defineProps<{
  links: ExternalIds;
  type: 'name' | 'title';
}>();

const linksArray = Object.keys(props.links).map((key: string) => ({
  name: key,
  value: props.links[key],
}));

function getExternal(link: string) {
  const res = EXTERNAL_LiNKS.find((e) => e.name === link);
  const copyRes = res ? { ...res } : null;
  if (copyRes && link === 'imdb_id') {
    const imdbUrl = `${copyRes.url}${props.type}/`;
    copyRes.url = imdbUrl;
  }
  return copyRes;
}
</script>
