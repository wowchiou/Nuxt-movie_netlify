<template>
  <!-- components/ImageBar/index -->
  <div class="comparison">
    <div class="comparisonImage beforeImage">
      <img :src="darkImage" alt="before" />
    </div>
    <div class="comparisonImage afterImage" :style="getStyle.container">
      <img :src="lightImage" :style="getStyle.image" alt="after" />
    </div>
  </div>
</template>

<script setup lang="ts">
type TransformType = { transform: string };

type StyleType = {
  image: TransformType;
  container: TransformType;
};

const props = defineProps<{
  darkImage: string;
  lightImage: string;
  percent: number;
  origin: 'up' | 'down' | 'left' | 'right';
}>();

// computed
const percentProgress = computed(() => 100 - props.percent);
const getStyle = computed<StyleType>(() => {
  switch (props.origin) {
    case 'left':
      return getTransform(
        `translate(${percentProgress.value}%, 0)`,
        `translate(${percentProgress.value * -1}%, 0)`
      );
    case 'right':
      return getTransform(
        `translate(${percentProgress.value * -1}%, 0)`,
        `translate(${percentProgress.value}%, 0)`
      );
    case 'up':
      return getTransform(
        `translate(0, ${percentProgress.value}%)`,
        `translate(0, ${percentProgress.value * -1}%)`
      );
    case 'down':
      return getTransform(
        `translate(0, ${percentProgress.value * -1}%)`,
        `translate(0, ${percentProgress.value}%)`
      );
    default:
      return getTransform('none', 'none');
  }
});

// methods
function getTransform(image: string, container: string): StyleType {
  return {
    image: { transform: image },
    container: { transform: container },
  };
}
</script>

<style scoped>
.comparison {
  position: relative;
  overflow: hidden;
  line-height: 1;
}
.comparison img {
  display: block !important;
}
.comparisonImage {
  width: 100%;
  height: 100%;
}
.beforeImage img {
  width: 100%;
  height: 100%;
}
.afterImage {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  transform: translate(0, 0);
  width: 100%;
  height: 100%;
  transition: transform 1s;
}
.afterImage img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(0, 0);
  transition: transform 1s;
}
</style>
