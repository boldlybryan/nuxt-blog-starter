import { Feed } from 'feed'
import { readFile, writeFile, readdir } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

export async function generateRSSFeed() {
  console.log('Generating RSS feed at build time...')
  
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
    // Read all markdown files from content directory
    const contentDir = join(process.cwd(), 'content')
    const posts = await getAllPosts(contentDir)
    
    // Sort by date descending and take 20 most recent
    posts
      .filter(post => !post.draft)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20)
      .forEach(post => {
        const urlPath = post.path.startsWith('/') ? post.path : `/${post.path}`
        
        feed.addItem({
          title: post.title,
          id: `https://nuxtjs-blog-starter.vercel.app${urlPath}`,
          link: `https://nuxtjs-blog-starter.vercel.app${urlPath}`,
          description: post.description || '',
          content: post.content || post.description || '',
          date: new Date(post.date)
        })
      })

    // Write RSS feed to public directory
    const publicDir = join(process.cwd(), 'public')
    const rssContent = feed.rss2()
    await writeFile(join(publicDir, 'feed.xml'), rssContent, 'utf-8')
    
    console.log(`RSS feed generated with ${posts.length} posts`)
  } catch (error) {
    console.error('Error generating RSS feed:', error)
  }
}

async function getAllPosts(dir: string): Promise<any[]> {
  const posts: any[] = []
  
  async function readDirectory(currentDir: string, basePath = '') {
    const entries = await readdir(currentDir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name)
      const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name
      
      if (entry.isDirectory()) {
        await readDirectory(fullPath, relativePath)
      } else if (entry.name.endsWith('.md')) {
        try {
          const fileContent = await readFile(fullPath, 'utf-8')
          const { data, content } = matter(fileContent)
          
          // Convert markdown to HTML (improved conversion)
          const htmlContent = content
            // Headers (must come before other processing)
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            // Bold and italic (handle all variations)
            .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>') // bold+italic
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // bold with **
            .replace(/__(.*?)__/g, '<strong>$1</strong>') // bold with __
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // italic with *
            .replace(/_(.*?)_/g, '<em>$1</em>') // italic with _
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
            // Images (convert to proper img tags instead of removing)
            .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
            // Inline code
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            // Line breaks to paragraphs
            .split('\n\n')
            .map(paragraph => paragraph.trim())
            .filter(paragraph => paragraph)
            .map(paragraph => {
              // Skip if already wrapped in HTML block tags
              if (paragraph.startsWith('<h') || paragraph.startsWith('<img') || paragraph.startsWith('<ul') || paragraph.startsWith('<ol')) {
                return paragraph
              }
              return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`
            })
            .join('\n')
          
          const pathWithoutExtension = relativePath.replace(/\.md$/, '')
          
          posts.push({
            title: data.title || pathWithoutExtension.split('/').pop()?.replace(/-/g, ' ') || 'Untitled',
            description: data.description || '',
            date: data.date || new Date(),
            draft: data.draft || false,
            path: `/${pathWithoutExtension}`,
            content: htmlContent
          })
        } catch (error) {
          console.warn(`Error reading post ${fullPath}:`, error)
        }
      }
    }
  }
  
  await readDirectory(dir)
  return posts
}
