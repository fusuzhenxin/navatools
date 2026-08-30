'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search as SearchIcon } from 'lucide-react'
import { SEARCH_HINTS } from '../data/site.js'
import { MediaCard } from '../components/ToolCards.jsx'
import Link from '../components/Link.jsx'

const TABS = [
  { id: 'all', label: '相关' },
  { id: 'tools', label: '工具' },
  { id: 'insights', label: '观察' },
]

export default function Search({ q = '', tools = [], insights = [] }) {
  const router = useRouter()
  const [draft, setDraft] = useState(q)
  const [tab, setTab] = useState('all')
  const [sort, setSort] = useState('relevant')
  const [visible, setVisible] = useState(12)

  useEffect(() => {
    setDraft(q)
    setVisible(12)
  }, [q])

  const sortedTools = useMemo(() => {
    const matched = [...tools]
    if (sort === 'hot') return matched.sort((a, b) => b.views - a.views)
    if (sort === 'new') return matched.sort((a, b) => new Date(b.updated) - new Date(a.updated))
    return matched
  }, [tools, sort])

  const go = (e) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(draft.trim())}`)
  }

  const showTools = tab !== 'insights'
  const showInsights = tab !== 'tools'
  const total = (showTools ? sortedTools.length : 0) + (showInsights ? insights.length : 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary">搜索结果：{q ? `“${q}”` : ''}</h1>
      <p className="mt-2 text-text-secondary">找到与「{q || '全部'}」相关的 AI 工具、任务和 AI 观察</p>

      <form className="mt-6 flex items-center gap-2 rounded-panel border border-border bg-surface px-3 py-2" onSubmit={go}>
        <SearchIcon className="h-4 w-4 text-text-tertiary" />
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none"
          placeholder="搜索 AI 工具..."
        />
        <button className="rounded-control bg-brand px-4 py-2 text-sm text-brand-foreground" type="submit">
          搜索
        </button>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-full px-3 py-1 text-sm ${tab === item.id ? 'bg-brand text-white' : 'bg-surface-muted text-text-secondary'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-9 rounded-control border border-border bg-surface-raised px-3 text-sm"
        >
          <option value="relevant">筛选：相关度</option>
          <option value="hot">热门</option>
          <option value="new">最新</option>
        </select>
      </div>

      <p className="mt-4 text-sm text-text-secondary">找到 {total} 个结果</p>

      {total === 0 ? (
        <div className="mt-10 rounded-card border border-border bg-surface-raised p-10 text-center">
          <h3 className="text-lg font-semibold">未找到相关结果</h3>
          <p className="mt-2 text-sm text-text-secondary">尝试使用不同的关键词或调整筛选条件</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="text-xs text-text-tertiary">试试：</span>
            {SEARCH_HINTS.map((hint) => (
              <button
                key={hint}
                type="button"
                className="rounded-full border border-border px-3 py-1 text-xs hover:text-brand"
                onClick={() => router.push(`/search?q=${encodeURIComponent(hint)}`)}
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          {showTools && sortedTools.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedTools.slice(0, visible).map((tool) => (
                  <MediaCard key={tool.slug} tool={tool} />
                ))}
              </div>
              {visible < sortedTools.length ? (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + 12)}
                    className="inline-flex h-10 items-center rounded-control border border-border bg-surface-raised px-5 text-sm font-medium text-text-primary hover:border-brand-soft hover:text-brand"
                  >
                    加载更多
                  </button>
                </div>
              ) : null}
            </>
          ) : null}
          {showInsights && insights.length > 0 ? (
            <div className="space-y-3">
              {insights.map((item) => (
                <Link key={item.slug} to={`/insights/${item.slug}`} className="block rounded-card border border-border bg-surface-raised p-5 hover:border-brand-soft">
                  <div className="text-xs text-text-tertiary">{item.kind} · {item.date}</div>
                  <h3 className="mt-1 text-lg font-semibold hover:text-brand">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-text-secondary">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
