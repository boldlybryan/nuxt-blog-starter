---
title: Building with Nuxt and Vue - A Practical Example
description: Learn how this blog works under the hood with practical Nuxt and Vue examples
date: 2025-01-17
author: Template Documentation
---

This post explains how your blog is built, showing you real examples from the codebase. Perfect for understanding and customizing your blog!

## The Tech Stack Explained

Your blog uses three main technologies:

1. **[Nuxt 4](https://nuxt.com)** - A Vue framework that handles routing, server-side rendering, and more
2. **[Vue 3](https://vuejs.org)** - The reactive JavaScript framework for building user interfaces  
3. **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS for styling

## How Pages Work in Nuxt

Nuxt uses **file-based routing**. Every `.vue` file in `app/pages/` becomes a route:

```
app/pages/
├── index.vue      → yoursite.com/
├── about.vue      → yoursite.com/about
└── [...slug].vue  → yoursite.com/any/path/here
```

Let's look at your homepage (`app/pages/index.vue`):

```vue
<template>
  <div class="mt-20 space-y-10">
    <p class="text-xl opacity-80">
      Welcome to your new blog!
    </p>
    
    <!-- This part shows your blog posts -->
    <div class="mt-12">
      <NuxtLink 
        v-for="page in pages" 
        :key="page.path" 
        :to="page.path"
      >
        <!-- Post preview here -->
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// This runs on the server, fetching your posts
const { data: pages } = await useAsyncData('all-pages', () => {
  return queryCollection('content').order('date', 'DESC').all()
})
</script>
```

**Key Concepts:**
- `<script setup>` - Vue 3's Composition API ([learn more](https://vuejs.org/guide/extras/composition-api-faq.html))
- `useAsyncData` - Nuxt's data fetching ([docs](https://nuxt.com/docs/api/composables/use-async-data))
- `queryCollection` - Nuxt Content's API for getting your posts

## Understanding Components

Components are reusable pieces of UI. Your Header (`app/components/Header.vue`) is a great example:

```vue
<template>
  <header class="pt-4 pb-3.5 border-b">
    <nav class="flex gap-2.5">
      <NuxtLink 
        v-for="(item, key) in navItems" 
        :key="key"
        :to="item.path"
      >
        {{ item.name }}
      </NuxtLink>
    </nav>
  </header>
</template>
```

**Vue Features Used:**
- `v-for` - Loops through items ([Vue docs](https://vuejs.org/guide/essentials/list.html))
- `:to` - Binds data to attributes (shorthand for `v-bind:to`)
- `NuxtLink` - Nuxt's router link component

## Styling with Tailwind

Instead of writing CSS files, you use utility classes:

```vue
<!-- Traditional CSS approach -->
<div class="my-container">
  <h1 class="my-title">Hello</h1>
</div>

<style>
.my-container { margin-top: 5rem; }
.my-title { font-size: 2rem; font-weight: 600; }
</style>

<!-- Tailwind approach (what we use) -->
<div class="mt-20">
  <h1 class="text-2xl font-semibold">Hello</h1>
</div>
```

Common Tailwind classes in your blog:
- `mt-20` - margin-top: 5rem
- `text-2xl` - font-size: 1.5rem
- `font-semibold` - font-weight: 600
- `space-y-10` - adds vertical spacing between children

[Tailwind Cheat Sheet](https://tailwindcomponents.com/cheatsheet/)

## How Blog Posts Work

Your blog posts are Markdown files that get transformed into pages:

1. **You write** a Markdown file in `content/`
2. **Nuxt Content** reads and parses it
3. **The `[...slug].vue` page** displays it

Here's how `[...slug].vue` works:

```vue
<script setup>
const route = useRoute()

// Fetch the page based on the URL
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

// Handle 404
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}
</script>

<template>
  <article class="mt-12">
    <h1>{{ page.title }}</h1>
    <ContentRenderer :value="page" />
  </article>
</template>
```

## Reactive Data in Vue

Vue automatically updates the UI when data changes. Here's a simple example:

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// This creates reactive data
const count = ref(0)
</script>
```

[Learn more about Vue reactivity](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)

## Server-Side Features

Your RSS feed (`server/routes/feed.xml.ts`) runs on the server:

```typescript
export default defineEventHandler(async (event) => {
  // This code runs on the server, not in the browser
  const posts = await queryCollection('content').all()
  
  const feed = new Feed({
    title: 'Your Blog',
    // ... feed configuration
  })
  
  // Add posts to feed
  posts.forEach(post => {
    feed.addItem({
      title: post.title,
      link: `https://yourblog.com${post.path}`,
      date: new Date(post.date),
    })
  })
  
  return feed.rss2()
})
```

## Customization Ideas

Now that you understand the basics, here are some modifications you could make:

### 1. Add a Dark Mode Toggle

```vue
<!-- In your layout or header -->
<script setup>
const isDark = ref(false)

const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <button @click="toggleDark">
    {{ isDark ? '☀️' : '🌙' }}
  </button>
</template>
```

### 2. Add Reading Time

```vue
<!-- In your [...slug].vue -->
<script setup>
const readingTime = computed(() => {
  const wordsPerMinute = 200
  const wordCount = page.value.body.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
})
</script>
```

### 3. Add Post Categories

```markdown
---
title: My Post
category: tutorials
---
```

Then filter by category:

```vue
const tutorials = pages.value.filter(p => p.category === 'tutorials')
```

## Debugging Tips

1. **Vue Devtools** - Install the [browser extension](https://devtools.vuejs.org/)
2. **Nuxt Devtools** - Press `Shift + Alt + D` in your app
3. **Console logging** - Use `console.log()` in `<script setup>`
4. **Network tab** - Check API calls in browser DevTools

## Learn More

- **Vue Basics**: [Vue 3 Guide](https://vuejs.org/guide/introduction.html)
- **Nuxt Concepts**: [Nuxt Guide](https://nuxt.com/docs/guide/concepts)
- **Tailwind**: [Core Concepts](https://tailwindcss.com/docs/utility-first)
- **Nuxt Content**: [Content Module](https://content.nuxt.com/)

## Your Turn!

Try these exercises to practice:

1. **Change the homepage**: Add a hero section with a welcome message
2. **Create a component**: Make a `PostCard.vue` component
3. **Add a feature**: Implement a "favorite posts" section
4. **Style something**: Use Tailwind to create a colorful alert box

Remember: The best way to learn is by experimenting. Break things, fix them, and have fun! 🚀