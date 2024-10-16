<template>
  <ElDialog
    v-if="showPhoto"
    v-model="showPhoto"
    class="bg-transparent"
    :show-close="false"
    align-center
    fullscreen
    modal-class="reset-modal"
  >
    <div class="flex justify-center items-center h-lvh">
      <div>
        <NuxtImg
          class="max-w-[90vw] max-h-[90vh] pointer-events-none block"
          :src="pic"
          format="webp"
          sizes="xs:90vw lg:800px"
        />
      </div>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean;
  pic: string;
}>();

const showPhoto = computed(() => props.show);
</script>
