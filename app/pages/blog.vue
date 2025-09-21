<template>
  <div class="mt-20">
    <h1 class="text-2xl font-semibold tracking-tighter">Blog</h1>
  </div>
  <div class="mt-8">
    <NuxtLink v-for="page in pages" :key="page.path" :to="page.path" class="flex align-baseline justify-between mb-6">
      <div>
        <h2 class="font-semibold">{{ page.title }}</h2>
        <p class="opacity-60">{{ page.description }}</p>
      </div>
      <div class="opacity-60">{{ page.date }}</div>
    </NuxtLink>
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