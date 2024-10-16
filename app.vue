<template>
  <!-- app -->
  <NuxtLayout class="selection:bg-primary selection:text-gray-700">
    <NuxtLoadingIndicator />
    <NuxtPage />
    <GlobalLoading :loading="loading" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const i18n = useI18n();
const url = useRequestURL();
const nuxtApp = useNuxtApp();
const loading = ref(false);
const baseUrl = url.origin;

nuxtApp.hook('page:start', () => {
  loading.value = true;
});

nuxtApp.hook('page:finish', () => {
  loading.value = false;
});

useHead({
  htmlAttrs: { lang: i18n.locale },
  titleTemplate: (titleChunk: string | undefined) => {
    return titleChunk ? `${titleChunk} | Nuxt Movies` : 'Nuxt Movies';
  },
  link: [
    {
      rel: 'icon',
      type: 'image/webp',
      href: '/movies-sm.webp',
    },
  ],
});

useSeoMeta({
  description: i18n.t('Web Description'),
  viewport: 'width=device-width, initial-scale=1, user-scalable=no',
  // @ts-expect-error: 'google' is not a standard property, but we need it for website
  google: 'notranslate',
  ogTitle: 'Nuxt Movie',
  ogDescription: i18n.t('Web Description'),
  ogType: 'website',
  ogUrl: baseUrl,
  ogImage: `${baseUrl}/social-card.png`,
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
