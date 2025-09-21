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
      { name: 'Inter', provider: 'google' }
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
  }
})