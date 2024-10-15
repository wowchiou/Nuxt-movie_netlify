<template>
  <!-- pages/[type]/[id]/overview -->
  <div v-if="data" class="px-6 max-w-[1600px] m-auto flex items-start gap-8">
    <div
      class="aspect-[2/3] hidden md:block w-[25rem] lg:w-[35rem] p-[2px] bg-gray-800"
    >
      <NuxtImg
        class="w-full h-full"
        :src="getExternalPic(data.poster_path)"
        width="200"
        height="300"
        fit="cover"
        format="webp"
      />
    </div>
    <div class="flex-1">
      <h2 class="text-4xl">{{ $t('Storyline') }}</h2>
      <div class="text-3xl mt-4 leading-relaxed">
        <p v-if="data.overview">{{ data.overview }}</p>
        <p v-else class="text-gray-400">No data found.</p>
      </div>
      <div
        class="mt-8 text-[1.7rem] md:text-[1.6rem] text-gray-400 grid grid-cols-[max-content_1fr] lg:grid-cols-[max-content_1fr_max-content_1fr] gap-4 max-w-[800px] leading-tight"
      >
        <!-- 上映日期 -->
        <template v-if="data.release_date">
          <div class="flex items-baseline py-1">{{ $t('Release Date') }}</div>
          <div class="flex items-baseline py-1">{{ data.release_date }}</div>
        </template>
        <!-- 片长 -->
        <template v-if="data.runtime">
          <div class="flex items-baseline py-1">{{ $t('Runtime') }}</div>
          <div class="flex items-baseline py-1">
            {{ formatRunTime(data.runtime) }}
          </div>
        </template>
        <!-- 导演 -->
        <template v-if="directors?.length">
          <div class="flex items-baseline py-1">{{ $t('Director') }}</div>
          <div class="flex items-baseline gap-4">
            <NuxtLinkLocale
              v-for="d in directors"
              :key="d.id"
              class="text-[1.4rem] px-2 py-1 bg-gray-800 rounded"
            >
              {{ d.name }}
            </NuxtLinkLocale>
          </div>
        </template>
        <!-- 成本 -->
        <template v-if="data.budget">
          <div class="flex items-baseline py-1">{{ $t('Budget') }}</div>
          <div class="flex items-baseline py-1">
            $ {{ formatMoney(data.budget) }}
          </div>
        </template>
        <!-- 票房 -->
        <template v-if="data.revenue">
          <div class="flex items-baseline py-1">{{ $t('Revenue') }}</div>
          <div class="flex items-baseline py-1">
            $ {{ formatMoney(data.revenue) }}
          </div>
        </template>
        <!-- 类型 -->
        <template v-if="data?.genres?.length && type">
          <div class="flex items-baseline py-1">{{ $t('Genre') }}</div>
          <div class="flex items-baseline flex-wrap gap-4">
            <NuxtLinkLocale
              v-for="genre of data.genres"
              :key="genre.id"
              class="text-[1.4rem] px-2 py-1 bg-gray-800 rounded"
            >
              {{ genre.name }}
            </NuxtLinkLocale>
          </div>
        </template>
        <!-- 状态 -->
        <template v-if="data.status">
          <div class="flex items-baseline py-1">{{ $t('Status') }}</div>
          <div class="flex items-baseline py-1">{{ data.status }}</div>
        </template>
        <!-- 語言 -->
        <template v-if="data.original_language">
          <div class="flex items-baseline py-1">{{ $t('Language') }}</div>
          <div class="flex items-baseline py-1">
            {{ getLanguage(data.original_language) }}
          </div>
        </template>
        <!-- 制片 -->
        <template v-if="data?.production_companies?.length">
          <div class="flex items-baseline py-1">{{ $t('Production') }}</div>
          <div class="flex items-baseline py-1">
            {{ data.production_companies.map((i) => i.name).join(', ') }}
          </div>
        </template>
      </div>
      <ExternalLinkMovie class="mt-8" :links="links" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MovieDetails } from '~/types';

const props = defineProps<{
  data: MovieDetails;
}>();

const emit = defineEmits<{
  (e: 'mounted'): void;
}>();

const route = useRoute();
const type = computed(() => route.params.type || '');

const directors = computed(() =>
  props.data.credits?.crew.filter((person) => person.job === 'Director')
);

const links = computed(() => ({
  ...props.data.external_ids,
  homepage: props.data.homepage,
}));

onMounted(() => {
  emit('mounted');
});
</script>
