<template>
  <div class="text-[22px] flex gap-4">
    <!-- imdb -->
    <ExternalLink
      v-if="links.imdb_id"
      :link="`https://www.imdb.com/title/${links.imdb_id}`"
      label="IMDb"
      class="link"
    >
      <NuxtIcon name="simple-icons:imdb" />
    </ExternalLink>
    <!-- twitter -->
    <ExternalLink
      v-if="links.twitter_id"
      :link="`https://twitter.com/${links.twitter_id}`"
      label="Twitter"
      class="link"
    >
      <NuxtIcon name="simple-icons:twitter" />
    </ExternalLink>
    <!-- facebook -->
    <ExternalLink
      v-if="links.facebook_id"
      :link="`https://www.facebook.com/${links.facebook_id}`"
      label="Facebook"
      class="link"
    >
      <NuxtIcon name="simple-icons:facebook" />
    </ExternalLink>
    <!-- instagram -->
    <ExternalLink
      v-if="links.instagram_id"
      :link="`https://www.instagram.com/${links.instagram_id}`"
      label="Instagram"
      class="link"
    >
      <NuxtIcon name="simple-icons:instagram" />
    </ExternalLink>
    <!-- github -->
    <ExternalLink
      v-if="links.github_id"
      :link="`https://www.github.com/${links.github_id}`"
      label="github"
      class="link"
    >
      <NuxtIcon name="simple-icons:github" />
    </ExternalLink>
    <!-- linkedin -->
    <ExternalLink
      v-if="links.linkedin_id"
      :link="`https://www.linkedin.com/in/${links.linkedin_id}`"
      label="linkedin"
      class="link"
    >
      <NuxtIcon name="simple-icons:linkedin" />
    </ExternalLink>
    <!-- homepage -->
    <ExternalLink
      v-if="links.homepage"
      :link="links.homepage"
      label="homepage"
      class="link"
    >
      <NuxtIcon name="mdi:link-variant" />
    </ExternalLink>
  </div>
</template>

<script setup lang="ts">
import type { ExternalIds } from '~/types';

defineProps<{
  links: ExternalIds;
}>();
</script>

<style scoped>
.link {
  @apply text-gray-100 sm:text-gray-400 sm:hover:text-gray-100;
}
</style>
