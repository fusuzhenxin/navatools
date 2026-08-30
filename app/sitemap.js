import { CATEGORIES } from '../src/data/categories.js'
import { getInsights, getTools } from '../src/data/tools.js'
import { SITE_URL } from '../src/lib/seo.js'

export default function sitemap() {
  const now = new Date()
  const staticRoutes = [
    '',
    '/tools',
    '/tools/new',
    '/tools/trending',
    '/tools/featured',
    '/tools/free',
    '/categories',
    '/insights',
    '/search',
    '/about',
    '/contact',
    '/submit',
    '/faq',
    '/terms',
    '/privacy',
    '/tasks',
  ].map((path) => ({
    url: `${SITE_URL}${path || '/'}`,
    lastModified: now,
    changeFrequency: path === '' || path === '/tools' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.7,
  }))

  const tools = getTools().map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: tool.updated ? new Date(tool.updated) : now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const categories = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/categories/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const insights = getInsights().map((item) => ({
    url: `${SITE_URL}/insights/${item.slug}`,
    lastModified: item.date ? new Date(item.date) : now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticRoutes, ...categories, ...insights, ...tools]
}
