<template>
  <!-- layouts/default -->
  <div class="md:pl-[80px] pb-[60px] md:pb-0">
    <TheNavBar
      class="fixed z-10 bottom-0 left-0 md:top-0 w-full md:w-[80px] h-[60px] md:h-full"
    />
    <div class="flex flex-col justify-between w-full min-h-lvh">
      <div class="flex-1">
        <slot />
      </div>
      <TheFooter />
    </div>
  </div>
</template>
