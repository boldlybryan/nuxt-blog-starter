---
title: Getting Started with Your Nuxt Blog
description: Get your blog running in 2 minutes, then make it yours in 5 more
date: 2025-01-15
author: Template Documentation
---

**Time to first post: 7 minutes** ⏱️

This template gives you a complete blog built with [Nuxt 4](https://nuxt.com), [Vue 3](https://vuejs.org), and [Tailwind CSS](https://tailwindcss.com). Let's get you up and running!

## 🚀 Start Here (2 minutes)

### 1. Get the Code

**Option A: Deploy to Vercel** (Recommended)
- Click the "Deploy" button in the header
- Follow Vercel's prompts
- Your blog is live in 2 minutes!

**Option B: Local Development**
```bash
# Clone the repository
git clone [your-repo-url]
cd nuxt-blog-starter

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - your blog is running!

### 2. Make It Yours (5 minutes)

**Essential changes to make right now:**

📋 **[Follow the Quick Customization Guide](/quick-customization)** - Changes your blog name, colors, and author info in 5 minutes

Or manually update these files:

**Change your blog name:**
- `nuxt.config.ts` → Update `site.name` and `site.description`
- `server/routes/feed.xml.ts` → Update feed title and author

**Pick your color:**
- `tailwind.config.ts` → Change `primary: colors.blue` to any [Tailwind color](https://tailwindcss.com/docs/customizing-colors)

**Update deploy button:**
- `app/components/Header.vue` → Update the Vercel URL with your repo

## 📝 Write Your First Post (3 minutes)

1. Create a new file: `content/2025/01/hello-world.md`

2. Paste this template:
```markdown
---
title: Hello World!
description: My first post on my new blog
date: 2025-01-20
---

# Hello World!

Welcome to my blog! I'm excited to share my thoughts on web development, 
specifically working with **Vue** and **Nuxt**.

## What I'll Write About

- Building modern web apps
- Tips and tricks I learn
- Project showcases

Stay tuned for more!
```

3. Save and refresh - your post appears instantly!

## 📁 What's What (Quick Tour)

```
Your blog has 6 main folders:

content/          → Your blog posts (Markdown files)
app/pages/        → Page routes (homepage, blog, etc.)
app/components/   → Reusable parts (Header, etc.)
public/           → Images and static files
server/           → RSS feed and API routes
```

**Key files to know:**
- `nuxt.config.ts` - Main configuration ([Nuxt docs](https://nuxt.com/docs/api/configuration/nuxt-config))
- `tailwind.config.ts` - Style configuration ([Tailwind docs](https://tailwindcss.com/docs/configuration))
- `app/pages/index.vue` - Your homepage ([Vue docs](https://vuejs.org/guide/introduction.html))

## ✨ Features You Get

All of this works out of the box:

- ✅ **SEO Ready** - Meta tags, sitemap.xml, robots.txt
- ✅ **RSS Feed** - Available at `/feed.xml`
- ✅ **Fast** - Static generation, optimized images
- ✅ **Markdown** - With code highlighting
- ✅ **Responsive** - Looks great on all devices
- ✅ **Deploy Ready** - Works on Vercel, Netlify, etc.

## 🎯 Next Steps

**Now:** 
- Delete the example posts in `content/2025/01/`
- Write your first real post
- Push to GitHub and deploy

**This Week:**
- [Customize your styles](/customizing-styles) - Make it match your brand
- [Add an About page](/creating-pages) - Tell readers about yourself
- [Configure SEO](/site-configuration) - Set up your metadata

**Later:**
- Learn [how this blog works](/building-with-nuxt-and-vue)
- Explore advanced [Nuxt features](https://nuxt.com/docs)
- Join the [Nuxt Discord](https://discord.com/invite/ps2h6QT)

## 🤔 Stuck?

- **Check the console** - Press F12 in your browser
- **Read error messages** - Nuxt has helpful errors
- **Ask for help** - The Vue/Nuxt community is friendly!

Common issues:
- If styles look wrong, restart the dev server
- If pages 404, check your file names (use kebab-case)
- If deploys fail, check Node version (needs 18+)

---

**Ready?** Go write your first post! Remember, the best blog is one that gets published. You can always customize more later. 🚀