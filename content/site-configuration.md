---
title: Site Configuration
description: Learn how to configure your blog's metadata, SEO, and global settings
date: 2025-01-10
author: Template Documentation
---

Customize your blog's identity, SEO settings, and global configuration to make it uniquely yours.

## Core Site Settings

### Basic Information
Update your site details in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  site: {
    url: 'https://yourdomain.com',
    name: 'Your Blog Name',
    description: 'A compelling description of your blog that appears in search results',
    defaultLocale: 'en',
  },
  // ... rest of configuration
})
```

**Key Settings:**
- `url`: Your production domain (used for SEO and RSS feeds)
- `name`: Blog title (appears in browser tabs and search results)
- `description`: Meta description for SEO
- `defaultLocale`: Language code for international SEO

### Sitemap Configuration
The sitemap is automatically generated, but you can customize it:

```typescript
export default defineNuxtConfig({
  sitemap: {
    sources: [
      '/api/__sitemap__/urls'  // Dynamic content URLs
    ],
    exclude: [
      '/admin/**',             // Exclude admin pages
      '/draft/**'              // Exclude draft content
    ]
  }
})
```

## SEO Configuration

### Global Meta Tags
Set default meta tags that apply to all pages:

```typescript
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'author', content: 'Your Name' },
        { name: 'theme-color', content: '#ffffff' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Your Blog Name' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@yourusername' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
```

### Social Media Integration
Configure Open Graph and Twitter Card settings:

```typescript
// In individual pages or posts
useHead({
  meta: [
    { property: 'og:title', content: 'Page Title' },
    { property: 'og:description', content: 'Page description' },
    { property: 'og:image', content: '/images/social-share.jpg' },
    { property: 'og:url', content: 'https://yourdomain.com/page' },
    { name: 'twitter:title', content: 'Page Title' },
    { name: 'twitter:description', content: 'Page description' },
    { name: 'twitter:image', content: '/images/social-share.jpg' }
  ]
})
```

## RSS Feed Configuration

### Basic Feed Settings
Update RSS feed information in `server/routes/feed.xml.ts`:

```typescript
const feed = new Feed({
  title: 'Your Blog Name',
  description: 'Your blog description',
  id: 'https://yourdomain.com',
  link: 'https://yourdomain.com',
  language: 'en',
  image: 'https://yourdomain.com/images/logo.png',
  favicon: 'https://yourdomain.com/favicon.ico',
  copyright: 'Copyright © 2025 Your Name',
  updated: new Date(),
  feedLinks: {
    rss2: 'https://yourdomain.com/feed.xml',
    json: 'https://yourdomain.com/feed.json',
    atom: 'https://yourdomain.com/feed.atom'
  },
  author: {
    name: 'Your Name',
    email: 'your.email@example.com',
    link: 'https://yourdomain.com'
  }
})
```

### Custom Feed Content
Customize what appears in your RSS feed:

```typescript
// In feed.xml.ts
posts.forEach((post) => {
  feed.addItem({
    title: post.title,
    id: `https://yourdomain.com${post.path}`,
    link: `https://yourdomain.com${post.path}`,
    description: post.description || '',
    content: extractContent(post.body),
    author: [{
      name: post.author || 'Your Name',
      email: 'your.email@example.com',
      link: 'https://yourdomain.com'
    }],
    date: post.date ? new Date(post.date) : new Date(),
    category: post.category ? [{ name: post.category }] : []
  })
})
```

## Content Configuration

### Content Schema
Customize content validation in `content.config.ts`:

```typescript
export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string().optional(),
        author: z.string().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        featured: z.boolean().optional().default(false),
        draft: z.boolean().optional().default(false),
        image: z.string().optional(),
        readTime: z.string().optional()
      })
    })
  }
})
```

### Content Defaults
Set default values for new content:

```typescript
// In content.config.ts schema
draft: z.boolean().optional().default(false),
author: z.string().optional().default('Your Name'),
category: z.string().optional().default('General')
```

## Font Configuration

### Google Fonts
Customize fonts in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', display: 'swap', preload: true },
      { name: 'JetBrains Mono', provider: 'google', display: 'swap' } // For code
    ],
    defaults: {
      weights: [400, 500, 600, 700],
      subsets: ['latin'],
      fallbacks: {
        'sans-serif': ['Inter'],
        'monospace': ['JetBrains Mono']
      }
    }
  }
})
```

### Local Fonts
Use self-hosted fonts:

```typescript
fonts: {
  families: [
    {
      name: 'CustomFont',
      provider: 'local',
      src: '/fonts/custom-font.woff2'
    }
  ]
}
```

## Styling Configuration

### Tailwind Customization
Update your brand colors in `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f9fafb',
          500: '#6b7280',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
          },
        },
      },
    }
  }
}
```

## Analytics & Monitoring

### Google Analytics
Add Google Analytics:

```bash
npm install @nuxtjs/google-analytics
```

```typescript
// nuxt.config.ts
modules: [
  '@nuxtjs/google-analytics'
],
googleAnalytics: {
  id: 'GA_MEASUREMENT_ID'
}
```

### Plausible Analytics (Privacy-friendly alternative)
```typescript
modules: [
  '@nuxtjs/plausible'
],
plausible: {
  domain: 'yourdomain.com'
}
```

## Security Configuration

### Content Security Policy
Add CSP headers:

```typescript
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Content-Security-Policy': "default-src 'self'; font-src 'self' fonts.gstatic.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com;"
        }
      }
    }
  }
})
```

### robots.txt
Create `public/robots.txt`:

```
User-agent: *
Allow: /

# Block admin or sensitive areas
Disallow: /admin/
Disallow: /api/

Sitemap: https://yourdomain.com/sitemap.xml
```

## Performance Configuration

### Preloading & Optimization
```typescript
export default defineNuxtConfig({
  experimental: {
    payloadExtraction: false // Reduce bundle size
  },
  nitro: {
    compressPublicAssets: true,
    minify: true
  }
})
```

### Image Optimization
```typescript
modules: [
  '@nuxt/image'
],
image: {
  quality: 80,
  format: ['webp', 'jpg'],
  screens: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536
  }
}
```

## Environment-Specific Configuration

### Development vs Production
```typescript
export default defineNuxtConfig({
  site: {
    url: process.env.NODE_ENV === 'production' 
      ? 'https://yourdomain.com' 
      : 'http://localhost:3000'
  },
  
  // Development-only features
  ...(process.env.NODE_ENV === 'development' && {
    devtools: { enabled: true },
    ssr: false // For faster development
  })
})
```

### Environment Variables
Create `.env` file:

```bash
# Site configuration
NUXT_SITE_URL=https://yourdomain.com
NUXT_SITE_NAME=Your Blog Name

# Analytics
NUXT_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# API keys (if needed)
NUXT_CONTACT_API_KEY=your-api-key
```

Use in configuration:

```typescript
export default defineNuxtConfig({
  site: {
    url: process.env.NUXT_SITE_URL,
    name: process.env.NUXT_SITE_NAME,
  },
  runtimeConfig: {
    contactApiKey: process.env.NUXT_CONTACT_API_KEY,
    public: {
      googleAnalyticsId: process.env.NUXT_GOOGLE_ANALYTICS_ID
    }
  }
})
```

## Testing Your Configuration

### Local Testing
```bash
# Test build process
npm run build

# Test in production mode
npm run preview

# Check for TypeScript errors
npm run typecheck
```

### SEO Testing
- Test social sharing with [OpenGraph.xyz](https://www.opengraph.xyz/)
- Validate RSS feed with [W3C Feed Validator](https://validator.w3.org/feed/)
- Check mobile-friendliness with [Google's Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

## Configuration Checklist

Before deploying, ensure you've updated:

- [ ] Site URL and name in `nuxt.config.ts`
- [ ] RSS feed URLs in `server/routes/feed.xml.ts`
- [ ] Social media links in templates
- [ ] Author information in content schema
- [ ] Favicon and social sharing images
- [ ] robots.txt file
- [ ] Analytics tracking ID (if using)
- [ ] Contact information and links

## Next Steps

- [Deployment](/deployment) - Deploy your configured blog
- [Getting Started](/getting-started) - Review the basics
- [Customizing Styles](/customizing-styles) - Fine-tune your design

Your blog is now properly configured and ready to represent your brand!