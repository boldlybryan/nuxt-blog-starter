import { queryCollection } from '@nuxt/content/server'

export default defineSitemapEventHandler(async (event) => {
  try {
    const posts = await queryCollection(event, 'content').all()
    
    return posts.map((post: any) => ({
      loc: post.path || post._path || `/${post.title?.replace(/\s+/g, '-').toLowerCase() || 'untitled'}`,
      lastmod: post.date ? new Date(post.date) : new Date()
    }))
  } catch (error) {
    console.error('Error generating sitemap URLs:', error)
    return []
  }
})