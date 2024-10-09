import type { MediaType, QueryItem } from '~/types';

export default defineNuxtRouteMiddleware((to) => {
  const localePath = useLocalePath();
  const type = to.params.type as MediaType;
  const category = to.params.category;
  const isValidCategory = QUERY_LIST[type].find(
    (itm: QueryItem) => itm.query === category
  );

  if (!category || !isValidCategory)
    return clearError({ redirect: localePath('/') });
});
