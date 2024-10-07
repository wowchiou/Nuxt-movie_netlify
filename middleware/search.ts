export default defineNuxtRouteMiddleware((to) => {
  const localePath = useLocalePath();
  if (!to.query.key) {
    return clearError({ redirect: localePath('/') });
  }
});
