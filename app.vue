<template>
  <!-- app -->
  <NuxtLayout class="selection:bg-primary selection:text-gray-700">
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const url = useRequestURL();
const baseUrl = url.origin;

useHead({
  htmlAttrs: { lang: 'zh-CN' },
  titleTemplate: (titleChunk: string | undefined) => {
    return titleChunk ? `${titleChunk} | Nuxt Movies` : 'Nuxt Movies';
  },
  meta: [
    {
      name: 'description',
      content:
        '探索最新電影資訊和影評！本網站利用 TMDB API 提供詳細的電影簡介、評分和評論，使用 Nuxt3 打造流暢的觀影體驗，讓您輕鬆發掘熱門電影與影集。',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, user-scalable=no',
    },
    { property: 'og:title', content: 'Nuxt Movie' },
    {
      property: 'og:description',
      content:
        '探索最新電影資訊和影評！本網站利用 TMDB API 提供詳細的電影簡介、評分和評論，使用 Nuxt3 打造流暢的觀影體驗，讓您輕鬆發掘熱門電影與影集。',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: baseUrl },
    { property: 'og:image', content: `${baseUrl}/social-card.png` },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/webp',
      href: '/movies-sm.webp',
    },
  ],
});
</script>

<style>
/* 過度效果css，根據nuxt.config.ts中的app.pageTransition配置 */
.test-enter-active,
.test-leave-active {
  transition: all 0.4s;
}
.test-enter-from,
.test-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}
.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
