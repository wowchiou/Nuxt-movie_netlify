export default defineNuxtRouteMiddleware((to) => {
  const localePath = useLocalePath();
  if (!to.params.type || !['movie', 'tv'].includes(to.params.type as string))
    return navigateTo(localePath('/'));
});
