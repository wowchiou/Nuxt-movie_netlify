<template>
  <!-- pages/[type]/[id] -->
  <div>
    <MediaHero :media="media" />

    <Tabs :data="tabList">
      <template #default="{ active }">
        <DetailOverview
          v-if="active.title === tabList[0].title"
          :data="media"
        />
        <DetailVideos
          v-if="active.title === tabList[1].title"
          :data="media.videos?.results"
        />
        <DetailPhotos v-if="active.title === tabList[2].title" :data="media" />
      </template>
    </Tabs>

    <!-- 演員 -->
    <CardWrapper v-if="media.credits?.cast.length" class="cast_cards mt-8">
      <template #title>
        {{ $t('Cast') }}
      </template>
      <div
        v-for="item in media.credits.cast"
        :key="item.id"
        class="w-[120px] flex-shrink-0"
      >
        <CardCast :cast="item" />
      </div>
    </CardWrapper>

    <!-- 更多類似的 -->
    <CardWrapper class="mt-8">
      <template #title>
        {{ $t('More like this') }}
      </template>
      <NuxtLink
        v-for="item in recommended.results"
        :key="item.id"
        :to="`/${item.media_type}/${item.id}`"
        class="w-[40%] sm:w-[250px] flex-shrink-0"
      >
        <CardMedia :media="item" />
      </NuxtLink>
    </CardWrapper>
  </div>
</template>

<script setup lang="ts">
import type { MediaType } from '~/types';

definePageMeta({
  key: (route) => route.fullPath,
  middleware: 'movie-or-tv',
});

const route = useRoute();
const tabList = [
  { title: 'Overview' },
  { title: 'Videos' },
  { title: 'Media Photos' },
];

// computed
const type = computed(() => (route.params.type as MediaType) || 'movie');
const id = computed(() => route.params.id as string);

// created
const [media, recommended] = await Promise.all([
  getTMDBMedia(type.value, Number(id.value)),
  getTMDBRecommendations(type.value, Number(id.value)),
]);

useHead({
  title: media.name || media.title,
  meta: [
    { name: 'description', content: media.overview },
    {
      property: 'og:title',
      content: `${media.name || media.title} | Nuxt Movies`,
    },
    {
      property: 'og:description',
      content: media.overview,
    },
    {
      property: 'og:image',
      content: getExternalPic(media.poster_path),
    },
  ],
});
</script>

<style scoped>
.cast_cards {
  :deep(.card-wrapper-div) {
    @apply !gap-6;
  }
}
</style>
