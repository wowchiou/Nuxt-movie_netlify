<template>
  <!-- components/Card/Wrapper -->
  <div class="px-3 sm:px-6">
    <h3 class="text-[18px] sm:text-[22px] mb-2">
      <slot name="title" />
    </h3>
    <ElScrollbar>
      <div :class="`card-wrapper-div flex gap-2 pt-2 pb-6`">
        <slot />
      </div>
    </ElScrollbar>
  </div>
</template>
