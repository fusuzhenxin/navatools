import { mkdirSync, readFileSync, writeFileSync, existsSync, renameSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = resolve(ROOT, 'public/data/tools.json')
const COLLECTIONS_OUT = resolve(ROOT, 'public/data/collections.json')
const INSIGHTS_OUT = resolve(ROOT, 'public/data/insights.json')
const STATE = resolve(ROOT, 'data/crawl-state.json')
const SITEMAP = resolve(ROOT, 'data/sitemap.xml')
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
const CONCURRENCY = 6
const BASE = 'https://www.novatools.cn'
const REFRESH = process.argv.includes('--refresh')
const META_ONLY = process.argv.includes('--meta')
const SCREENSHOTS_ONLY = process.argv.includes('--screenshots')

mkdirSync(resolve(ROOT, 'public/data'), { recursive: true })
mkdirSync(resolve(ROOT, 'data'), { recursive: true })

async function fetchText(url) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 25000)
  try {
    const res = await fetch(url, {
      headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml' },
      signal: ctrl.signal,
    })
    if (!res.ok) throw new Error(`${res.status} ${url}`)
    return await res.text()
  } finally {
    clearTimeout(timer)
  }
}

function extractPushStrings(html) {
  const out = []
  for (const m of html.matchAll(/self\.__next_f\.push\((\[.*?\])\)\s*<\/script>/gs)) {
    try {
      const parsed = JSON.parse(m[1])
      for (const item of parsed) if (typeof item === 'string') out.push(item)
    } catch {
      out.push(m[1])
    }
  }
  return out
}

function extractBalanced(str, start) {
  let depth = 0
  for (let i = start; i < str.length; i++) {
    if (str[i] === '{') depth++
    else if (str[i] === '}') {
      depth--
      if (depth === 0) return str.slice(start, i + 1)
    }
  }
  return ''
}

function extractToolObject(html) {
  const blob = `${extractPushStrings(html).join('\n')}\n${html}`
  const i = blob.indexOf('"tool":{')
  if (i < 0) return null
  const raw = extractBalanced(blob, i + '"tool":'.length)
  return raw ? JSON.parse(raw) : null
}

function meta(html, key) {
  const re = new RegExp(`<(?:meta)[^>]+(?:property|name)="${key}"[^>]+content="([^"]*)"`, 'i')
  return html.match(re)?.[1] || ''
}

function decode(text) {
  return String(text || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function unique(list) {
  const seen = new Set()
  const out = []
  for (const item of list) {
    if (!item || seen.has(item)) continue
    seen.add(item)
    out.push(item)
  }
  return out
}

function slugsFromSlice(slice) {
  const slugs = []
  for (const m of slice.matchAll(/\/tools\/([a-z0-9-]+)/g)) {
    if (!['new', 'trending', 'featured', 'free'].includes(m[1])) slugs.push(m[1])
  }
  return unique(slugs)
}

function parseHomeCollections(html) {
  const titles = ['最新上线', '热门工具', '本站精选', '免费工具']
  const map = { 最新上线: 'new', 热门工具: 'trending', 本站精选: 'featured', 免费工具: 'free' }
  const result = { new: [], trending: [], featured: [], free: [], sidebar: [] }
  for (const title of titles) {
    const start = html.indexOf(`>${title}<`)
    if (start < 0) continue
    const nextHits = titles
      .map((t) => html.indexOf(`>${t}<`, start + title.length))
      .filter((i) => i > start)
    const end = nextHits.length ? Math.min(...nextHits) : html.length
    result[map[title]] = slugsFromSlice(html.slice(start, end))
  }
  result.free = result.free.slice(0, 12)
  result.sidebar = [
    'readdy-ai',
    'tripo-ai',
    'laper-ai',
    'seko-sensetime',
    'liblib-art',
    'kalodata',
    'meshy-ai',
    'douge',
    'runninghub-ai',
    'qiewen-paper',
    'fastmoss',
    'fish-audio',
  ]
  return result
}

function parseListCollections(html) {
  return slugsFromSlice(html)
}

function langLabel(languages = [], chinese) {
  if (chinese) return '中文'
  if (languages.includes('en')) return 'English'
  return languages[0] || ''
}

function mapTool(slug, html, raw) {
  const categories = (raw.categories || []).map((c) => c.slug).filter(Boolean)
  const tags = (raw.categories || []).map((c) => c.name).filter(Boolean)
  const chinese = html.includes('>中文<') || (raw.languages || []).some((l) => String(l).startsWith('zh'))
  const graphic = (raw.media_assets || []).find((a) => a.type === 'feature_graphic')?.url
  const screenshots = unique(
    (raw.media_assets || []).filter((a) => a.type === 'screenshot' && a.url).map((a) => a.url),
  )
  const website = decode(raw.url || raw.info?.website || '')
  const price = raw.pricing_display_text || ''
  const firstShot = screenshots[0] || graphic || raw.cover_url || raw.logo_url || ''
  return {
    slug: raw.slug || slug,
    name: raw.name || slug,
    title: decode(meta(html, 'og:title')),
    desc: raw.brief || decode(meta(html, 'og:description')),
    about: raw.description || raw.brief || '',
    icon: raw.logo_url || graphic || '',
    cover: raw.cover_url || graphic || firstShot || raw.logo_url || '',
    screenshot: firstShot,
    screenshots,
    website,
    price,
    chinese,
    categories: unique(categories),
    tags,
    keywords: raw.tags || [],
    features: (raw.feature_highlight || []).map((f) => ({ title: f.title, desc: f.description || '' })),
    scenarios: (raw.use_cases || []).map((s) => ({ title: s.title, desc: s.description || '' })),
    alternatives: (raw.altTools || []).map((a) => a.slug).filter(Boolean),
    views: Number(raw.useCount || 0),
    rating: Number(raw.rating || 0),
    updated: raw.lastUpdated || '',
    published: raw.info?.addedDate || '',
    language: langLabel(raw.languages || [], (raw.languages || []).some((l) => String(l).startsWith('zh'))),
    platforms: raw.platforms?.length ? raw.platforms : ['web'],
    isNew: false,
    isTrending: false,
    isFeatured: false,
    isFree: raw.pricing_display_type === 'free' || /^免费$/.test(price) || price.startsWith('免费'),
  }
}

function parseTool(slug, html) {
  const raw = extractToolObject(html)
  if (raw?.name) return mapTool(slug, html, raw)
  throw new Error(`missing RSC tool payload: ${slug}`)
}

function stripTags(html) {
  return decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
}

function parseInsight(slug, html) {
  const title = stripTags(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] || meta(html, 'og:title').replace(/ - NovaTools$/, ''))
  const date = html.match(/datetime="(\d{4}-\d{2}-\d{2})/)?.[1] || html.match(/(\d{4}-\d{2}-\d{2})/)?.[1] || ''
  const kind = html.match(/观点精选|发布精选|行业观察|深度分析|工具测评/)?.[0] || '观点精选'
  const excerpt = stripTags(html.match(/<p class="mt-5[\s\S]*?>([\s\S]*?)<\/p>/)?.[1] || meta(html, 'og:description'))
  const h1 = html.indexOf('</h1>')
  let end = html.length
  for (const mark of ['相关 AI观察', '继续阅读', '<footer']) {
    const i = html.indexOf(mark, h1)
    if (i > h1 && i < end) end = i
  }
  const content = []
  for (const m of html.slice(h1, end).matchAll(/<(h2|p)[^>]*>([\s\S]*?)<\/\1>/g)) {
    const text = stripTags(m[2])
    if (!text || text === excerpt || text === '相关 AI观察') continue
    if (m[1] === 'p' && text.length < 8) continue
    content.push({ type: m[1], text })
  }
  return { slug, title, excerpt, date, kind, content }
}

async function loadSitemapSlugs() {
  writeFileSync(SITEMAP, await fetchText(`${BASE}/sitemap.xml`))
  const xml = readFileSync(SITEMAP, 'utf8')
  const slugs = []
  for (const m of xml.matchAll(/https:\/\/www\.novatools\.cn\/tools\/([a-z0-9-]+)<\/loc>/g)) {
    if (!['new', 'trending', 'featured', 'free'].includes(m[1])) slugs.push(m[1])
  }
  return unique(slugs)
}

async function loadInsightSlugs() {
  writeFileSync(SITEMAP, await fetchText(`${BASE}/sitemap.xml`))
  const xml = readFileSync(SITEMAP, 'utf8')
  return unique([...xml.matchAll(/https:\/\/www\.novatools\.cn\/insights\/([a-z0-9-]+)<\/loc>/g)].map((m) => m[1]))
}

function loadExisting() {
  if (!existsSync(OUT)) return new Map()
  try {
    return new Map(JSON.parse(readFileSync(OUT, 'utf8')).map((t) => [t.slug, t]))
  } catch {
    return new Map()
  }
}

function save(map) {
  const list = [...map.values()].sort((a, b) => a.slug.localeCompare(b.slug))
  const tmp = `${OUT}.tmp`
  writeFileSync(tmp, JSON.stringify(list))
  renameSync(tmp, OUT)
  writeFileSync(STATE, JSON.stringify({ count: list.length, updatedAt: new Date().toISOString() }, null, 2))
}

async function mapLimit(items, limit, worker) {
  let i = 0
  await Promise.all(Array.from({ length: limit }, async () => {
    while (i < items.length) {
      const idx = i++
      await worker(items[idx], idx)
    }
  }))
}

async function crawlMeta() {
  const home = await fetchText(`${BASE}/`)
  const collections = parseHomeCollections(home)
  for (const [key, path] of [
    ['new', '/tools/new'],
    ['trending', '/tools/trending'],
    ['featured', '/tools/featured'],
  ]) {
    try {
      const extra = parseListCollections(await fetchText(`${BASE}${path}`))
      collections[key] = unique([...collections[key], ...extra])
    } catch (error) {
      console.warn('collection page fail', path, error.message)
    }
  }
  writeFileSync(COLLECTIONS_OUT, JSON.stringify(collections, null, 2))
  console.log('collections', Object.fromEntries(Object.entries(collections).map(([k, v]) => [k, v.length])))

  const insightSlugs = await loadInsightSlugs()
  const insights = []
  for (const slug of insightSlugs) {
    const item = parseInsight(slug, await fetchText(`${BASE}/insights/${slug}`))
    insights.push(item)
    console.log('insight', slug, item.title)
  }
  writeFileSync(INSIGHTS_OUT, JSON.stringify(insights, null, 2))
  return collections
}

const collections = SCREENSHOTS_ONLY && existsSync(COLLECTIONS_OUT)
  ? JSON.parse(readFileSync(COLLECTIONS_OUT, 'utf8'))
  : await crawlMeta()
if (META_ONLY) {
  console.log('meta only, skip tools')
  process.exit(0)
}

const collectionsSlugs = unique([
  ...collections.new,
  ...collections.trending,
  ...collections.featured,
  ...collections.free,
  ...collections.sidebar,
])
const catalog = loadExisting()
const slugs = SCREENSHOTS_ONLY
  ? unique([...catalog.keys(), ...collectionsSlugs])
  : unique([...(await loadSitemapSlugs()), ...collectionsSlugs])
const priority = collectionsSlugs
const stale = (tool) =>
  SCREENSHOTS_ONLY
    ? !tool?.screenshots?.length
    : !tool?.about || !tool.features?.[0]?.desc || !tool.desc || tool.cover === tool.icon || !tool.screenshots?.length
const pending = slugs.filter((s) => REFRESH || !catalog.has(s) || stale(catalog.get(s)))
pending.sort((a, b) => Number(priority.includes(b)) - Number(priority.includes(a)))
console.log(`sitemap=${slugs.length} already=${catalog.size} pending=${pending.length} refresh=${REFRESH} screenshotsOnly=${SCREENSHOTS_ONLY}`)

let done = 0
let failed = 0
await mapLimit(pending, CONCURRENCY, async (slug) => {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const html = await fetchText(`${BASE}/tools/${slug}`)
      const tool = parseTool(slug, html)
      const prev = catalog.get(slug)
      catalog.set(slug, SCREENSHOTS_ONLY && prev ? { ...prev, screenshot: tool.screenshot, screenshots: tool.screenshots } : tool)
      done++
      if (done <= 12 || done % 50 === 0) {
        save(catalog)
        console.log(`saved ${catalog.size}/${slugs.length} (+${done} this run, fail=${failed})`)
      }
      return
    } catch (error) {
      if (attempt === 3) {
        failed++
        console.warn(`fail ${slug}: ${error.message}`)
      } else {
        await new Promise((r) => setTimeout(r, 400 * attempt))
      }
    }
  }
})

for (const tool of catalog.values()) {
  tool.isNew = collections.new.includes(tool.slug)
  tool.isTrending = collections.trending.includes(tool.slug)
  tool.isFeatured = collections.featured.includes(tool.slug)
  if (collections.free.includes(tool.slug)) tool.isFree = true
}

save(catalog)
console.log(`done tools=${catalog.size} failed=${failed} out=${OUT}`)
