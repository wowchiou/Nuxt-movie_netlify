<template>
  <!-- components/Card/Wrapper -->
  <div>
    <h3 class="text-4xl mb-6">
      <slot name="title" />
    </h3>
    <ElScrollbar always>
      <div :class="`card-wrapper-div flex gap-4 pt-[2px] pb-8 px-[2px] w-max`">
        <slot />
      </div>
    </ElScrollbar>
  </div>
</template>
