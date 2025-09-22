---
title: Troubleshooting Common Issues
description: Quick fixes for common Nuxt and Vue problems you might encounter
date: 2025-01-08
author: Template Documentation
---

Hit a snag? Here are solutions to the most common issues new Nuxt/Vue users encounter.

## 🔴 Error Messages

### "Cannot find module" or "Module not found"

**Problem:** Missing dependencies or import errors

**Solutions:**
```bash
# 1. Install missing dependencies
npm install

# 2. If that doesn't work, clear cache
rm -rf node_modules package-lock.json
npm install

# 3. For specific modules
npm install [module-name]
```

### "Hydration mismatch" warnings

**Problem:** Server and client render differently

**Common causes & fixes:**
```vue
<!-- ❌ Bad: Random values -->
<div>{{ Math.random() }}</div>

<!-- ✅ Good: Use ClientOnly for client-side content -->
<ClientOnly>
  <div>{{ Math.random() }}</div>
</ClientOnly>

<!-- ✅ Or disable SSR for specific pages -->
<script setup>
definePageMeta({
  ssr: false
})
</script>
```

> 📚 [Understanding hydration](https://vuejs.org/guide/scaling-up/ssr.html#hydration)

### "Failed to fetch dynamically imported module"

**Problem:** Vite can't load a module after changes

**Solution:**
```bash
# Hard refresh your browser
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R

# If persists, restart dev server
npm run dev
```

## 🎨 Styling Issues

### Tailwind classes not working

**Problem:** Classes aren't being applied

**Solutions:**
```vue
<!-- ❌ Bad: Dynamic classes -->
<div :class="`text-${color}-500`">

<!-- ✅ Good: Full class names -->
<div :class="color === 'red' ? 'text-red-500' : 'text-blue-500'">

<!-- ✅ Or define all possible classes -->
<!-- This ensures Tailwind includes them -->
<script>
// Somewhere in your code
const colors = {
  red: 'text-red-500',
  blue: 'text-blue-500'
}
</script>
```

**Always restart after config changes:**
```bash
# After editing tailwind.config.ts
npm run dev
```

### Fonts not loading

**Problem:** Custom fonts aren't showing

**Check these:**
1. Font name matches exactly in `nuxt.config.ts` and `tailwind.config.ts`
2. Clear browser cache
3. Check Network tab for font loading errors

```typescript
// nuxt.config.ts
fonts: {
  families: [
    { name: 'Inter', provider: 'google' }  // Must match below
  ]
}

// tailwind.config.ts
fontFamily: {
  sans: ['Inter', 'sans-serif']  // Must match above
}
```

## 📄 Content Issues

### Blog posts not showing up

**Problem:** New markdown files aren't appearing

**Checklist:**
```markdown
---
title: Required Field        ✓ Must have
description: Optional
date: 2025-01-20
draft: false                ✓ Not set to true
---

Content must be after frontmatter
```

**Debug steps:**
```vue
<!-- Add to app/pages/index.vue temporarily -->
<script setup>
const { data: pages } = await useAsyncData('all-pages', () => {
  return queryCollection('content').all()
})

// Debug: Log all found content
console.log('Found pages:', pages.value)
</script>
```

### Images not displaying

**Problem:** Images return 404

**Solutions:**
```markdown
<!-- ❌ Wrong paths -->
![](../images/photo.jpg)
![](/content/images/photo.jpg)

<!-- ✅ Correct: Put images in public/ -->
![](/images/photo.jpg)
```

Images must be in `public/` directory:
```
public/
  images/
    photo.jpg     → accessible at /images/photo.jpg
```

## ⚡ Performance Issues

### Dev server is slow

**Problem:** Pages load slowly in development

**Solutions:**
```bash
# 1. Clear Nuxt cache
rm -rf .nuxt

# 2. Disable SSR for development
# In nuxt.config.ts
export default defineNuxtConfig({
  ssr: false,  // Dev only!
})

# 3. Check for large images
# Optimize images over 200KB
```

### Build fails

**Problem:** `npm run build` errors

**Common fixes:**
```bash
# 1. Check Node version (needs 18+)
node --version

# 2. Clear all caches
rm -rf .nuxt .output node_modules/.cache

# 3. Type errors? Generate types
npm run postinstall

# 4. Memory issues? Increase Node memory
NODE_OPTIONS='--max-old-space-size=4096' npm run build
```

## 🔧 Vue-Specific Issues

### "Cannot access before initialization"

**Problem:** Using variables before they're defined

```vue
<!-- ❌ Bad -->
<script setup>
console.log(myVar)  // Error!
const myVar = 'hello'
</script>

<!-- ✅ Good -->
<script setup>
const myVar = 'hello'
console.log(myVar)  // Works
</script>
```

### Reactivity not working

**Problem:** Data changes but UI doesn't update

```vue
<!-- ❌ Bad: Modifying object properties -->
<script setup>
const user = { name: 'John' }
user.name = 'Jane'  // Won't trigger update
</script>

<!-- ✅ Good: Use reactive or ref -->
<script setup>
import { reactive, ref } from 'vue'

// For objects
const user = reactive({ name: 'John' })
user.name = 'Jane'  // Will update

// For primitives
const name = ref('John')
name.value = 'Jane'  // Will update
</script>
```

> 🔍 [Vue Reactivity guide](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)

## 🚀 Deployment Issues

### "404 Not Found" in production

**Problem:** Routes work locally but not when deployed

**For dynamic routes, ensure prerendering:**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true  // Finds and prerenders all pages
    }
  }
})
```

### Environment variables not working

**Problem:** Config works locally but not in production

```typescript
// ❌ Bad: Direct process.env access
const apiUrl = process.env.API_URL

// ✅ Good: Use runtimeConfig
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'default'
    }
  }
})

// In components
const config = useRuntimeConfig()
console.log(config.public.apiUrl)
```

## 🆘 Getting Help

### Before asking for help:

1. **Check the console** (F12 in browser)
2. **Read the full error message**
3. **Google the exact error**
4. **Try solutions in this guide**

### Where to get help:

- **Nuxt Discord**: [discord.nuxt.com](https://discord.nuxt.com) (very active!)
- **Vue Discord**: [discord.vuejs.org](https://discord.vuejs.org)
- **Stack Overflow**: Tag with `nuxt3` and `vue.js`
- **GitHub Issues**: For bug reports

### How to ask for help:

```markdown
**What I'm trying to do:**
[Describe your goal]

**What's happening instead:**
[Error message or unexpected behavior]

**What I've tried:**
- Solution 1
- Solution 2

**Minimal reproduction:**
[Link to CodeSandbox or repo]
```

## 💡 Pro Tips

1. **Always check the browser console first**
2. **Restart dev server after config changes**
3. **Clear caches when things get weird**
4. **Read error messages carefully - they usually tell you exactly what's wrong**
5. **Keep dependencies updated**: `npm update`

---

**Still stuck?** The Nuxt and Vue communities are friendly and helpful. Don't hesitate to ask for help! 🤝