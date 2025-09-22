---
title: Organizing Your Content
description: Learn how to structure and manage your blog posts effectively
date: 2025-01-14
author: Template Documentation
---

This template uses [Nuxt Content](https://content.nuxt.com/) for managing blog posts with Markdown files. Here's everything you need to know about organizing your content effectively.

> 📚 Resources: [Nuxt Content docs](https://content.nuxt.com/) | [Markdown guide](https://www.markdownguide.org/)

## Content Directory Structure

All your blog posts live in the `content/` directory. You can organize them however makes sense for your blog:

### Flat Structure (Simple)
```
content/
├── getting-started.md
├── my-first-post.md
├── another-post.md
└── latest-update.md
```

### Date-Based Structure (Recommended)
```
content/
├── 2025/
│   ├── 01/
│   │   ├── getting-started.md
│   │   └── new-year-post.md
│   └── 02/
│       └── february-update.md
└── 2024/
    └── 12/
        └── year-end-review.md
```

### Category-Based Structure
```
content/
├── tutorials/
│   ├── nuxt-basics.md
│   └── vue-tips.md
├── reviews/
│   └── book-review.md
└── personal/
    └── about-me.md
```

## Frontmatter Configuration

Every Markdown file should start with frontmatter containing metadata:

```markdown
---
title: Your Post Title
description: A brief description for SEO and previews
date: 2025-01-15
author: Your Name
draft: false
---

# Your content starts here...
```

### Required Fields
- `title`: The post title (used in navigation and SEO)
- `description`: Brief description (shown in post lists and SEO)

### Optional Fields
- `date`: Publication date (YYYY-MM-DD format)
- `author`: Author name
- `draft`: Set to `true` to hide from production build

### Custom Fields
You can add any custom fields you need:

```markdown
---
title: My Post
description: Post description
date: 2025-01-15
category: Tutorial
tags: [nuxt, vue, web-development]
featured: true
readTime: 5 min
---
```

## Writing in Markdown

Nuxt Content supports standard Markdown plus some enhancements:

### Basic Formatting
```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
`Inline code`

- Bullet point
- Another point

1. Numbered list
2. Second item

[Link text](https://example.com)
```

### Code Blocks
```markdown
```javascript
function hello() {
  console.log('Hello, world!');
}
```
```

### Images
```markdown
![Alt text](/images/my-image.jpg)
```
Place images in the `public/images/` directory.

## URL Structure

The URL for each post is automatically generated from its file path:

- `content/my-post.md` → `/my-post`
- `content/2025/01/hello-world.md` → `/2025/01/hello-world`
- `content/tutorials/nuxt-guide.md` → `/tutorials/nuxt-guide`

## Content Management Tips

### 1. Use Consistent Naming
- Use kebab-case for filenames: `my-awesome-post.md`
- Avoid spaces and special characters
- Keep filenames descriptive but concise

### 2. Organize by Date
The date-based structure (`YYYY/MM/`) is recommended because:
- Easy to find recent posts
- Scales well over time
- Natural chronological order

### 3. Draft Posts
Use `draft: true` in frontmatter to work on posts without publishing:

```markdown
---
title: Work in Progress
description: This post isn't ready yet
draft: true
---
```

### 4. Consistent Frontmatter
Create a template for new posts to ensure consistency:

```markdown
---
title: 
description: 
date: 
author: Your Name
draft: false
---

# Title

Your content here...
```

### 5. Asset Management
- Store images in `public/images/`
- Use descriptive filenames for assets
- Optimize images before uploading

## RSS Feed Integration

All published posts (where `draft !== true`) automatically appear in your RSS feed at `/feed.xml`. The feed uses:
- Post title and description from frontmatter
- Publication date
- Full content or excerpt

## Next Steps

- [Customizing Styles](/customizing-styles) - Style your content
- [Creating New Pages](/creating-pages) - Add non-blog pages
- [Site Configuration](/site-configuration) - Update site metadata

Start creating your content and watch your blog come to life!