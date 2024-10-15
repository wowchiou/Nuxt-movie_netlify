<template>
  <!-- TheFooter -->
  <div
    class="bg-gray-950 border-t-[1px] border-gray-600 px-6 py-16 text-gray-300"
  >
    <div>
      <div class="flex items-center">
        <NuxtImg src="/img/movies.webp" width="20" />
        <span class="ml-2 text-3xl text-gray-100 text-bold">Nuxt Movies</span>
      </div>
      <div class="flex items-center mt-4">
        <span>Made with</span>
        <NuxtImg class="ml-2" src="/img/nuxt.svg" width="25" format="webp" />
        <span class="ml-1">Nuxt</span>
      </div>
      <div class="flex items-center mt-4">
        <span>Data provided by</span>
        <NuxtImg class="ml-2" src="/img/tmdb.svg" width="50" format="webp" />
      </div>
      <div
        class="flex items-center my-12 leading-1 text-gray-400 leading-normal"
      >
        This project uses the TMDB API but is not endorsed or certified by TMDB.
      </div>
    </div>
    <div class="sm:flex sm:items-end sm:gap-6 leading-none">
      <div class="flex items-center gap-6 text-4xl">
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
            <span class="text-2xl ml-2">power by Netlify</span>
          </NuxtLink>
        </div>
      </div>
      <LanguageSwitcher class="mt-6 sm:mt-0" />
    </div>
  </div>
</template>
