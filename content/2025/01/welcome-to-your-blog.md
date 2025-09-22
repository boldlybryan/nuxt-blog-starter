---
title: Welcome to Your New Blog!
description: A guide to all the features available in your Nuxt blog template, with examples you can copy
date: 2025-01-16
author: Your Name Here
---

Welcome to your new blog! This post demonstrates all the Markdown features available to you. Feel free to copy any of these examples into your own posts.

## Formatting Text

You can make text **bold**, *italic*, or ***both***. You can also use `inline code` for technical terms or file names.

> 💡 **Pro tip:** Blockquotes are great for highlighting important information or quotes from other sources.

## Lists and Organization

### Unordered Lists
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Ordered Lists
1. First step
2. Second step
3. Third step
   1. Sub-step A
   2. Sub-step B

### Task Lists
- [x] Set up your blog
- [x] Customize the colors
- [ ] Write your first post
- [ ] Share with friends

## Code Examples

Inline code: Use `npm run dev` to start the development server.

Code blocks with syntax highlighting:

```javascript
// JavaScript example
function greet(name) {
  return `Hello, ${name}! Welcome to Nuxt blogging.`;
}

console.log(greet('World'));
```

```vue
<!-- Vue component example -->
<template>
  <div class="greeting">
    <h1>{{ message }}</h1>
  </div>
</template>

<script setup>
const message = ref('Hello from Vue!')
</script>
```

```css
/* CSS example */
.blog-post {
  max-width: 65ch;
  margin: 0 auto;
  line-height: 1.6;
}
```

## Tables

| Feature | Description | Documentation |
|---------|-------------|---------------|
| Nuxt 4 | The intuitive Vue framework | [nuxt.com](https://nuxt.com) |
| Vue 3 | Progressive JavaScript framework | [vuejs.org](https://vuejs.org) |
| Tailwind CSS | Utility-first CSS framework | [tailwindcss.com](https://tailwindcss.com) |

## Images

Images should be placed in the `public/images/` directory:

```markdown
![Alt text describing the image](/images/your-image.jpg)
```

For now, here's what an image would look like with a placeholder:

![Beautiful landscape](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80)

## Links

- [External link to Nuxt documentation](https://nuxt.com/docs)
- [Internal link to customization guide](/quick-customization)
- Links can also be inline, like this guide to [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

## Horizontal Rules

Use three dashes for a horizontal rule:

---

## Special Formatting

You can use HTML for special cases:

<kbd>Ctrl</kbd> + <kbd>C</kbd> to copy

<mark>Highlighted text</mark> for emphasis

<details>
<summary>Click to expand</summary>

This is hidden content that can be revealed by clicking the summary above. Great for FAQs or additional information that might clutter the main content.

</details>

## Advanced Tips

### Emoji Support 🎉

You can use emoji directly in your markdown: 🚀 📝 ✅ ⚡ 💡

### Math Equations (if needed)

While not enabled by default, you can add KaTeX support for mathematical expressions.

### Custom Components

With Nuxt Content, you can even use Vue components directly in your Markdown files (requires additional setup).

## What's Next?

Now that you've seen what's possible, here are some ideas for your first posts:

1. **Introduction Post**: Tell readers who you are and what you'll be writing about
2. **Tutorial**: Share your knowledge about a topic you're passionate about
3. **Project Showcase**: Document a project you've built
4. **Learning Journey**: Share what you're currently learning

---

Ready to start writing? Delete this post and create your own! Remember:

- Save posts in `content/YYYY/MM/your-post-name.md`
- Include frontmatter (title, description, date)
- Use meaningful file names (they become URLs)
- Have fun and be yourself!

Happy blogging! 🎉