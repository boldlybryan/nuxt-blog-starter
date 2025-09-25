import { generateRSSFeed } from './utils/generateRSSFeed'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxtjs/seo'
  ],
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', preload: true, display: 'swap', weights: [400,600,700] }
    ]
  },
  site: {
    url: 'https://nuxtjs-blog-starter.vercel.app',
    name: 'nuxt-blog-starter',
    description: 'A barebones blog setup using Nuxt and Tailwind.',
    defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
  },
  sitemap: {
    sources: [
      '/api/__sitemap__/urls'
    ]
  },
  content: {
    renderer: {
      anchorLinks: false
    }
  },
  hooks: {
    'nitro:build:before': async () => {
      // Generate RSS feed during build
      await generateRSSFeed()
    }
  }
})