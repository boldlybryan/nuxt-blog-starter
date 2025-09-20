<template>
<div class="mt-20">
    <template v-if="page">
      <div class="mb-4">
        <h1 v-if="page.title" class="text-2xl font-semibold tracking-tighter">{{ page.title }}</h1>
        <div v-if="page.description">{{ page.description }}</div>
      </div>
      <div v-if="page.date">{{ page.date }}</div>
      <ContentRenderer :value="page" class="mt-8"/>
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
</script>

<style>

</style>