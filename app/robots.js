import { SITE_URL } from '../src/lib/seo.js'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/profile', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
