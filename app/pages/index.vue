<template>
  <div class="mt-20">
    <h1 class="text-2xl font-semibold tracking-tighter mb-4">Nuxt Blog Starter</h1>
    <p class="mb-4">A minimal, fast, and modern blog template built with Nuxt 4, Vue 3, and Tailwind CSS. Perfect for developers, writers, and content creators who want a clean foundation to build upon.</p>
    <p class="mb-4">This template includes everything you need: markdown-based content management, RSS feeds, SEO optimization, and a responsive design. Get started in minutes and customize it to match your style.</p>
  </div>
  <div class="mt-12">
    <NuxtLink v-for="page in pages" :key="page.path" :to="page.path" class="flex align-baseline justify-between gap-8 mb-6">
      <div class="flex-1">
        <h2 class="font-semibold">{{ page.title }}</h2>
        <p class="opacity-60">{{ page.description }}</p>
      </div>
      <NuxtTime :datetime="page.date" year="numeric" month="short" day="numeric" class="text-sm opacity-60"/>
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