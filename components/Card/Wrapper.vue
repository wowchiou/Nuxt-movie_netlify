<template>
  <!-- components/Card/Wrapper -->
  <div class="px-6">
    <h3 class="text-4xl mb-6">
      <slot name="title" />
    </h3>
    <ElScrollbar>
      <div :class="`card-wrapper-div flex gap-4 pt-[2px] pb-6`">
        <slot />
      </div>
    </ElScrollbar>
  </div>
</template>
