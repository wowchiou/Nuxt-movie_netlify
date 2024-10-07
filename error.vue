<template>
  <div class="h-screen w-full text-gray-400 flex justify-center items-center">
    <div class="px-6 sm:px-0 inline-block">
      <div class="text-5xl text-bold">
        <p class="flex items-center">
          <NuxtIcon
            class="mr-4 text-6xl text-red-300"
            name="material-symbols-light:chat-error"
          />
          <span class="text-gray-200">{{ error.statusCode }}</span>
        </p>
        <p class="text-4xl text-gray-200">
          {{
            error.statusCode === 404
              ? 'This page could not be found.'
              : 'An error occurred.'
          }}
        </p>
      </div>
      <p class="mt-4">
        Looks like you've followed a broken link or entered a URL that doesn't
        exist on this site.
      </p>
      <a
        class="p-4 text-gray-950 bg-primary cursor-pointer rounded-md mt-6"
        @click="handleError"
      >
        Back To Home
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
type ErrorData = {
  url: string;
  statusCode: number;
  statusMessage: string;
  message: string;
  description: string;
};

defineProps<{
  error: ErrorData;
}>();

const localePath = useLocalePath();

const handleError = () => {
  let localeRoute = localePath('/');
  if (!localeRoute) localeRoute = '/';
  clearError({ redirect: localeRoute });
};
</script>
