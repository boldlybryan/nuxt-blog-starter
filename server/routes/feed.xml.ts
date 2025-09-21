import { Feed } from 'feed'
import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const feed = new Feed({
    title: 'nuxt-blog-starter',
    description: 'A barebones blog setup using Nuxt and Tailwind.',
    id: 'https://nuxtjs-blog-starter.vercel.app',
    link: 'https://nuxtjs-blog-starter.vercel.app',
    language: 'en',
    updated: new Date(),
    copyright: 'MIT Licensed',
    feedLinks: {
      rss2: 'https://nuxtjs-blog-starter.vercel.app/feed.xml',
    }
  })

  try {
    // Query content using the proper API that works in production
    const posts = await queryCollection(event, 'content')
      .where('draft', '=', false)
      .order('date', 'DESC')
      .limit(20)
      .all()

    // Add items to feed
    posts.forEach((post: any) => {
      // Use path property like the blog page does
      const path = post.path || post._path || post._id || ''
      const title = post.title || path.split('/').pop()?.replace(/-/g, ' ') || 'Untitled'
      
      // Extract text content from the body
      let content = ''
      if (post.body) {
        // Handle different body formats
        if (typeof post.body === 'string') {
          content = post.body
        } else if (post.body.children) {
          const extractText = (nodes: any[]): string => {
            return nodes.map((node: any) => {
              if (node.type === 'text') return node.value || ''
              if (node.type === 'element' && node.children) return extractText(node.children)
              if (node.children) return extractText(node.children)
              return ''
            }).join(' ').trim()
          }
          content = extractText(post.body.children)
        }
      }
      
      // Ensure path is a valid URL path
      const urlPath = path && path !== '' ? (path.startsWith('/') ? path : `/${path}`) : `/${post.title?.replace(/\s+/g, '-').toLowerCase() || 'untitled'}`
      
      feed.addItem({
        title,
        id: `https://nuxtjs-blog-starter.vercel.app${urlPath}`,
        link: `https://nuxtjs-blog-starter.vercel.app${urlPath}`,
        description: post.description || '',
        content: content || post.description || '',
        date: post.date ? new Date(post.date) : new Date()
      })
    })
    
  } catch (error) {
    console.error('Error generating RSS feed:', error)
  }

  setHeader(event, 'content-type', 'application/rss+xml')
  return feed.rss2()
})