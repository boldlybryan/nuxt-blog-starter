<template>
  <div class="mt-20">
    <h1 class="text-2xl font-semibold tracking-tighter mb-4">My Portfolio</h1>
    <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
  <div class="mt-4">
    <NuxtLink v-for="page in pages" :key="page.path" :to="page.path" class="flex flex-col mb-6">
      <h2 class="font-semibold">{{ page.title }}</h2>
      <p>{{ page.description }}</p>
    </NuxtLink>
  </div>
  <div class="mt-4 flex gap-3">
    <NuxtLink to="/feed.xml" external target="_blank" class="underline">RSS</NuxtLink>
    <NuxtLink to="https://github.com/boldlybryan/nuxt-blog-starter" class="underline">GitHub</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const { data: pages } = await useAsyncData('content', () => {
  return queryCollection('content')
    .all()
})
</script>

<style>

</style>