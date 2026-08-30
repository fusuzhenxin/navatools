import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { presentInsight, presentTool } from '../lib/copy.js'
import { categoryBySlug } from './categories.js'
import { INSIGHTS } from './insights.js'

let tools = []
let bySlug = {}
let collections = { new: [], trending: [], featured: [], free: [], sidebar: [] }
let insights = []
let loaded = false

function uniq(list) {
  return [...new Set((list || []).filter(Boolean))]
}

function enrich(tool) {
  const screenshots = uniq(tool.screenshots?.length ? tool.screenshots : [tool.screenshot, tool.cover])
  const categories = tool.categories || []
  return presentTool({
    ...tool,
    features: tool.features || [],
    scenarios: tool.scenarios || tool.use_cases || [],
    alternatives: tool.alternatives || [],
    screenshot: screenshots[0] || tool.cover || tool.icon,
    screenshots,
    cover: tool.cover || screenshots[0] || tool.icon,
    categories,
    tags: tool.tags || [],
    categoryNames: categories.map((slug) => categoryBySlug[slug]?.name || slug).filter(Boolean),
  })
}

function readJson(file, fallback) {
  try {
    return JSON.parse(readFileSync(join(process.cwd(), file), 'utf8'))
  } catch {
    return fallback
  }
}

export function setCatalog(list) {
  tools = (list || []).map(enrich)
  bySlug = Object.fromEntries(tools.map((t) => [t.slug, t]))
  return tools
}

export function setCollections(next) {
  collections = {
    new: next?.new || [],
    trending: next?.trending || [],
    featured: next?.featured || [],
    free: next?.free || [],
    sidebar: next?.sidebar || next?.featured?.slice(0, 12) || [],
  }
  return collections
}

export function setInsights(list) {
  insights = (list || []).map(presentInsight)
  return insights
}

export function ensureCatalog() {
  if (loaded) return { tools, collections, insights }
  setCollections(readJson('public/data/collections.json', collections))
  const insightList = readJson('public/data/insights.json', [])
  setInsights(insightList.length ? insightList : INSIGHTS)
  setCatalog(readJson('public/data/tools.json', []))
  loaded = true
  return { tools, collections, insights }
}

export function getCollections() {
  ensureCatalog()
  return collections
}

export function getInsights() {
  ensureCatalog()
  return insights
}

export function toolsBySlugs(slugs) {
  ensureCatalog()
  return (slugs || []).map((slug) => bySlug[slug]).filter(Boolean)
}

export function getTools() {
  ensureCatalog()
  return tools
}

export function getTool(slug) {
  ensureCatalog()
  return bySlug[slug]
}

export function toolsByCategory(slug) {
  ensureCatalog()
  return tools.filter((t) => t.categories.includes(slug))
}

export function relatedTools(tool, limit = 12) {
  ensureCatalog()
  const set = new Set(tool.categories)
  return tools.filter((t) => t.slug !== tool.slug && t.categories.some((c) => set.has(c))).slice(0, limit)
}

export function alternativeTools(tool) {
  ensureCatalog()
  return (tool.alternatives || []).map((slug) => bySlug[slug]).filter(Boolean)
}

export function featuredTools() {
  ensureCatalog()
  const listed = toolsBySlugs(collections.featured)
  return listed.length ? listed : tools.filter((t) => t.isFeatured)
}

export function trendingTools() {
  ensureCatalog()
  const listed = toolsBySlugs(collections.trending)
  return listed.length ? listed : tools.filter((t) => t.isTrending)
}

export function newTools() {
  ensureCatalog()
  const listed = toolsBySlugs(collections.new)
  if (listed.length) return listed
  return [...tools].sort((a, b) => String(b.published || b.updated).localeCompare(String(a.published || a.updated)))
}

export function freeTools() {
  ensureCatalog()
  const listed = toolsBySlugs(collections.free)
  return listed.length ? listed : tools.filter((t) => t.isFree || /免费/.test(t.price || ''))
}

export function sidebarTools() {
  ensureCatalog()
  const listed = toolsBySlugs(collections.sidebar)
  return listed.length ? listed : featuredTools().slice(0, 12)
}
