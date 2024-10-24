<template>
  <!-- TheNavBar -->
  <nav
    class="flex md:flex-col justify-around md:justify-center items-center md:gap-y-[10vh] bg-gray-950 border-t-[1px] md:border-r-[1px] md:border-t-0 border-gray-600"
  >
    <NuxtLinkLocale v-for="nav in navList" :key="nav.name" :to="nav.path">
      <NuxtIcon
        :name="nav.icon"
        class="text-5xl"
        :class="isActiveRoute(nav) && 'text-primary'"
      />
    </NuxtLinkLocale>
  </nav>
</template>

<script setup lang="ts">
import type { NavItem } from '~/types';

const route = useRoute();
const { locale } = useI18n();
const navList = ref<NavItem[]>(NAV_LIST);

// 設定當前路由是否為活動路由
const isActiveRoute = computed(() => {
  return (nav: NavItem) => {
    // 如網頁為繁體中文,網頁不會有zh-TW路徑
    if (locale.value === 'zh-TW') {
      if (nav.path === '/') return route.path === nav.path;
      return route.path.startsWith(nav.path);
    }
    // 如網頁為其他語言,網頁會有語言路徑
    if (nav.path === '/') return route.path === `/${locale.value}`;
    return route.path.startsWith(`/${locale.value}${nav.path}`);
  };
});
</script>
