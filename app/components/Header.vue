<template>
  <header class="pt-4">
    <nav class="flex gap-3">
      <NuxtLink v-for="item in navItems" :to="item.path">{{ item.name }}</NuxtLink>
    </nav>
  </header>
</template>

<script lang="ts" setup>
const navItems = {
  'home': {
    name: 'home',
    path: '/'
  },
  'blog': {
    name: 'blog',
    path: '/blog'
  },
  'deploy': {
    name: 'deploy',
    path: 'https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fboldlybryan%2Fnuxt-blog-starter'
  }

}
</script>

<style>

</style>