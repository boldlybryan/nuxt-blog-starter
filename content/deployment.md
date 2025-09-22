---
title: Deployment Guide
description: Learn how to deploy your blog to various hosting platforms
date: 2025-01-11
author: Template Documentation
---

Ready to share your blog with the world? This guide covers deploying your Nuxt blog to various hosting platforms.

> 🚀 Quick links: [Nuxt deployment guide](https://nuxt.com/docs/getting-started/deployment) | [Hosting providers](https://nuxt.com/deploy)

## Quick Deploy Options

### 1. Vercel (Recommended)
**One-click deployment** using the deploy button in your header.

**Manual Deployment:**
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel automatically detects Nuxt and configures everything
5. Your blog is live in minutes!

> 📖 [Vercel Nuxt guide](https://vercel.com/guides/deploying-nuxt-with-vercel)

**Benefits:**
- Zero configuration required
- Automatic deployments on git push
- Edge network for fast loading
- Built-in analytics and performance monitoring

### 2. Netlify
1. Push your code to GitHub/GitLab
2. Connect your repository at [netlify.com](https://netlify.com)
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.output/public`
4. Deploy!

### 3. GitHub Pages
Add GitHub Actions workflow (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - run: npm ci
      - run: npm run build
      - run: npm run generate
      
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .output/public
```

### 4. Cloudflare Pages
1. Connect your repository
2. Build settings:
   - Build command: `npm run build`
   - Output directory: `.output/public`
3. Deploy

## Pre-Deployment Checklist

### 1. Update Site Configuration
Before deploying, update your site information in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  site: {
    url: 'https://yourdomain.com',           // Your actual domain
    name: 'Your Blog Name',                  // Your blog title
    description: 'Your blog description',    // SEO description
    defaultLocale: 'en',
  },
  // ... rest of config
})
```

### 2. Update RSS Feed URLs
Check `server/routes/feed.xml.ts` and update URLs:

```typescript
const feed = new Feed({
  title: 'Your Blog Name',
  description: 'Your blog description',
  id: 'https://yourdomain.com',
  link: 'https://yourdomain.com',
  feedLinks: {
    rss2: 'https://yourdomain.com/feed.xml',
  }
})
```

### 3. Update Social Links
Update GitHub and other links in your templates:

```vue
<!-- app/pages/index.vue -->
<NuxtLink to="https://github.com/yourusername/your-repo" class="underline">
  GitHub
</NuxtLink>
```

### 4. Add Favicon
Replace `public/favicon.ico` with your own favicon.

### 5. Create robots.txt
Update `public/_robots.txt` (remove the underscore to activate):

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

## Environment Variables

### For Dynamic Configuration
Create `.env` file for local development:

```bash
NUXT_SITE_URL=http://localhost:3000
NUXT_SITE_NAME=My Blog
```

Update `nuxt.config.ts` to use environment variables:

```typescript
export default defineNuxtConfig({
  site: {
    url: process.env.NUXT_SITE_URL || 'https://yourdomain.com',
    name: process.env.NUXT_SITE_NAME || 'Your Blog',
  },
})
```

### Platform-Specific Variables

**Vercel:**
Set in dashboard under Project Settings → Environment Variables

**Netlify:**
Set in Site Settings → Environment Variables

**GitHub Pages:**
Set in repository Settings → Secrets and Variables → Actions

## Custom Domain Setup

### 1. Domain Configuration
Most platforms require:
1. Add your custom domain in platform settings
2. Update DNS records to point to platform servers
3. Wait for DNS propagation (can take 24-48 hours)

### 2. SSL Certificates
All recommended platforms provide automatic SSL certificates for custom domains.

## Build Optimization

### 1. Static Generation
For better performance, consider static generation:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/feed.xml']
    }
  }
})
```

### 2. Image Optimization
Install and configure Nuxt Image:

```bash
npm install @nuxt/image
```

```typescript
// nuxt.config.ts
modules: [
  '@nuxt/image',
  // ... other modules
]
```

### 3. Performance Monitoring
Add analytics if needed:

```typescript
// For Google Analytics
modules: [
  '@nuxtjs/google-analytics',
  // ... other modules
],
googleAnalytics: {
  id: 'GA_MEASUREMENT_ID'
}
```

## Troubleshooting Common Issues

### Build Errors

**Node Version Issues:**
Ensure you're using Node 18+ in your deployment platform.

**Dependency Issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors:**
```bash
# Generate Nuxt types
npm run postinstall
```

### Runtime Errors

**404 Errors:**
- Check your `[...slug].vue` route is correctly configured
- Ensure content files have proper frontmatter

**Font Loading Issues:**
- Verify font configuration in `nuxt.config.ts`
- Check network connectivity to Google Fonts

**RSS Feed Issues:**
- Update all URLs to use your production domain
- Test feed at `/feed.xml` after deployment

### Performance Issues

**Slow Loading:**
- Enable static generation where possible
- Optimize images before uploading
- Use a CDN for assets

**Large Bundle Size:**
- Review and remove unused dependencies
- Consider code splitting for large components

## Deployment Best Practices

### 1. Branch Strategy
- Use `main` branch for production
- Test in `staging` branch before merging
- Use pull requests for code review

### 2. Automated Testing
Add basic tests before deployment:

```json
// package.json
{
  "scripts": {
    "test": "npm run lint && npm run typecheck",
    "lint": "nuxt lint",
    "typecheck": "nuxt typecheck"
  }
}
```

### 3. Content Workflow
- Preview content changes locally before publishing
- Use draft posts for work-in-progress content
- Keep content backups in version control

### 4. Monitoring
- Set up uptime monitoring
- Monitor Core Web Vitals
- Check RSS feed regularly
- Monitor broken links

## Platform Comparison

| Platform | Setup | Auto Deploy | Custom Domain | SSL | Analytics |
|----------|-------|-------------|---------------|-----|-----------|
| Vercel | ⭐⭐⭐ | ✅ | ✅ | ✅ | ✅ |
| Netlify | ⭐⭐⭐ | ✅ | ✅ | ✅ | ✅ |
| Cloudflare | ⭐⭐ | ✅ | ✅ | ✅ | ✅ |
| GitHub Pages | ⭐ | ✅ | ✅ | ✅ | ❌ |

## Post-Deployment

### 1. SEO Setup
- Submit sitemap to Google Search Console
- Set up Google Analytics or similar
- Verify social media sharing works correctly

### 2. Content Migration
If migrating from another platform:
- Set up redirects for old URLs
- Update internal links
- Preserve publication dates

### 3. Performance Testing
- Test on mobile devices
- Check loading speeds with tools like PageSpeed Insights
- Verify all features work in production

## Next Steps

- [Site Configuration](/site-configuration) - Fine-tune your settings
- [Getting Started](/getting-started) - Review the basics
- [Customizing Styles](/customizing-styles) - Polish your design

Your blog is now live! Share your URL and start building your audience.