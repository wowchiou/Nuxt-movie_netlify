<template>
  <div class="px-3 sm:px-6 pb-4 max-w-[1920px] m-auto flex items-start gap-6">
    <div class="aspect-[2/3] hidden md:block md:w-[350px] p-[2px] bg-gray-800">
      <NuxtImg
        class="w-full h-full"
        :src="getExternalPic(data.poster_path)"
        width="400"
        height="600"
        fit="cover"
        format="webp"
      />
    </div>
    <div class="flex-1">
      <h2 class="text-[18px] sm:text-[22px]">{{ $t('Storyline') }}</h2>
      <p class="text-[16px] mt-4 leading-relaxed">{{ data.overview }}</p>
      <div
        class="mt-6 text-gray-400 text-[14px] sm:text-[16px] grid grid-cols-[max-content_1fr] lg:grid-cols-[max-content_1fr_max-content_1fr] gap-4 max-w-[800px]"
      >
        <!-- 上映日期 -->
        <template v-if="data.release_date">
          <div class="flex items-baseline">{{ $t('Release Date') }}</div>
          <div class="flex items-baseline">{{ data.release_date }}</div>
        </template>
        <!-- 片长 -->
        <template v-if="data.runtime">
          <div class="flex items-baseline">{{ $t('Runtime') }}</div>
          <div class="flex items-baseline">
            {{ formatRunTime(data.runtime) }}
          </div>
        </template>
        <!-- 导演 -->
        <template v-if="directors?.length">
          <div class="flex items-baseline">{{ $t('Director') }}</div>
          <div class="flex items-baseline gap-2">
            <NuxtLinkLocale
              v-for="d in directors"
              :key="d.id"
              class="text-[12px] px-2 py-1 bg-gray-800 rounded"
            >
              {{ d.name }}
            </NuxtLinkLocale>
          </div>
        </template>
        <!-- 成本 -->
        <template v-if="data.budget">
          <div class="flex items-baseline">{{ $t('Budget') }}</div>
          <div class="flex items-baseline">
            $ {{ formatMoney(data.budget) }}
          </div>
        </template>
        <!-- 票房 -->
        <template v-if="data.revenue">
          <div class="flex items-baseline">{{ $t('Revenue') }}</div>
          <div class="flex items-baseline">
            $ {{ formatMoney(data.revenue) }}
          </div>
        </template>
        <!-- 类型 -->
        <template v-if="data?.genres?.length && type">
          <div class="flex items-baseline">{{ $t('Genre') }}</div>
          <div class="flex items-baseline flex-wrap gap-2">
            <NuxtLinkLocale
              v-for="genre of data.genres"
              :key="genre.id"
              class="text-[12px] px-2 py-1 bg-gray-800 rounded"
            >
              {{ genre.name }}
            </NuxtLinkLocale>
          </div>
        </template>
        <!-- 状态 -->
        <template v-if="data.status">
          <div class="flex items-baseline">{{ $t('Status') }}</div>
          <div class="flex items-baseline">{{ data.status }}</div>
        </template>
        <!-- 語言 -->
        <template v-if="data.original_language">
          <div>{{ $t('Language') }}</div>
          <div>{{ getLanguage(data.original_language) }}</div>
        </template>
        <!-- 制片 -->
        <template v-if="data?.production_companies?.length">
          <div>{{ $t('Production') }}</div>
          <div>
            {{ data.production_companies.map((i) => i.name).join(', ') }}
          </div>
        </template>
      </div>
      <ExternalLinkMovie class="mt-4" :links="links" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MovieDetails } from '~/types';

const props = defineProps<{
  data: MovieDetails;
}>();

const route = useRoute();

// computed
const directors = computed(() =>
  props.data.credits?.crew.filter((person) => person.job === 'Director')
);
const type = computed(() => route.params.type || '');
const links = computed(() => ({
  ...props.data.external_ids,
  homepage: props.data.homepage,
}));
</script>
