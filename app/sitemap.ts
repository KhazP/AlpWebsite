import { MetadataRoute } from 'next'
import { blogPosts } from './blogs/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const postRoutes = Object.keys(blogPosts).map((slug) => ({
    url: `https://www.alpyalay.org/blogs/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://www.alpyalay.org',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...postRoutes,
  ]
} 