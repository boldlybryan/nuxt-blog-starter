<template>
  <header>
    <nav class="flex gap-2">
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
    path: 'https://example.com'
  }

}
</script>

<style>

</style>