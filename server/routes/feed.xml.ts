import { Feed } from 'feed'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

export default defineEventHandler(async (event) => {
  const feed = new Feed({
    title: 'nuxt-blog-starter',
    description: 'A barebones blog setup using Nuxt and Tailwind.',
    id: 'https://nuxtjs-blog-starter.vercel.app',
    link: 'https://nuxtjs-blog-starter.vercel.app',
    language: 'en',
    updated: new Date(),
    feedLinks: {
      rss2: 'https://nuxtjs-blog-starter.vercel.app/feed.xml',
    }
  })

  try {
    const contentDir = join(process.cwd(), 'content')
    const files = await readdir(contentDir)
    const posts = []
    
    // Read all markdown files
    for (const file of files.filter(f => f.endsWith('.md'))) {
      const filePath = join(contentDir, file)
      const fileContent = await readFile(filePath, 'utf-8')
      const { data, content } = matter(fileContent)
      
      posts.push({
        title: data.title || file.replace('.md', ''),
        slug: file.replace('.md', ''),
        description: data.description || '',
        date: data.date || new Date(),
        content: content,
        ...data
      })
    }
    
    // Sort by date, newest first
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    // Add items to feed
    posts.slice(0, 20).forEach(post => {
      feed.addItem({
        title: post.title,
        id: `https://nuxtjs-blog-starter.vercel.app/${post.slug}`,
        link: `https://nuxtjs-blog-starter.vercel.app/${post.slug}`,
        description: post.description,
        content: post.content,
        date: new Date(post.date)
      })
    })
    
  } catch (error) {
    console.error('Error reading content files:', error)
  }

  setHeader(event, 'content-type', 'application/rss+xml')
  return feed.rss2()
})