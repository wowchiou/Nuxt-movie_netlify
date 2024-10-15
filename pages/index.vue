<template>
  <!-- pages/index -->
  <div class="relative h-[calc(100lvh-60px)] md:h-lvh w-full overflow-hidden">
    <div
      class="grid grid-cols-2 md:grid-cols-3 h-full blur-[8px] after:contents-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gray-950 after:opacity-70"
    >
      <div
        v-for="(movie, idx) in popularMovies"
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
const localePath = useLocalePath();
const search = ref('');

// 獲取熱門電影圖當背景
const res = await getTMDBMediaWithQuery('movie', QUERY_LIST.movie[0].query);
const moviesListIdx = getRandomMovies(3, res.results.length);
const popularMovies = res.results.filter((_, idx) =>
  moviesListIdx.includes(idx)
);

function handleSearch() {
  if (!search.value) return;
  const localeRoute = localePath({
    path: '/search',
    query: { key: search.value },
  });
  if (!localeRoute) return;
  navigateTo(localeRoute);
}

function getRandomMovies(count: number, length: number) {
  const movies = [] as number[];
  while (movies.length < count) {
    const index = ~~(Math.random() * length);
    if (movies.includes(index)) continue;
    movies.push(index);
  }
  return movies;
}
</script>
