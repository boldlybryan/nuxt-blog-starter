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
      <NuxtTime v-if="page.date" :datetime="page.date" year="numeric" month="short" day="numeric" class="text-sm opacity-60"/>
    </NuxtLink>
    
    <Pagination :current-page="currentPage" :total-pages="totalPages" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const currentPage = parseInt(route.params.number as string) || 1

useSeoMeta({
  title: 'Page ' + currentPage + '  |  nuxt-blog-starter',
})

if (currentPage < 1) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

const { pages, totalPages } = await usePagination({
  currentPage,
  postsPerPage: 10
})

if (currentPage > totalPages && totalPages > 0) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}
</script>

<style>

</style>
