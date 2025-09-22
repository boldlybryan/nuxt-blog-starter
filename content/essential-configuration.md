---
title: Essential Configuration - The Must-Do Settings
description: The 10 essential settings you need to configure before going live
date: 2025-01-10
author: Template Documentation
---

**Time needed: 10 minutes** ⏱️

These are the essential configurations you **must** update before deploying your blog. Everything else can wait!

## 1. Site Information (2 minutes)

Update `nuxt.config.ts` with your actual information:

```typescript
export default defineNuxtConfig({
  site: {
    url: 'https://yourdomain.com',      // ← Your actual domain
    name: 'Your Blog Name',             // ← Your blog title  
    description: 'Your blog tagline',   // ← Your blog description
    defaultLocale: 'en',                // ← Your language code
  },
```

**Why this matters:** Used for SEO, social sharing, and your RSS feed.

> 📚 [Nuxt Site Config docs](https://nuxt.com/docs/api/configuration/nuxt-config#site)

## 2. RSS Feed Information (2 minutes)

Update `server/routes/feed.xml.ts` lines 10-20:

```typescript
const feed = new Feed({
  title: 'Your Blog Name',              // ← Same as above
  description: 'Your blog tagline',     // ← Same as above
  id: 'https://yourdomain.com',        // ← Your domain
  link: 'https://yourdomain.com',      // ← Your domain
  author: {
    name: 'Your Name',                  // ← Your actual name
    email: 'you@example.com',          // ← Your email (optional)
  }
})
```

**Why this matters:** Powers your RSS feed at `/feed.xml` for subscribers.

## 3. Deploy Button URL (1 minute)

Update `app/components/Header.vue` around line 8:

```vue
'deploy': {
  name: 'deploy',
  path: 'https://vercel.com/new/clone?repository-url=https://github.com/YOUR-USERNAME/YOUR-REPO',
  external: true
}
```

Replace `YOUR-USERNAME/YOUR-REPO` with your GitHub info.

**Why this matters:** Lets others deploy their own copy of your blog.

## 4. Favicon (1 minute)

Replace `public/favicon.ico` with your own icon.

**Quick options:**
- Generate one at [favicon.io](https://favicon.io/)
- Use an emoji: [favicon.io/emoji-favicons](https://favicon.io/emoji-favicons/)
- Keep the default (it's fine for now!)

## 5. robots.txt (1 minute)

Rename `public/_robots.txt` to `public/robots.txt` (remove the underscore) and update:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

**Why this matters:** Helps search engines find and index your content.

## 6. Social Media Meta Tags (2 minutes)

If you want good-looking social shares, add to `nuxt.config.ts`:

```typescript
app: {
  head: {
    meta: [
      { property: 'og:site_name', content: 'Your Blog Name' },
      { name: 'twitter:site', content: '@yourtwitter' },    // ← Optional
    ]
  }
}
```

> 🎨 Test your social cards at [opengraph.xyz](https://www.opengraph.xyz/)

## 7. Content Schema Defaults (1 minute)

In `content.config.ts`, set your default author:

```typescript
schema: z.object({
  // ... other fields ...
  author: z.string().optional().default('Your Name'),  // ← Your name
})
```

**Why this matters:** You won't need to add author to every post.

## 🚀 Pre-Deploy Checklist

Before going live, verify:

- [ ] Site URL is your actual domain (not localhost)
- [ ] Blog name is set in both config files
- [ ] RSS feed has your information
- [ ] Deploy button points to your repo
- [ ] robots.txt is activated (no underscore)

## Testing Your Config

```bash
# Build locally to test
npm run build
npm run preview

# Check these URLs:
# http://localhost:3000/feed.xml - RSS feed
# http://localhost:3000/sitemap.xml - Sitemap
```

## What About...?

**Analytics?** Add them after launch - [see advanced config](/advanced-configuration#analytics--monitoring)

**Fonts?** The default Inter font is great - customize later if needed

**Colors?** Already covered in [quick customization](/quick-customization)

**Images?** Add to `public/images/` as you write posts

## Next Steps

✅ **Config done?** Time to [deploy](/deployment)!

For more advanced settings:
- [Advanced Configuration](/advanced-configuration) - CSP, analytics, performance
- [Customizing Styles](/customizing-styles) - Fonts, dark mode, advanced CSS

---

**Remember:** You can always add more configuration later. The goal is to get your blog live! 🎉