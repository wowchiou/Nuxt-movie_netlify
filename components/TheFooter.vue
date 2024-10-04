<template>
  <!-- TheFooter -->
  <div
    class="bg-gray-950 border-t-[1px] border-gray-600 px-3 sm:px-6 py-10 text-gray-300"
  >
    <div class="text-[14px]">
      <div class="flex items-center">
        <NuxtImg src="/img/movies.webp" width="20" />
        <span class="ml-1 text-[20px] sm:text-[22px] text-gray-100 text-bold"
          >Nuxt Movies</span
        >
      </div>
      <div class="flex items-center mt-2">
        <span>Made with</span>
        <NuxtImg class="ml-2" src="/img/nuxt.svg" width="25" />
        <span class="ml-1 text-[18px]">Nuxt</span>
      </div>
      <div class="flex items-center mt-2">
        <span>Data provided by</span>
        <NuxtImg class="ml-2" src="/img/tmdb2.svg" width="100" />
      </div>
      <div
        class="flex items-center mt-6 text-[12px] sm:text-[14px] leading-[1.5]"
      >
        This project uses the TMDB API but is not endorsed or certified by TMDB.
      </div>
    </div>
    <div class="sm:flex sm:items-end sm:gap-4 mt-4 leading-none">
      <div class="flex items-center gap-4 text-[20px]">
        <div>
          <NuxtLink to="https://twitter.com/nuxt_js" target="_blank">
            <NuxtIcon name="simple-icons:twitter" />
          </NuxtLink>
        </div>
        <div>
          <NuxtLink
            to="https://github.com/wowchiou/Nuxt-movie_netlify"
            target="_blank"
          >
            <NuxtIcon name="simple-icons:github" />
          </NuxtLink>
        </div>
        <div class="px-2 py-1 bg-gray-800 rounded-sm">
          <NuxtLink
            class="flex items-center"
            to="https://www.netlify.com/"
            target="_blank"
          >
            <NuxtIcon name="simple-icons:netlify" />
            <span class="text-[14px] ml-2">power by Netlify</span>
          </NuxtLink>
        </div>
      </div>
      <LanguageSwitcher class="mt-4 sm:mt-0" />
    </div>
  </div>
</template>
