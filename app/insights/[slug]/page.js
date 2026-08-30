import { notFound } from 'next/navigation'
import InsightDetail from '../../../src/views/InsightDetail.jsx'
import { getInsights } from '../../../src/data/tools.js'
import { pageMeta } from '../../../src/lib/seo.js'

export function generateStaticParams() {
  return getInsights().map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = getInsights().find((i) => i.slug === slug)
  if (!item) return pageMeta({ title: '未找到该观察 - NovaTools', path: `/insights/${slug}`, noIndex: true })
  return pageMeta({
    title: `${item.title} - NovaTools`,
    description: item.excerpt,
    path: `/insights/${item.slug}`,
  })
}

export default async function Page({ params }) {
  const { slug } = await params
  const insights = getInsights()
  const item = insights.find((i) => i.slug === slug)
  if (!item) notFound()
  return <InsightDetail item={item} others={insights.filter((i) => i.slug !== slug).slice(0, 3)} />
}
