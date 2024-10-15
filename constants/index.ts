import type { QueryItem } from '~/types';

export const QUERY_LIST = {
  movie: <QueryItem[]>[
    { type: 'movie', title: 'Popular Movies', query: 'popular' },
    { type: 'movie', title: 'Top Rated Movies', query: 'top_rated' },
    { type: 'movie', title: 'Upcoming Movies', query: 'upcoming' },
    { type: 'movie', title: 'Now Playing Movies', query: 'now_playing' },
  ],
  tv: <QueryItem[]>[
    { type: 'tv', title: 'Popular TV Shows', query: 'popular' },
    { type: 'tv', title: 'Top Rated TV Shows', query: 'top_rated' },
    { type: 'tv', title: 'TV Shows Airing Today', query: 'airing_today' },
  ],
};

export const NAV_LIST = [
  {
    name: '首頁',
    icon: 'material-symbols:house',
    path: '/',
    active: false,
    type: 'home',
  },
  {
    name: '電影',
    icon: 'material-symbols:movie-filter-sharp',
    path: '/movie',
    active: true,
    type: 'movie',
  },
  {
    name: '電視',
    icon: 'material-symbols:tv-guide-sharp',
    path: '/tv',
    active: true,
    type: 'tv',
  },
];

export const EXTERNAL_LiNKS = [
  {
    name: 'imdb_id',
    url: 'https://www.imdb.com/title/',
    icon: 'simple-icons:imdb',
  },
  {
    name: 'twitter_id',
    url: 'https://twitter.com/',
    icon: 'simple-icons:twitter',
  },
  {
    name: 'facebook_id',
    url: 'https://www.facebook.com/',
    icon: 'simple-icons:facebook',
  },
  {
    name: 'instagram_id',
    url: 'https://www.instagram.com/',
    icon: 'simple-icons:instagram',
  },
  {
    name: 'github_id',
    url: 'https://www.github.com/',
    icon: 'simple-icons:github',
  },
  {
    name: 'linkedin_id',
    url: 'https://www.linkedin.com/in/',
    icon: 'simple-icons:linkedin',
  },
  {
    name: 'homepage',
    url: '',
    icon: 'mdi:link-variant',
  },
];
