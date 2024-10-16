import type { DefineComponent } from 'vue';

export type FetchParams = Record<string, string | number | boolean | undefined>;

export type MediaType = 'movie' | 'tv';

export interface NavItem {
  name: string;
  path: string;
  icon: string;
  active: boolean;
  type: string;
}

export interface PageResult<T> {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
}

export interface CommonMediaType {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  title?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export enum Department {
  Acting = 'Acting',
  Art = 'Art',
  Directing = 'Directing',
  VisualEffects = 'Visual Effects',
  Writing = 'Writing',
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: Department;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: Department;
  job?: string;
}

export interface Credits {
  cast: Cast[];
  crew: Cast[];
}

export interface ExternalIds {
  [key: string]: string | undefined;
  imdb_id?: string;
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
  linkedin_id?: string;
  github_id?: string;
  email?: string;
  homepage?: string;
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Image {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MovieDetails extends CommonMediaType {
  belongs_to_collection: string;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  credits: Credits;
  external_ids?: ExternalIds;
  videos?: {
    results: Video[];
  };
  images?: {
    backdrops: Image[];
    posters: Image[];
  };
}

export interface SearchResult extends CommonMediaType {
  media_type: string;
  genre_ids: number[];
  character?: string;
  job?: string;
}

export interface TabsDataType<T> {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: DefineComponent<any, any, any>;
  data: T;
}

export interface QueryItem {
  type: MediaType;
  title: string;
  query: string;
}

export interface PersonDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  external_ids: ExternalIds;
  combined_credits: {
    cast: SearchResult[];
    crew: SearchResult[];
  };
  images: {
    profiles: Image[];
  };
}
