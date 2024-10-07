<template>
  <!-- LanguageSwitcher -->
  <div class="flex items-center">
    <p class="mr-4">Language:</p>
    <ElSelect v-model="locale" class="!w-[150px]" @change="updateLocale">
      <ElOption
        v-for="lang in availableLocales"
        :key="lang.code"
        :label="lang.name"
        :value="lang.code"
      />
    </ElSelect>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
const router = useRouter();
const availableLocales = computed(() => locales.value);

async function updateLocale(value: string) {
  await setLocale(value);
  router.go(0);
}
</script>
