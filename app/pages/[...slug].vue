<template>
<div class="mt-20">
    <template v-if="page">
      <div class="mb-4">
        <h1 v-if="page.title" class="text-2xl font-semibold tracking-tighter">{{ page.title }}</h1>
        <div v-if="page.description">{{ page.description }}</div>
      </div>
      <NuxtTime v-if="page.date" :datetime="page.date" year="numeric" month="short" day="numeric" class="text-sm opacity-60"/>
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
          max-w-none
          mt-8"/>
      <div v-if="page.tags">
        <span>Filed under: </span>
        <NuxtLink v-for="tag in page.tags" :key="tag" class="bg-gray-100 text-gray-700 px-2 py-1 rounded mr-2" :to="`/tag/${tag}`">{{ tag }}</NuxtLink>
      </div>
    </template>
    <template v-else>
      <div class="empty-page">
        <h1>Page Not Found</h1>
        <p>Oops! The content you're looking for doesn't exist.</p>
        <NuxtLink to="/">Go back home</NuxtLink>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

// Set up OG image for blog posts
if (page.value) {
  defineOgImage({
    component: 'OgImage',
    props: {
      title: page.value.title || '',
      description: page.value.description || '',
      siteName: 'nuxt-blog-starter',
      date: page.value.date ? new Date(page.value.date).toLocaleDateString() : '',
      tags: page.value.tags || []
    }
  })
}
</script>

<style>

</style>