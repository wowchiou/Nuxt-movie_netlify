<template>
  <!-- pages/index -->
  <div class="relative h-[calc(100lvh-60px)] md:h-lvh w-full overflow-hidden">
    <div
      class="grid grid-cols-2 md:grid-cols-3 h-full blur-[8px] after:contents-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gray-950 after:opacity-70"
    >
      <!-- 背景 -->
      <div
        v-for="(movie, idx) in movies"
        :key="movie.id"
        class="h-full w-full aspect-[2/3]"
        :class="idx > 1 && 'hidden md:block'"
      >
        <NuxtImg
          :src="getExternalPic(movie.poster_path)"
          width="400"
          height="600"
          fit="cover"
          format="webp"
          class="h-full w-full object-cover"
          preload
        />
      </div>
    </div>

    <!-- 搜尋欄 -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 w-[90vw] md:w-[50vw]"
    >
      <div class="flex items-center gap-6">
        <div class="w-[5rem]">
          <NuxtImg class="w-full" width="60" src="/img/movies.webp" />
        </div>
        <ElInput
          v-model="search"
          class="!w-full"
          :placeholder="$t('Type something to search...')"
          size="large"
          @change="handleSearch"
        />
        <div>
          <NuxtIcon
            class="text-6xl cursor-pointer"
            name="material-symbols:search-rounded"
            @click="handleSearch"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SearchResult } from '~/types';

const localePath = useLocalePath();
const search = ref('');

// 獲取熱門電影資料
const res = await getTMDBMediaWithQuery('movie', QUERY_LIST.movie[0].query);
// 隨機取 3 部電影
const movies = getRandomMovies(res.results, 3);

function handleSearch() {
  if (!search.value) return;
  // 跳轉至搜尋頁
  const localeRoute = localePath({
    path: '/search',
    query: { key: search.value },
  });
  if (!localeRoute) return;
  navigateTo(localeRoute);
}

function getRandomMovies(moviesResults: SearchResult[], count: number) {
  if (!moviesResults) return;
  const movies = [] as number[];
  // 隨機取 count 部電影 id
  while (movies.length < count) {
    const index = ~~(Math.random() * moviesResults.length);
    if (movies.includes(index)) continue;
    movies.push(index);
  }
  // 回傳電影資料
  return moviesResults.filter((_, idx) => movies.includes(idx));
}
</script>
