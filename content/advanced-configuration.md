---
title: Advanced Configuration
description: Optional advanced settings for analytics, performance, and customization
date: 2025-01-10
author: Template Documentation
---

These are **optional** advanced configurations. Your blog works great without them! Only configure what you need.

## Analytics & Monitoring

### Google Analytics (Most Popular)

```bash
npm install @nuxtjs/google-analytics
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/google-analytics'],
  googleAnalytics: {
    id: 'G-XXXXXXXXXX'  // Your GA4 measurement ID
  }
})
```

> 📊 Get your ID from [Google Analytics](https://analytics.google.com/)

### Plausible Analytics (Privacy-Friendly)

```bash
npm install @nuxtjs/plausible
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/plausible'],
  plausible: {
    domain: 'yourdomain.com'
  }
})
```

> 🔒 No cookies, GDPR compliant - [plausible.io](https://plausible.io/)

## Performance Optimization

### Image Optimization

Install Nuxt Image for automatic optimization:

```bash
npm install @nuxt/image
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/image'],
  image: {
    quality: 80,
    format: ['webp', 'jpg']
  }
})
```

Then use in your posts:
```vue
<NuxtImg src="/images/hero.jpg" alt="Hero" loading="lazy" />
```

### Static Site Generation

For maximum performance, pre-render all pages:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true,  // Automatically find and prerender all pages
      routes: ['/sitemap.xml', '/feed.xml']
    }
  }
})
```

## Advanced SEO

### Structured Data (Schema.org)

Add to your post template (`app/pages/[...slug].vue`):

```vue
<script setup>
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: page.value.title,
      description: page.value.description,
      author: {
        '@type': 'Person',
        name: page.value.author
      },
      datePublished: page.value.date
    })
  }]
})
</script>
```

### Open Graph Images

Generate dynamic OG images for each post:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-og-image'],
  ogImage: {
    fonts: ['Inter:400', 'Inter:700']
  }
})
```

## Security Headers

### Content Security Policy

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    security: {
      headers: {
        contentSecurityPolicy: {
          'img-src': ["'self'", 'data:', 'https:'],
          'font-src': ["'self'", 'https://fonts.gstatic.com'],
          'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com']
        }
      }
    }
  }
})
```

## Custom Features

### Reading Time

Add automatic reading time calculation:

```typescript
// content.config.ts
export default defineContentConfig({
  experimental: {
    clientDB: true
  },
  markdown: {
    remarkPlugins: ['remark-reading-time']
  }
})
```

### Comments System

**Option 1: Giscus (GitHub-based)**

```vue
<!-- Add to app/pages/[...slug].vue -->
<script setup>
onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'your-username/your-repo')
  script.setAttribute('data-repo-id', 'your-repo-id')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'your-category-id')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-theme', 'light')
  script.crossOrigin = 'anonymous'
  script.async = true
  
  document.getElementById('comments').appendChild(script)
})
</script>

<template>
  <div id="comments" class="mt-16"></div>
</template>
```

> 💬 Set up at [giscus.app](https://giscus.app/)

### Comments System

**Option 2: Disqus**

```vue
<!-- Add to app/pages/[...slug].vue -->
<div id="disqus_thread" class="mt-16"></div>

<script setup>
onMounted(() => {
  const disqus_config = function () {
    this.page.url = window.location.href
    this.page.identifier = route.path
  }
  
  const d = document, s = d.createElement('script')
  s.src = 'https://YOUR-SHORTNAME.disqus.com/embed.js'
  s.setAttribute('data-timestamp', +new Date())
  (d.head || d.body).appendChild(s)
})
</script>
```

## Environment Variables

### Using .env Files

Create `.env` for local development:

```bash
# .env
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_PUBLIC_SITE_NAME="My Dev Blog"
NUXT_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NUXT_API_SECRET=your-secret-key
```

Access in your app:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: '',  // Private, server-only
    public: {
      siteUrl: '',
      siteName: '',
      googleAnalyticsId: ''
    }
  }
})
```

```vue
<!-- In components -->
<script setup>
const config = useRuntimeConfig()
console.log(config.public.siteName)
</script>
```

> 🔐 [Nuxt Runtime Config docs](https://nuxt.com/docs/guide/going-further/runtime-config)

## Dark Mode

### Simple Toggle Implementation

```vue
<!-- app/components/DarkModeToggle.vue -->
<template>
  <button @click="toggleDark" class="p-2">
    {{ isDark ? '☀️' : '🌙' }}
  </button>
</template>

<script setup>
const isDark = ref(false)

onMounted(() => {
  isDark.value = localStorage.getItem('dark-mode') === 'true'
  updateDarkMode()
})

const toggleDark = () => {
  isDark.value = !isDark.value
  localStorage.setItem('dark-mode', isDark.value)
  updateDarkMode()
}

const updateDarkMode = () => {
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>
```

Update your Tailwind config:

```typescript
// tailwind.config.ts
export default {
  darkMode: 'class',
  // ... rest of config
}
```

## Internationalization (i18n)

### Basic Multi-language Support

```bash
npm install @nuxtjs/i18n
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' },
      { code: 'fr', name: 'Français' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default'
  }
})
```

## Advanced Content Features

### Table of Contents

Add automatic TOC generation:

```vue
<!-- In app/pages/[...slug].vue -->
<script setup>
const { toc } = page.value
</script>

<template>
  <aside v-if="toc && toc.links.length" class="toc">
    <h3>Table of Contents</h3>
    <nav>
      <ul>
        <li v-for="link in toc.links" :key="link.id">
          <a :href="`#${link.id}`">{{ link.text }}</a>
        </li>
      </ul>
    </nav>
  </aside>
</template>
```

### Related Posts

Show related content:

```vue
<script setup>
const { data: relatedPosts } = await useAsyncData('related', () => {
  return queryCollection('content')
    .where({ 
      category: page.value.category,
      _path: { $ne: page.value._path }
    })
    .limit(3)
    .all()
})
</script>
```

## Monitoring & Error Tracking

### Sentry Integration

```bash
npm install @nuxtjs/sentry
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/sentry'],
  sentry: {
    dsn: 'https://your-dsn@sentry.io/project-id',
    config: {
      environment: process.env.NODE_ENV
    }
  }
})
```

## Deployment Optimizations

### Edge Functions

For Vercel/Cloudflare:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    preset: 'vercel-edge',  // or 'cloudflare-pages'
    
    // Edge function config
    vercel: {
      functions: {
        maxDuration: 10
      }
    }
  }
})
```

### CDN Configuration

```typescript
// For Cloudflare
export default defineNuxtConfig({
  nitro: {
    cloudflare: {
      pages: {
        routes: {
          include: ['/*'],
          exclude: ['/api/*']
        }
      }
    }
  }
})
```

## Testing

### Unit Tests with Vitest

```bash
npm install -D @nuxt/test-utils vitest @vue/test-utils
```

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom'
  }
})
```

## Troubleshooting

### Common Issues

**Build Errors:**
```bash
# Clear all caches
rm -rf .nuxt .output node_modules/.cache
npm run build
```

**Type Errors:**
```bash
# Regenerate types
npm run postinstall
```

**Performance Issues:**
- Enable prerendering for static content
- Use `<NuxtImg>` for images
- Lazy load heavy components

> 📚 Full docs: [nuxt.com/docs](https://nuxt.com/docs)

## Next Steps

- [Essential Configuration](/essential-configuration) - The must-do settings
- [Deployment](/deployment) - Deploy your blog
- [Building with Nuxt and Vue](/building-with-nuxt-and-vue) - Understand the codebase

Remember: These are all **optional** enhancements. Your blog works great with just the essential configuration!