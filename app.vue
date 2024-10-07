<template>
  <!-- app -->
  <NuxtLayout class="selection:bg-primary selection:text-gray-700">
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const i18n = useI18n();
const url = useRequestURL();
const baseUrl = url.origin;

useHead({
  htmlAttrs: { lang: i18n.locale },
  titleTemplate: (titleChunk: string | undefined) => {
    return titleChunk ? `${titleChunk} | Nuxt Movies` : 'Nuxt Movies';
  },
  meta: [
    {
      name: 'description',
      content: i18n.t('Web Description'),
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, user-scalable=no',
    },
    { name: 'google', content: 'notranslate' },
    { property: 'og:title', content: 'Nuxt Movie' },
    {
      property: 'og:description',
      content: i18n.t('Web Description'),
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
