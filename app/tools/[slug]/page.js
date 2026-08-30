import { notFound } from 'next/navigation'
import ToolDetail from '../../../src/views/ToolDetail.jsx'
import JsonLd from '../../../src/components/JsonLd.jsx'
import { alternativeTools, getTool, sidebarTools } from '../../../src/data/tools.js'
import { pageMeta, stripHtml } from '../../../src/lib/seo.js'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) return pageMeta({ title: '未找到该工具 - NovaTools', path: `/tools/${slug}`, noIndex: true })
  return pageMeta({
    title: tool.title || `${tool.name} - NovaTools`,
    description: tool.desc || stripHtml(tool.about).slice(0, 160),
    path: `/tools/${tool.slug}`,
    image: tool.cover || tool.icon,
  })
}

export default async function Page({ params }) {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) notFound()

  const alts = alternativeTools(tool)
  const sidebar = sidebarTools().filter((item) => item.slug !== tool.slug).slice(0, 12)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: tool.name,
          applicationCategory: 'BrowserApplication',
          operatingSystem: (tool.platforms || ['Web']).join(', '),
          url: tool.website || undefined,
          image: tool.icon || tool.cover,
          description: tool.desc || stripHtml(tool.about),
          offers: tool.price
            ? {
                '@type': 'Offer',
                price: /免费/.test(tool.price) ? '0' : undefined,
                priceCurrency: 'USD',
                description: tool.price,
              }
            : undefined,
          aggregateRating:
            tool.rating > 0
              ? {
                  '@type': 'AggregateRating',
                  ratingValue: tool.rating,
                  bestRating: 5,
                  worstRating: 1,
                  ratingCount: Math.max(1, Number(tool.reviewCount) || 1),
                }
              : undefined,
        }}
      />
      <ToolDetail tool={tool} alts={alts} sidebar={sidebar} />
    </>
  )
}
