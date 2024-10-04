<template>
  <a :href="link" :target="target" rel="noopener" :aria-label="label">
    <slot />
  </a>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    link: string;
    label?: string;
    target?: string;
  }>(),
  {
    target: '_blank',
    label: '',
  }
);
</script>
