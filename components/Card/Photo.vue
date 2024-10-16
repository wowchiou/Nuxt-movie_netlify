<template>
  <!-- components/Card/Photo -->
  <div
    class="bg-gray-800 cursor-pointer"
    :class="`aspect-[${width}/${height}]`"
    @click="handleOpen"
  >
    <NuxtImg
      :src="getExternalPic(pic)"
      :width="width"
      :height="height"
      loading="lazy"
      fit="cover"
      format="webp"
      class="w-full h-full"
    />
    <DialogPhoto :show="showPhoto" :pic="getExternalPic(pic)" />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    pic: string;
    width: string;
    height: string;
  }>(),
  {
    width: '200',
    height: '300',
  }
);

const showPhoto = ref(false);

function handleOpen() {
  showPhoto.value = !showPhoto.value;
}
</script>
