<template>
  <div class="px-6 py-12">
    <h1 class="text-5xl flex items-end gap-4">
      <p>{{ person?.name }}</p>
    </h1>
    <p class="mt-4 text-gray-400 text-3xl flex items-baseline leading-none">
      <span>{{ person?.known_for_department || '--' }}</span>
      <template v-if="person?.place_of_birth">
        <span class="text-gray-100 mx-4 -mt-[2px]">|</span>
        <span>{{ person.place_of_birth }}</span>
      </template>
    </p>

    <div v-if="person?.external_ids" class="mt-6 flex items-center">
      <div
        class="aspect-square w-[20vw] sm:w-[9rem] max-w-[25rem] rounded-[50%] overflow-hidden bg-gray-700 p-[2px] mr-10 ring-[2px] ring-primary"
      >
        <NuxtImg
          v-if="person.profile_path"
          :src="getExternalPic(person.profile_path)"
          class="w-full h-full rounded-[50%]"
          width="300"
          height="300"
          fit="cover"
          format="webp"
        />
      </div>
      <div>
        <p class="text-3xl text-gray-400">
          <span>{{ person.birthday?.replace(/-/g, '.') || '--' }}</span>
          <template v-if="person.deathday">
            <span class="mx-2">~</span>
            <span>{{ person.deathday.replace(/-/g, '.') }}</span>
          </template>
        </p>
        <ExternalLinkMovie
          class="mt-4"
          :links="person.external_ids"
          type="name"
        />
      </div>
    </div>

    <div class="mt-14">
      <div class="leading-relaxed text-3xl">
        <pre v-if="person?.biography" class="whitespace-pre-line">
          {{ person.biography }}
        </pre>
        <p v-else class="text-gray-400">
          No introduction found. Switching to Simplified Chinese or English
          search may yield results.
        </p>
      </div>
    </div>

    <CardWrapper v-if="person?.images.profiles" class="mt-14">
      <CardPhoto
        v-for="img in person.images.profiles"
        :key="img.file_path"
        :pic="img.file_path"
        width="200"
        height="300"
        class="w-[40vw] sm:w-[25rem]"
      />
    </CardWrapper>

    <CardWrapper
      v-if="mostPopular(person?.combined_credits.cast || [], 'movie')?.length"
      class="mt-14"
    >
      <template #title>
        Movie {{ $t('Known for') }}{{ $t('Acting Credits') }}
      </template>
      <CardMedia
        v-for="itm in mostPopular(person?.combined_credits.cast || [], 'movie')"
        :key="itm.id"
        class="w-[40vw] sm:w-[25rem]"
        :media="itm"
        :path="`/${itm.media_type}/${itm.id}/overview`"
      >
        <p class="text-gray-400 mt-2">{{ itm.character }}</p>
      </CardMedia>
    </CardWrapper>

    <CardWrapper
      v-if="mostPopular(person?.combined_credits.crew || [], 'movie')?.length"
      class="mt-14"
    >
      <template #title>
        Movie {{ $t('Known for') }}{{ $t('Production Credits') }}
      </template>
      <CardMedia
        v-for="itm in mostPopular(person?.combined_credits.crew || [], 'movie')"
        :key="itm.id"
        class="w-[40vw] sm:w-[25rem]"
        :media="itm"
        :path="`/${itm.media_type}/${itm.id}/overview`"
      >
        <p class="text-gray-400 mt-2">{{ itm.job }}</p>
      </CardMedia>
    </CardWrapper>

    <CardWrapper
      v-if="mostPopular(person?.combined_credits.cast || [], 'tv')?.length"
      class="mt-14"
    >
      <template #title>
        Tv {{ $t('Known for') }}{{ $t('Acting Credits') }}
      </template>
      <CardMedia
        v-for="itm in mostPopular(person?.combined_credits.cast || [], 'tv')"
        :key="itm.id"
        class="w-[40vw] sm:w-[25rem]"
        :media="itm"
        :path="`/${itm.media_type}/${itm.id}/overview`"
      >
        <p class="text-gray-400 mt-2">{{ itm.character }}</p>
      </CardMedia>
    </CardWrapper>

    <CardWrapper
      v-if="mostPopular(person?.combined_credits.crew || [], 'tv')?.length"
      class="mt-14"
    >
      <template #title>
        Tv {{ $t('Known for') }}{{ $t('Production Credits') }}
      </template>
      <CardMedia
        v-for="itm in mostPopular(person?.combined_credits.crew || [], 'tv')"
        :key="itm.id"
        class="w-[40vw] sm:w-[25rem]"
        :media="itm"
        :path="`/${itm.media_type}/${itm.id}/overview`"
      >
        <p class="text-gray-400 mt-2">{{ itm.job }}</p>
      </CardMedia>
    </CardWrapper>
  </div>
</template>

<script setup lang="ts">
import type { SearchResult, PersonDetails, MediaType } from '~/types';

const route = useRoute();
const person = ref<PersonDetails | null>(null);

try {
  const [res] = await Promise.all([
    getPersonDetails(route.params.id as string),
  ]);
  person.value = res;
} catch (error) {
  console.log(error);
}

function mostPopular(list: SearchResult[], type: MediaType) {
  if (!list.length) return null;
  let r = list
    .filter(
      (c) =>
        c.poster_path &&
        c.vote_average &&
        c.media_type === type &&
        (c.character || c.job)
    )
    .sort((a, b) => b.popularity - a.popularity);
  // 篩選掉脫口秀
  if (type === 'tv') r = r.filter((c) => c.character?.indexOf('Self') === -1);
  // 篩選掉重複id的資料
  const ids = new Set();
  const dryData = [] as SearchResult[];
  r.forEach((c) => {
    if (ids.size > 0 && ids.has(c.id)) return;
    ids.add(c.id);
    dryData.push(c);
  });
  return dryData;
}

if (person.value) {
  useSeoMeta({
    title: person.value.name,
    description: person.value.biography,
    keywords: person.value.also_known_as.join(', '),
    ogTitle: person.value.name,
    ogDescription: person.value.biography,
    ogImage: getExternalPic(person.value.profile_path),
    ogUrl: useRequestURL().href,
  });
}
</script>
