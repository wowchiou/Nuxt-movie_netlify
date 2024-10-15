<template>
  <div class="px-6 py-12">
    <h1 class="text-5xl flex items-end gap-4">
      <p>{{ person?.name }}</p>
      <span class="text-3xl text-gray-400">{{ person?.birthday }}</span>
    </h1>

    <div v-if="person?.external_ids" class="mt-6">
      <ExternalLinkMovie :links="person.external_ids" />
    </div>

    <div v-if="person?.biography" class="max-w-[160rem] mt-14 clearfix">
      <div
        class="aspect-square w-[30vw] sm:w-[25rem] max-w-[25rem] rounded-[50%] overflow-hidden bg-gray-700 ml-6 mb-6 float-right p-[2px] ring-[2px] ring-primary"
      >
        <NuxtImg
          v-if="person?.profile_path"
          :src="getExternalPic(person.profile_path)"
          class="w-full h-full rounded-[50%]"
          width="300"
          height="300"
          fit="cover"
          format="webp"
        />
      </div>
      <div class="leading-snug text-3xl">
        <pre class="whitespace-pre-line">
          {{ person.biography }}
        </pre>
      </div>
    </div>

    <CardWrapper v-if="person?.images.profiles" class="mt-14">
      <div
        v-for="img in person.images.profiles"
        :key="img.file_path"
        class="aspect-[2/3] bg-gray-700"
      >
        <NuxtImg
          :src="getExternalPic(img.file_path)"
          width="200"
          hight="300"
          class="w-[40vw] sm:w-[25rem]"
          fit="cover"
          format="webp"
          lazy
        />
      </div>
    </CardWrapper>

    <CardWrapper
      v-if="mostPopular(person?.combined_credits.cast || [], 'movie')?.length"
      class="mt-14"
    >
      <template #title>
        Movie {{ $t('Known for') }}{{ $t('Credits') }}
        <span class="text-3xl text-gray-400">Cast</span>
      </template>
      <CardMedia
        v-for="itm in mostPopular(person?.combined_credits.cast || [], 'movie')"
        :key="itm.id"
        class="w-[40vw] sm:w-[25rem]"
        :media="itm"
        :path="`/${itm.media_type}/${itm.id}/overview`"
      />
    </CardWrapper>

    <CardWrapper
      v-if="mostPopular(person?.combined_credits.crew || [], 'movie')?.length"
      class="mt-14"
    >
      <template #title>
        Movie {{ $t('Known for') }}{{ $t('Credits') }}
        <span class="text-3xl text-gray-400">Crew</span>
      </template>
      <CardMedia
        v-for="itm in mostPopular(person?.combined_credits.crew || [], 'movie')"
        :key="itm.id"
        class="w-[40vw] sm:w-[25rem]"
        :media="itm"
        :path="`/${itm.media_type}/${itm.id}/overview`"
      />
    </CardWrapper>

    <CardWrapper
      v-if="mostPopular(person?.combined_credits.cast || [], 'tv')?.length"
      class="mt-14"
    >
      <template #title>
        Tv {{ $t('Known for') }}{{ $t('Credits') }}
        <span class="text-3xl text-gray-400">Cast</span>
      </template>
      <CardMedia
        v-for="itm in mostPopular(person?.combined_credits.cast || [], 'tv')"
        :key="itm.id"
        class="w-[40vw] sm:w-[25rem]"
        :media="itm"
        :path="`/${itm.media_type}/${itm.id}/overview`"
      />
    </CardWrapper>

    <CardWrapper
      v-if="mostPopular(person?.combined_credits.crew || [], 'tv')?.length"
      class="mt-14"
    >
      <template #title>
        Tv {{ $t('Known for') }}{{ $t('Credits') }}
        <span class="text-3xl text-gray-400">Crew</span></template
      >
      <CardMedia
        v-for="itm in mostPopular(person?.combined_credits.crew || [], 'tv')"
        :key="itm.id"
        class="w-[40vw] sm:w-[25rem]"
        :media="itm"
        :path="`/${itm.media_type}/${itm.id}/overview`"
      />
    </CardWrapper>
  </div>
</template>

<script setup lang="ts">
import type { SearchResult, PersonDetails, MediaType } from '~/types';

const route = useRoute();
const person = ref<PersonDetails | null>(null);

const [res] = await Promise.all([getPersonDetails(route.params.id as string)]);
person.value = res;

function mostPopular(list: SearchResult[], type: MediaType) {
  if (!list.length) return null;
  const r = list
    .filter((c) => c.poster_path && c.vote_average && c.media_type === type)
    .sort((a, b) => b.popularity - a.popularity);
  // 篩選掉重複id的資料
  const ids = new Set();
  const dryData = [] as SearchResult[];
  r.forEach((c) => {
    if (ids.size >= 30) return;
    if (ids.size > 0 && ids.has(c.id)) return;
    ids.add(c.id);
    dryData.push(c);
  });
  return dryData.slice(0, 30);
}

useSeoMeta({
  title: res.name,
  description: res.biography,
  keywords: res.also_known_as.join(', '),
  ogTitle: res.name,
  ogDescription: res.biography,
  ogImage: getExternalPic(res.profile_path),
  ogUrl: useRequestURL().href,
});
</script>
