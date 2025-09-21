<template>
  <header class="pt-4">
    <nav class="flex gap-3">
      <NuxtLink
        v-for="item in navItems"
        :to="item.path"
        :target="item.external ? '_blank' : undefined"
        :rel="item.external ? 'noopener noreferrer' : undefined"
      >
        {{ item.name }}
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup>
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
    path: 'https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fboldlybryan%2Fnuxt-blog-starter',
    external: true
  }
}
</script>

<style>

</style>