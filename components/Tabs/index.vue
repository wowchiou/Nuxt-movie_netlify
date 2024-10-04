<template>
  <div>
    <div
      class="flex justify-center items-center gap-[50px] sm:gap-[100px] py-4 sm:pt-0 lg:py-6"
    >
      <div
        v-for="itm in data"
        :key="itm.title"
        class="text-[18px] sm:text-[22px] cursor-pointer"
        :class="
          currentTab.title === itm.title ? 'text-primary' : 'text-gray-500'
        "
        @click="currentTab = itm"
      >
        {{ $t(itm.title) }}
      </div>
    </div>
    <slot :active="currentTab" />
  </div>
</template>

<script setup lang="ts">
type TabType = { title: string };

const props = defineProps<{
  data: TabType[];
}>();

// data
const currentTab = ref<TabType>(props.data[0]);
</script>
