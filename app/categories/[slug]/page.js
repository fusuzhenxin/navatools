import { notFound } from 'next/navigation'
import CategoryDetail from '../../../src/views/CategoryDetail.jsx'
import { getCategory, CATEGORIES } from '../../../src/data/categories.js'
import { sidebarTools, toolsByCategory } from '../../../src/data/tools.js'
import { pageMeta } from '../../../src/lib/seo.js'

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const cat = getCategory(slug)
  if (!cat) return pageMeta({ title: '未找到该分类 - NovaTools', path: `/categories/${slug}`, noIndex: true })
  return pageMeta({
    title: `${cat.name} - NovaTools`,
    description: cat.desc,
    path: `/categories/${cat.slug}`,
  })
}

export default async function Page({ params, searchParams }) {
  const { slug } = await params
  const query = await searchParams
  const cat = getCategory(slug)
  if (!cat) notFound()
  return (
    <CategoryDetail
      cat={cat}
      tools={toolsByCategory(slug)}
      sidebar={sidebarTools()}
      page={Number(query.page) || 1}
    />
  )
}
