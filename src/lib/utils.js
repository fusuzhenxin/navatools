export function iconUrl(src) {
  if (!src) return ''
  if (src.includes('imageMogr2') || src.endsWith('.svg')) return src
  return `${src}?imageMogr2/thumbnail/128x128/format/webp/quality/90`
}

export function coverUrl(src) {
  if (!src) return ''
  if (src.includes('imageMogr2')) return src
  return `${src}?imageMogr2/thumbnail/960x480^/gravity/North/crop/960x480/format/webp/quality/85`
}

export function shotUrl(src) {
  if (!src) return ''
  if (src.includes('imageMogr2')) return src
  return `${src}?imageMogr2/thumbnail/512x288^/gravity/North/crop/512x288/format/webp/quality/85`
}

export function formatViews(value) {
  if (value >= 10000) return `${(value / 10000).toFixed(1)}万`
  if (value >= 1000) return value.toLocaleString()
  return String(value)
}

export function timeAgo(iso) {
  const date = new Date(iso)
  const diff = Date.now() - date.getTime()
  const days = Math.max(1, Math.floor(diff / 86400000))
  if (days < 1) return '今天更新'
  if (days === 1) return '1天前更新'
  if (days < 30) return `${days}天前更新`
  const months = Math.floor(days / 30)
  return `${months}个月前更新`
}

export function matchesQuery(tool, q) {
  const key = q.trim().toLowerCase()
  if (!key) return false
  return [tool.name, tool.searchText, tool.desc, ...(tool.tags || []), ...(tool.keywords || []), ...(tool.categoryNames || [])]
    .join(' ')
    .toLowerCase()
    .includes(key)
}
