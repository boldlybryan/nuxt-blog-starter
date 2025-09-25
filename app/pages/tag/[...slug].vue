<template>
  <div class="mt-20">
    <h1 class="text-lg text-gray-500 font-medium tracking-tighter mb-6">Posts tagged with "{{ tag }}"</h1>
    <div v-if="posts && posts.length > 0">
    <NuxtLink v-for="post in posts" :key="post.path" :to="post.path" class="mt-12 flex flex-col gap-4 pt-8 border-t">
      <div class="flex align-baseline justify-between gap-4">
        <div class="flex-1">
          <h2 class="font-semibold">{{ post.title }}</h2>
          <p class="opacity-60">{{ post.description }}</p>
        </div>
        <NuxtTime :datetime="post.date" year="numeric" month="short" day="numeric" class="text-sm opacity-60"/>
      </div>
      <ContentRenderer
        :value="post"
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
      <div v-if="post.tags">
        <span>Filed under: </span>
        <NuxtLink v-for="tag in post.tags" :key="tag" class="bg-gray-100 text-gray-700 px-2 py-1 rounded mr-2" :to="`/tag/${tag}`">{{ tag }}</NuxtLink>
      </div>
    </NuxtLink>
    </div>
    
    <div v-else class="text-gray-500">
      No posts found with tag "{{ tag }}"
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const tag = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug

const { data: posts } = await useAsyncData(`posts-tag-${tag}`, async () => {
  const result = await queryCollection('content').all()
  return result.filter(post => post.tags && post.tags.includes(tag))
})
</script>

<style>

</style>
