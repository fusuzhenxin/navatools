import Search from '../../src/views/Search.jsx'
import { getInsights, getTools } from '../../src/data/tools.js'
import { matchesQuery } from '../../src/lib/utils.js'
import { searchMeta } from '../../src/lib/seo.js'

export async function generateMetadata({ searchParams }) {
  const { q = '' } = await searchParams
  return searchMeta(q)
}

export default async function Page({ searchParams }) {
  const { q = '' } = await searchParams
  const key = q.trim()
  const tools = key ? getTools().filter((tool) => matchesQuery(tool, key)) : []
  const insights = key
    ? getInsights().filter((item) => `${item.title}${item.excerpt}`.toLowerCase().includes(key.toLowerCase()))
    : []
  return <Search q={key} tools={tools} insights={insights} />
}
