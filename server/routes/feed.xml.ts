import { Feed } from 'feed'
import { readdir, readFile, stat } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

async function getAllMarkdownFiles(dir) {
  const files = []
  
  async function traverse(currentDir) {
    const entries = await readdir(currentDir)
    
    for (const entry of entries) {
      const fullPath = join(currentDir, entry)
      const stats = await stat(fullPath)
      
      if (stats.isDirectory()) {
        await traverse(fullPath) // Recurse into subdirectories
      } else if (entry.endsWith('.md')) {
        files.push(fullPath)
      }
    }
  }
  
  await traverse(dir)
  return files
}

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
    const contentDir = join(process.cwd(), 'content')
    const markdownFiles = await getAllMarkdownFiles(contentDir)
    const posts = []
    
    // Read all markdown files
    for (const filePath of markdownFiles) {
      const fileContent = await readFile(filePath, 'utf-8')
      const { data, content } = matter(fileContent)
      
      // Extract the relative path from the full file path
      const relativePath = filePath.replace(contentDir + '/', '').replace('.md', '')
      const fileName = filePath.split('/').pop()
      
      posts.push({
        title: data.title || fileName.replace('.md', ''),
        slug: relativePath,
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