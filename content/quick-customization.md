---
title: Quick Customization - 5 Minutes to Your Blog
description: The fastest way to make this blog yours - change these 5 things and you're ready to go!
date: 2025-01-09
author: Template Documentation
---

**Time needed: 5 minutes** ⏱️

Just cloned this template? Here's exactly what you need to change to make it yours. No deep diving into configs - just the essentials!

## 1. Change Your Blog Name (30 seconds)

Open `nuxt.config.ts` and change line 5:

```typescript
export default defineNuxtConfig({
  site: {
    url: 'http://localhost:3000',
    name: 'My Awesome Blog', // ← Change this!
    description: 'A blog about my adventures in web development', // ← And this!
    defaultLocale: 'en',
  },
```

**What this does:** Updates your blog title everywhere - browser tabs, SEO, RSS feed.

> 📚 [Learn more about Nuxt configuration](https://nuxt.com/docs/api/configuration/nuxt-config)

## 2. Update Your Deploy Button (1 minute)

Open `app/components/Header.vue` and find the deploy button URL around line 8:

```vue
'deploy': {
  name: 'deploy',
  path: 'https://vercel.com/new/clone?repository-url=https://github.com/YOUR-USERNAME/YOUR-REPO-NAME',
  external: true
}
```

Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with your GitHub info.

**What this does:** Lets others deploy their own copy of your customized template!

## 3. Pick Your Brand Color (1 minute)

Open `tailwind.config.ts` and pick a color from [Tailwind's palette](https://tailwindcss.com/docs/customizing-colors):

```typescript
import colors from 'tailwindcss/colors'

export default {
  theme: {
    extend: {
      colors: {
        primary: colors.purple, // ← Try: emerald, rose, amber, cyan, etc.
      }
    }
  }
}
```

**Popular choices:**
- `colors.emerald` - Fresh and modern
- `colors.purple` - Creative and unique
- `colors.rose` - Warm and friendly
- `colors.slate` - Professional and minimal

## 4. Add Your Info to RSS Feed (1 minute)

Open `server/routes/feed.xml.ts` and update lines 10-16:

```typescript
const feed = new Feed({
  title: 'My Awesome Blog', // ← Your blog name
  description: 'A blog about my adventures', // ← Your tagline
  id: 'http://localhost:3000',
  link: 'http://localhost:3000',
  language: 'en',
  favicon: 'http://localhost:3000/favicon.ico',
  author: {
    name: 'Your Name', // ← Your actual name
    email: 'you@example.com', // ← Your email (optional)
  }
})
```

## 5. Delete the Demo Posts (30 seconds)

Remove these example files:
- `content/2025/09/mary-had-a-little-lamb.md`
- `content/2025/09/quick-brown-fox.md`

Keep the documentation posts - they're helpful!

## 🎉 That's It! You're Ready to Blog!

Your blog now has:
- ✅ Your blog name and description
- ✅ Your brand colors
- ✅ Your author info
- ✅ A clean slate for your content

## What's Next?

### Start Writing
Create your first post:
```bash
# Create a new file like:
content/2025/01/my-first-post.md
```

With this content:
```markdown
---
title: My First Post
description: Welcome to my new blog!
date: 2025-01-15
---

# Hello World!

This is my first post on my new blog...
```

### Deploy Your Blog
1. Push your changes to GitHub
2. Click the "Deploy" button in your header
3. Your blog is live in 2 minutes!

### Learn More
- [Writing in Markdown](/organizing-content) - Format your posts
- [Customizing Styles](/customizing-styles) - Go beyond colors
- [Full Site Configuration](/site-configuration) - Advanced options

## Common Questions

**Q: How do I change the font?**  
A: Check out the [Customizing Styles guide](/customizing-styles#typography) - it's a 2-minute change!

**Q: Can I add a logo?**  
A: Yes! Add your logo to `public/` and update the Header component. [Vue docs on images](https://vuejs.org/guide/essentials/template-syntax.html#attribute-bindings)

**Q: How do I add pages like About or Contact?**  
A: Super easy! See [Creating New Pages](/creating-pages). Just create a `.vue` file in `app/pages/`.

---

**Remember:** This is YOUR blog now. Don't be afraid to experiment and make it unique! 🚀