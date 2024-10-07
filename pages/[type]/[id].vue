<template>
  <!-- pages/[type]/[id] -->
  <div class="relative pb-6">
    <div ref="hero">
      <MediaHero :media="media" />
    </div>

    <div
      class="sticky top-0 left-0 z-20 lg:relative flex justify-center items-center gap-[12vw] sm:gap-[10rem] backdrop-blur-md backdrop-brightness-50"
    >
      <NuxtLinkLocale
        v-for="itm in tabList"
        :key="`${type}-${id}-${itm.path}`"
        v-slot="{ isActive }"
        :to="`/${type}/${id}/${itm.path}`"
        class="relative z-10 text-4xl py-6 cursor-pointer"
      >
        <span :class="isActive ? 'text-primary' : ''">
          {{ $t(itm.title) }}
        </span>
      </NuxtLinkLocale>
    </div>
    <div class="pt-6">
      <NuxtPage
        :page-key="(route) => `${route.params.type}/${route.params.id}`"
        :data="media"
        @mounted="changePage"
      />
    </div>

    <!-- 演員 -->
    <CardWrapper v-if="media.credits?.cast.length" class="cast_cards mt-14">
      <template #title>
        {{ $t('Cast') }}
      </template>
      <div
        v-for="item in media.credits.cast"
        :key="item.id"
        class="w-[12rem] flex-shrink-0"
      >
        <CardCast :cast="item" />
      </div>
    </CardWrapper>

    <!-- 更多類似的 -->
    <CardWrapper class="mt-14">
      <template #title>
        {{ $t('More like this') }}
      </template>
      <NuxtLinkLocale
        v-for="item in recommended.results"
        :key="item.id"
        :to="`/${item.media_type}/${item.id}/overview`"
        class="w-[40%] sm:w-[25rem] flex-shrink-0"
      >
        <CardMedia :media="item" />
      </NuxtLinkLocale>
    </CardWrapper>
  </div>
</template>

<script setup lang="ts">
import type { MediaType } from '~/types';

definePageMeta({
  key: (route) => `${route.params.type}/${route.params.id}`,
  middleware: 'movie-or-tv',
});

const route = useRoute();
const hero = ref<HTMLDivElement | null>(null);
const isFirstLoad = ref(true);
const type = computed(() => (route.params.type as MediaType) || 'movie');
const id = computed(() => route.params.id as string);

const tabList = [
  { title: 'Overview', path: 'overview' },
  { title: 'Videos', path: 'videos' },
  { title: 'Media Photos', path: 'photos' },
];

const [media, recommended] = await Promise.all([
  getTMDBMedia(type.value, Number(id.value)),
  getTMDBRecommendations(type.value, Number(id.value)),
]);

function changePage() {
  if (!hero.value || isFirstLoad.value) {
    isFirstLoad.value = false;
    return;
  }
  const heroHeight = hero.value.offsetHeight;
  window.scrollTo({ top: heroHeight, behavior: 'smooth' });
}

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
