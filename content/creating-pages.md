---
title: Creating New Pages
description: Learn how to add custom pages and understand Nuxt routing in your blog
date: 2025-01-12
author: Template Documentation
---

Beyond blog posts, you might want to add custom pages like About, Contact, or Portfolio. Here's how to create and manage pages in your Nuxt blog.

## Understanding Nuxt Routing

Nuxt uses [file-based routing](https://nuxt.com/docs/guide/directory-structure/pages). Files in the `app/pages/` directory automatically become routes:

```
app/pages/
├── index.vue          → / (homepage)
├── blog.vue          → /blog
├── about.vue         → /about
├── contact.vue       → /contact
└── [...slug].vue     → Dynamic route for blog posts
```

> 📚 Deep dive: [Nuxt Routing](https://nuxt.com/docs/getting-started/routing) | [Vue Router docs](https://router.vuejs.org/)

## Current Page Structure

Your template includes these pages:

- **`index.vue`**: Homepage with blog post listing
- **`blog.vue`**: Dedicated blog page (same content as homepage)
- **`[...slug].vue`**: Dynamic route that displays individual blog posts

## Creating Static Pages

### About Page
Create `app/pages/about.vue`:

```vue
<template>
  <div class="mt-20">
    <h1 class="text-2xl font-semibold tracking-tighter mb-8">About</h1>
    
    <div class="prose prose-gray max-w-none">
      <p class="text-lg mb-6">
        Welcome! I'm a developer passionate about creating amazing web experiences.
      </p>
      
      <h2>What I Do</h2>
      <p>
        I specialize in modern web development using Vue, Nuxt, and other 
        cutting-edge technologies.
      </p>
      
      <h2>Get In Touch</h2>
      <p>
        Feel free to reach out if you'd like to collaborate or just say hello!
      </p>
      
      <div class="flex gap-4 mt-8">
        <a href="mailto:hello@example.com" class="underline">Email</a>
        <a href="https://twitter.com/yourusername" class="underline">Twitter</a>
        <a href="https://github.com/yourusername" class="underline">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script setup>
// Set page meta
useHead({
  title: 'About',
  meta: [
    { name: 'description', content: 'Learn more about me and what I do.' }
  ]
})
</script>
```

> 🔍 Learn about [useHead composable](https://nuxt.com/docs/api/composables/use-head) | [Vue script setup](https://vuejs.org/api/sfc-script-setup.html)

### Contact Page
Create `app/pages/contact.vue`:

```vue
<template>
  <div class="mt-20">
    <h1 class="text-2xl font-semibold tracking-tighter mb-8">Contact</h1>
    
    <div class="max-w-md">
      <form @submit.prevent="submitForm" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium mb-2">Name</label>
          <input 
            v-model="form.name"
            type="text" 
            id="name" 
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium mb-2">Email</label>
          <input 
            v-model="form.email"
            type="email" 
            id="email" 
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        
        <div>
          <label for="message" class="block text-sm font-medium mb-2">Message</label>
          <textarea 
            v-model="form.message"
            id="message" 
            rows="4" 
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          :disabled="submitting"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {{ submitting ? 'Sending...' : 'Send Message' }}
        </button>
      </form>
      
      <div v-if="submitted" class="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
        Thank you! Your message has been sent.
      </div>
    </div>
  </div>
</template>

<script setup>
const form = reactive({
  name: '',
  email: '',
  message: ''
})

const submitting = ref(false)
const submitted = ref(false)

const submitForm = async () => {
  submitting.value = true
  
  // Here you would typically send to an API endpoint
  // For now, we'll just simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  submitted.value = true
  submitting.value = false
  
  // Reset form
  Object.keys(form).forEach(key => form[key] = '')
}

// Learn about reactive data: https://vuejs.org/guide/essentials/reactivity-fundamentals.html

useHead({
  title: 'Contact',
  meta: [
    { name: 'description', content: 'Get in touch with me.' }
  ]
})
</script>
```

## Adding Pages to Navigation

Update `app/components/Header.vue` to include new pages:

```vue
<script setup>
const navItems = {
  'home': {
    name: 'home',
    path: '/',
    external: false
  },
  'blog': {
    name: 'blog',
    path: '/blog',
    external: false
  },
  'about': {
    name: 'about',
    path: '/about',
    external: false
  },
  'contact': {
    name: 'contact',
    path: '/contact',
    external: false
  },
  'deploy': {
    name: 'deploy',
    path: 'https://vercel.com/new/clone?repository-url=...',
    external: true
  }
}
</script>
```

## Dynamic Routes

### Nested Routes
Create folders for nested routes:

```
app/pages/
├── portfolio/
│   ├── index.vue     → /portfolio
│   └── [slug].vue    → /portfolio/project-name
└── blog/
    ├── index.vue     → /blog
    └── [slug].vue    → /blog/post-name
```

### Route Parameters
Access route parameters in your pages:

```vue
<!-- app/pages/portfolio/[slug].vue -->
<template>
  <div>
    <h1>Project: {{ $route.params.slug }}</h1>
  </div>
</template>

<script setup>
const route = useRoute()
const projectSlug = route.params.slug
</script>
```

## Page Layouts

### Using Different Layouts
Create custom layouts in `app/layouts/`:

```vue
<!-- app/layouts/minimal.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-2xl mx-auto py-12 px-4">
      <slot />
    </div>
  </div>
</template>
```

Use in a page:

```vue
<!-- app/pages/special.vue -->
<template>
  <div>
    <h1>Special Page</h1>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'minimal'
})
</script>
```

## SEO and Meta Tags

### Page-specific SEO
Use `useHead()` for better SEO:

```vue
<script setup>
useHead({
  title: 'About - My Blog',
  meta: [
    { name: 'description', content: 'Learn more about me and my work.' },
    { property: 'og:title', content: 'About - My Blog' },
    { property: 'og:description', content: 'Learn more about me and my work.' },
    { property: 'og:image', content: '/images/about-og.jpg' }
  ]
})
</script>
```

### Dynamic SEO
For dynamic pages, generate meta from data:

```vue
<script setup>
const { data: project } = await useAsyncData('project', () => {
  return queryCollection('projects').path(route.path).first()
})

useHead({
  title: () => `${project.value?.title} - Portfolio`,
  meta: [
    { name: 'description', content: () => project.value?.description }
  ]
})
</script>
```

## Advanced Features

### Page Transitions
Add smooth transitions between pages:

```vue
<!-- app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
```

### API Routes
Create API endpoints in `server/api/`:

```typescript
// server/api/contact.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Process contact form
  // Send email, save to database, etc.
  
  return { success: true }
})
```

Use in your contact form:

```vue
<script setup>
const submitForm = async () => {
  const { data } = await $fetch('/api/contact', {
    method: 'POST',
    body: form
  })
}
</script>
```

## Common Page Types

### Portfolio Page
```vue
<!-- app/pages/portfolio.vue -->
<template>
  <div class="mt-20">
    <h1 class="text-2xl font-semibold tracking-tighter mb-8">Portfolio</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="project in projects" :key="project.id" class="bg-white rounded-lg shadow-sm overflow-hidden">
        <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover">
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
          <p class="text-gray-600 mb-4">{{ project.description }}</p>
          <a :href="project.url" class="text-blue-600 hover:underline">View Project →</a>
        </div>
      </div>
    </div>
  </div>
</template>
```

### 404 Error Page
```vue
<!-- app/error.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">{{ error.statusCode }}</h1>
      <p class="text-gray-600 mb-8">{{ error.statusMessage }}</p>
      <NuxtLink to="/" class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
        Go Home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['error'])
</script>
```

## Next Steps

- [Site Configuration](/site-configuration) - Update meta information
- [Deployment](/deployment) - Deploy your enhanced blog
- [Customizing Styles](/customizing-styles) - Style your new pages

Start adding the pages your blog needs to become a complete website!