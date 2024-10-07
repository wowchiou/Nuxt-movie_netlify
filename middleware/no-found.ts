export default defineNuxtRouteMiddleware(() => {
  const localePath = useLocalePath();
  return clearError({ redirect: localePath('/') });
});
