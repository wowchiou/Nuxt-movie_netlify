export default defineNuxtRouteMiddleware((to) => {
  if (!to.query.key) {
    return navigateTo('/');
  }
});
