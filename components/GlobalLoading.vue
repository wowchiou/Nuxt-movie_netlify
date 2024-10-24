<template>
  <ElDialog
    v-model="isLoading"
    :show-close="false"
    align-center
    fullscreen
    modal-class="reset-modal"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="w-full h-dvh flex justify-center items-center">
      <div class="w-[7rem] aspect-square loading-logo">
        <NuxtImg
          src="/img/movies.webp"
          width="100"
          height="100"
          format="webp"
          fit="cover"
        />
      </div>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    loading: boolean;
  }>(),
  { loading: false }
);

const isLoading = computed(() => props.loading);
</script>

<style scoped>
.loading-logo {
  animation: shine 0.5s linear infinite alternate;
}
@keyframes shine {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
</style>
