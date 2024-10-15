import { LRUCache } from 'lru-cache';
import { hash as ohash } from 'ohash';
import type {
  FetchParams,
  MovieDetails,
  PageResult,
  PersonDetails,
  SearchResult,
} from '~/types';

// const isDev = process.env.NODE_ENV === 'development';

export const _fetchTMDB = async (url: string, params: FetchParams) => {
  if (!params.language) {
    const locale = useNuxtApp().$i18n.locale;
    params.language = unref(locale);
  }
  return await $fetch(url, {
    baseURL: '/api/tmdb/',
    params,
  });
};

const cache = new LRUCache({
  max: 500,
  ttl: 2000 * 60 * 60,
});

export const fetchTMDB = async <T>(
  url: string,
  params: FetchParams
): Promise<T> => {
  // 使用useState和cache来缓存请求结果
  const hash = ohash([url, params]);
  const state = useState<T | null>(hash, () => null);
  if (state.value) return state.value;
  if (!cache.has(hash)) {
    cache.set(
      hash,
      (async () => {
        try {
          const res = await _fetchTMDB(url, params);
          state.value = res as T;
          return res;
        } catch (error) {
          cache.delete(hash);
          throw error;
        }
      })()
    );
  }
  return cache.get(hash) as T;
};

export const searchTMDB = async (query: string, page = 1) => {
  const res = await fetchTMDB<PageResult<SearchResult[]>>('search/multi', {
    query,
    page,
    include_adult: false,
  });
  res.results = filterBlocked(res.results);
  return res;
};

export const getTMDBMedia = async (type: string, id: number) => {
  return fetchTMDB<MovieDetails>(`${type}/${id}`, {
    append_to_response:
      'videos,credits,images,external_ids,release_dates,combined_credits',
    include_image_language: 'en',
  });
};

export const getTMDBRecommendations = async (
  type: string,
  id: number,
  page = 1
) => {
  const res = await fetchTMDB<PageResult<SearchResult[]>>(
    `${type}/${id}/recommendations`,
    { page }
  );
  res.results = filterBlocked(res.results);
  return res;
};

export const getTMDBMediaWithQuery = async (
  type: string,
  query: string,
  page = 1
) => {
  const res = await fetchTMDB<PageResult<SearchResult[]>>(`${type}/${query}`, {
    page,
  });
  res.results = filterBlocked(res.results);
  return res;
};

export const getPersonDetails = async (id: string) => {
  return fetchTMDB<PersonDetails>(`person/${id}`, {
    append_to_response: 'combined_credits,images,external_ids',
  });
};
