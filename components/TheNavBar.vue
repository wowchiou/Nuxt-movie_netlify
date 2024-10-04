<template>
  <!-- TheNavBar -->
  <div
    class="flex md:flex-col justify-around md:justify-center items-center md:gap-y-[10vh] bg-gray-950 border-t-[1px] md:border-r-[1px] md:border-t-0 border-gray-600"
  >
    <NuxtLink
      v-for="nav in navList"
      v-slot="{ isActive }"
      :key="nav.name"
      :to="nav.path"
    >
      <NuxtIcon
        :name="nav.icon"
        class="text-3xl"
        :class="isActive ? 'text-primary' : ''"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { NavItem } from '~/types';

// data
const navList = ref<NavItem[]>([
  { name: '首頁', icon: 'material-symbols:house', path: '/' },
  { name: '電影', icon: 'material-symbols:movie-filter-sharp', path: '/movie' },
  { name: '電視', icon: 'material-symbols:tv-guide-sharp', path: '/tv' },
]);
</script>
