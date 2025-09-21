---
title: Customizing Styles
description: Learn how to customize the design and make this template uniquely yours
date: 2025-01-13
author: Template Documentation
---

This template uses Tailwind CSS for styling, making it easy to customize the design. Here's how to make it uniquely yours.

## Understanding the Stack

- **Tailwind CSS**: Utility-first CSS framework
- **Inter Font**: Loaded via Nuxt Fonts from Google Fonts
- **Responsive Design**: Mobile-first approach
- **Clean Typography**: Optimized for readability

## Quick Style Changes

### 1. Colors
Update the primary color in `tailwind.config.ts`:

```typescript
import colors from 'tailwindcss/colors'

export default {
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,  // Change from blue to emerald
        // Or use custom colors
        primary: {
          50: '#f0fdf4',
          500: '#10b981',
          900: '#064e3b',
        }
      }
    }
  }
}
```

### 2. Typography
The template uses Inter font by default. To change it:

**Option 1: Different Google Font**
```typescript
// nuxt.config.ts
fonts: {
  families: [
    { name: 'Roboto', provider: 'google', display: 'swap' }
  ]
}

// tailwind.config.ts
fontFamily: {
  sans: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
}
```

**Option 2: System Fonts Only**
```typescript
// tailwind.config.ts
fontFamily: {
  sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
}
```

### 3. Layout Width
Change the max width in `app/layouts/default.vue`:

```vue
<!-- Current: max-w-xl (576px) -->
<div class="max-w-xl mx-auto p-3">

<!-- Wider: max-w-4xl (896px) -->
<div class="max-w-4xl mx-auto p-3">

<!-- Full width with constraints -->
<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
```

## Component Customization

### Header Navigation
Customize the header in `app/components/Header.vue`:

```vue
<template>
  <header class="pt-4 border-b border-gray-200">
    <nav class="flex justify-between items-center">
      <div class="flex gap-3">
        <!-- Your navigation links -->
      </div>
      <div>
        <!-- Add search, theme toggle, etc. -->
      </div>
    </nav>
  </header>
</template>
```

### Blog Post Lists
Style the post listings in `app/pages/index.vue` and `app/pages/blog.vue`:

```vue
<!-- Add featured post styling -->
<NuxtLink 
  v-for="page in pages" 
  :key="page.path" 
  :to="page.path" 
  class="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
>
  <div class="mb-2">
    <h2 class="text-xl font-semibold text-gray-900">{{ page.title }}</h2>
    <p class="text-gray-600 mt-1">{{ page.description }}</p>
  </div>
  <div class="text-sm text-gray-500">{{ page.date }}</div>
</NuxtLink>
```

### Individual Post Pages
Customize post content in `app/pages/[...slug].vue`:

```vue
<template>
  <article class="max-w-none">
    <header class="mb-8">
      <h1 class="text-4xl font-bold tracking-tight mb-4">{{ page.title }}</h1>
      <div class="flex items-center gap-4 text-sm text-gray-600">
        <time>{{ formatDate(page.date) }}</time>
        <span>•</span>
        <span>{{ page.author }}</span>
      </div>
    </header>
    <ContentRenderer :value="page" class="prose prose-gray max-w-none"/>
  </article>
</template>
```

## Advanced Customization

### 1. Custom CSS Classes
Add custom styles in your component `<style>` sections:

```vue
<style scoped>
.custom-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.glass-effect {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>
```

### 2. Dark Mode
Add dark mode support:

```typescript
// tailwind.config.ts
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  // ... rest of config
}
```

```vue
<!-- In your layout -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <!-- Your content -->
</div>
```

### 3. Content Styling
Enhance markdown content rendering by adding Tailwind Typography:

```bash
npm install @tailwindcss/typography
```

```typescript
// tailwind.config.ts
module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

```vue
<!-- Apply prose classes to content -->
<ContentRenderer :value="page" class="prose prose-gray lg:prose-xl"/>
```

### 4. Custom Components
Create reusable components in `app/components/`:

```vue
<!-- app/components/BlogCard.vue -->
<template>
  <article class="bg-white rounded-lg shadow-sm overflow-hidden">
    <img v-if="image" :src="image" :alt="title" class="w-full h-48 object-cover">
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
      <p class="text-gray-600 mb-4">{{ description }}</p>
      <div class="flex justify-between items-center text-sm text-gray-500">
        <time>{{ date }}</time>
        <span>{{ readTime }}</span>
      </div>
    </div>
  </article>
</template>
```

## Responsive Design

The template is mobile-first. Customize breakpoints:

```vue
<!-- Mobile: default -->
<!-- Tablet: sm: (640px+) -->
<!-- Desktop: lg: (1024px+) -->

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Responsive grid -->
</div>
```

## Performance Tips

### 1. CSS Purging
Tailwind automatically removes unused CSS in production.

### 2. Font Loading
Fonts are optimized with `display: swap` for better performance.

### 3. Image Optimization
For better performance, consider using Nuxt Image:

```bash
npm install @nuxt/image
```

```vue
<NuxtImg src="/images/hero.jpg" alt="Hero image" />
```

## Theme Examples

### Minimal Blog
```css
/* Focus on typography and whitespace */
.minimal-theme {
  @apply bg-white text-gray-900;
  @apply font-light leading-relaxed;
}
```

### Dark Tech Blog
```css
.dark-tech-theme {
  @apply bg-gray-900 text-green-400;
  @apply font-mono;
}
```

### Creative Portfolio
```css
.creative-theme {
  @apply bg-gradient-to-br from-purple-400 to-pink-400;
  @apply text-white;
}
```

## Next Steps

- [Creating New Pages](/creating-pages) - Add custom pages
- [Site Configuration](/site-configuration) - Update branding
- [Deployment](/deployment) - Go live with your styled blog

Ready to make this template your own? Start by updating the colors and typography to match your brand!