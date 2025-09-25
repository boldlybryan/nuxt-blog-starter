<template>
  <div class="mt-20">
    <h1 class="text-2xl font-semibold tracking-tighter mb-4">Nuxt Blog Starter</h1>
    <p class="mb-4">A minimal, fast, and modern blog template built with Nuxt 4, Vue 3, and Tailwind CSS. Perfect for developers, writers, and content creators who want a clean foundation to build upon.</p>
    <p class="mb-4">This template includes everything you need: markdown-based content management, RSS feeds, SEO optimization, and a responsive design. Get started in minutes and customize it to match your style.</p>
  </div>
  <div class="mt-12">
    <NuxtLink v-for="page in pages" :key="page.path" :to="page.path" class="mt-12 flex flex-col gap-4 pt-8 border-t">
      <div class="flex align-baseline justify-between gap-4">
        <div class="flex-1">
          <h2 class="font-semibold">{{ page.title }}</h2>
          <p class="opacity-60">{{ page.description }}</p>
        </div>
        <NuxtTime v-if="page.date" :datetime="page.date" year="numeric" month="short" day="numeric" class="text-sm opacity-60"/>
      </div>
      <ContentRenderer
        :value="page"
        class="
          prose
          prose-sm
          prose-headings:font-[600]
          prose-h2:tracking-tighter
          prose-h2:mt-14
          prose-h3:text-base
          prose-h3:mt-6
          prose-p:text-base
          prose-ul:text-base
          prose-ol:text-base
          prose-gray
          prose-pre:text-base
          prose-pre:bg-gray-100
          prose-pre:text-gray-700
          prose-img:m-0
          max-w-none"
      />
      <div v-if="page.tags">
        <span>Filed under: </span>
        <NuxtLink v-for="tag in page.tags" :key="tag" class="bg-gray-100 text-gray-700 px-2 py-1 rounded mr-2" :to="`/tag/${tag}`">{{ tag }}</NuxtLink>
      </div>
    </NuxtLink>
    
    <Pagination :current-page="currentPage" :total-pages="totalPages" />
  </div>
  <div class="mt-4 flex gap-3">
    <NuxtLink to="/feed.xml" external target="_blank" class="underline">RSS</NuxtLink>
    <NuxtLink to="https://github.com/boldlybryan/nuxt-blog-starter" class="underline">GitHub</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const { pages, currentPage, totalPages } = await usePagination({
  currentPage: 1,
  postsPerPage: 10
})
</script>

<style>

</style>