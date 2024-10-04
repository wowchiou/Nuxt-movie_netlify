<template>
  <div class="h-screen w-full text-gray-400 flex justify-center items-center">
    <div class="px-6 sm:px-0 inline-block">
      <div class="text-[18px] sm:text-[24px] text-bold">
        <p>
          <NuxtIcon
            class="text-[50px] mr-2 text-red-300"
            name="material-symbols-light:chat-error"
          />
          <span class="text-gray-200">{{ error.statusCode }}</span>
        </p>
        <p class="text-gray-200">
          {{
            error.statusCode === 404
              ? 'This page could not be found.'
              : 'An error occurred.'
          }}
        </p>
      </div>
      <p class="text-[14px] sm:text-[18px] mt-2">
        Looks like you've followed a broken link or entered a URL that doesn't
        exist on this site.
      </p>
      <a
        class="px-4 py-[2px] text-gray-800 text-[16px] bg-primary cursor-pointer rounded-sm mt-4"
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

const handleError = () => {
  clearError({ redirect: '/' });
};
</script>
