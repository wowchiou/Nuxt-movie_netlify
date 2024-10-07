<template>
  <div>
    <div class="flex justify-center items-center gap-[10rem] sm:pt-0 py-6">
      <div
        v-for="itm in data"
        :key="itm.title"
        class="text-3xl cursor-pointer"
        :class="
          currentTab.title === itm.title ? 'text-primary' : 'text-gray-400'
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

const currentTab = ref<TabType>(props.data[0]);
</script>
