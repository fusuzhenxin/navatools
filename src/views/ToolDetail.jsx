'use client'

import { useState } from 'react'
import { Bookmark, Copy, ExternalLink, Monitor, Sparkles } from 'lucide-react'
import { getCategory } from '../data/categories.js'
import { useAuth } from '../context/AuthContext.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Link from '../components/Link.jsx'
import { PriceBadge } from '../components/Badge.jsx'
import { CompactSideCard, ToolRowCard } from '../components/ToolCards.jsx'
import { altReason } from '../lib/copy.js'
import { aboutParagraphs } from '../lib/seo.js'
import { coverUrl, iconUrl, shotUrl, timeAgo } from '../lib/utils.js'

const TABS = [
  { id: 'overview', label: '概览' },
  { id: 'features', label: '核心功能' },
  { id: 'scenarios', label: '应用场景' },
  { id: 'alts', label: '替代工具' },
]

export default function ToolDetail({ tool, alts = [], sidebar = [] }) {
  const { favorites, toggleFavorite } = useAuth()
  const [tab, setTab] = useState('overview')
  const [copied, setCopied] = useState(false)
  const [preview, setPreview] = useState('')

  if (!tool) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">未找到该工具</h1>
        <Link to="/tools" className="mt-4 inline-block text-brand">返回工具库</Link>
      </div>
    )
  }

  const primaryCat = getCategory(tool.categories[0])
  const saved = favorites.includes(tool.slug)
  const shots = [...new Set((tool.screenshots?.length ? tool.screenshots : [tool.screenshot]).filter(Boolean))]
  const paragraphs = aboutParagraphs(tool.about)

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: '工具', to: '/tools' },
          { label: primaryCat?.name || '分类', to: primaryCat ? `/categories/${primaryCat.slug}` : '/categories' },
          { label: tool.name },
        ]}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <header className="mb-5 rounded-panel border border-border bg-surface-raised p-3 shadow-card sm:mb-6 sm:p-6">
            <div className="mb-4 flex flex-col justify-between gap-4 sm:mb-5 sm:gap-5 lg:flex-row lg:items-center">
              <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-card border border-border bg-surface-muted sm:h-16 sm:w-16">
                  <img src={iconUrl(tool.icon)} alt={`${tool.name} - AI工具Logo图标`} className="h-full w-full object-contain p-1" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2 sm:mb-2">
                    <h1 className="text-xl font-bold leading-tight text-text-primary sm:text-3xl">{tool.name}</h1>
                    <PriceBadge price={tool.price} chinese={tool.chinese} className="justify-start" />
                  </div>
                  <p className="mb-3 max-w-3xl text-sm leading-6 text-text-secondary sm:mb-4 sm:text-base">{tool.desc}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-text-tertiary sm:text-sm">
                    <span>{tool.views} 次使用</span>
                    <span>{timeAgo(tool.updated)}</span>
                    <span className="inline-flex items-center gap-1"><Monitor className="h-3.5 w-3.5" />{tool.platforms.join(' / ')}</span>
                    <span>{tool.language}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:min-w-[140px]" aria-label="工具操作">
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-control bg-brand px-4 text-sm font-medium text-brand-foreground hover:bg-brand-hover"
                >
                  访问网站 <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => toggleFavorite(tool.slug)}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-control border border-border bg-surface-raised px-4 text-sm font-medium hover:border-brand-soft"
                >
                  <Bookmark className={`h-4 w-4 ${saved ? 'fill-brand text-brand' : ''}`} />
                  {saved ? '已收藏' : '收藏'}
                </button>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-control border border-border bg-surface-raised px-4 text-sm font-medium hover:border-brand-soft"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? '已复制' : '复制链接'}
                </button>
              </div>
            </div>
            <nav className="flex flex-wrap gap-2" aria-label="工具分类">
              {tool.categories.map((slug) => {
                const cat = getCategory(slug)
                return cat ? (
                  <Link key={slug} to={`/categories/${slug}`} className="rounded-md border border-border bg-surface-muted px-3 py-1 text-sm text-text-secondary hover:text-brand">
                    {cat.name}
                  </Link>
                ) : null
              })}
            </nav>
          </header>

          <div className="overflow-hidden rounded-panel border border-border bg-surface-raised shadow-card">
            <nav className="overflow-x-auto border-b border-border scrollbar-hide" role="tablist">
              <div className="flex min-w-max">
                {TABS.map((item) => {
                  const count =
                    item.id === 'features' ? tool.features.length : item.id === 'scenarios' ? tool.scenarios.length : item.id === 'alts' ? alts.length : null
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      onClick={() => setTab(item.id)}
                      className={`relative px-3 py-3 text-[13px] font-medium whitespace-nowrap sm:px-5 sm:text-sm ${
                        tab === item.id ? 'text-brand' : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {item.label}
                        {count != null ? <span className="rounded-full bg-surface-muted px-1.5 py-0.5 text-xs font-semibold">{count}</span> : null}
                      </span>
                      {tab === item.id ? <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-t-full bg-brand" /> : null}
                    </button>
                  )
                })}
              </div>
            </nav>

            <div className="space-y-10 p-4 sm:p-6">
              {(tab === 'overview' || tab === 'features') && (
                <section>
                  {tab === 'overview' ? (
                    <>
                      <h2 className="mb-3 text-xl font-bold">关于此工具</h2>
                      <div className="space-y-4 text-sm leading-7 text-text-secondary sm:text-base">
                        {paragraphs.map((text) => (
                          <p key={text.slice(0, 24)}>{text}</p>
                        ))}
                      </div>
                      {shots.length ? (
                        <>
                          <h3 className="mt-8 mb-3 font-semibold">工具截图</h3>
                          <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-2 snap-x snap-mandatory scrollbar-hide">
                            {shots.map((src, index) => (
                              <button
                                key={src}
                                type="button"
                                onClick={() => setPreview(src)}
                                className="w-64 flex-shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-surface-muted text-left"
                              >
                                <img
                                  src={shotUrl(src)}
                                  alt={`${tool.name} 截图 ${index + 1}`}
                                  className="aspect-video w-full object-cover object-top"
                                />
                              </button>
                            ))}
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : null}
                  <h2 className="mt-8 mb-4 flex items-center gap-2 text-xl font-bold">
                    <Sparkles className="h-5 w-5 text-brand" />
                    核心功能 ( {tool.features.length} )
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {tool.features.map((f) => (
                      <div key={f.title} className="rounded-card border border-border bg-surface p-4">
                        <h3 className="font-semibold">{f.title}</h3>
                        <p className="mt-2 text-sm text-text-secondary">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {(tab === 'overview' || tab === 'scenarios') && (
                <section>
                  <h2 className="mb-4 text-xl font-bold">应用场景 ( {tool.scenarios.length} )</h2>
                  <div className="space-y-3">
                    {tool.scenarios.map((s, i) => (
                      <div key={s.title} className="flex gap-3 rounded-card border border-border p-4">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand">{i + 1}</span>
                        <div>
                          <h3 className="font-semibold">{s.title}</h3>
                          <p className="mt-1 text-sm text-text-secondary">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {(tab === 'overview' || tab === 'alts') && (
                <section>
                  <h2 className="mb-2 text-xl font-bold">替代工具推荐</h2>
                  <p className="mb-4 text-sm text-text-secondary">功能接近或能互补的选项，适合和当前工具对照试用。</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {alts.map((alt) => (
                      <div key={alt.slug} className="relative">
                        <ToolRowCard tool={alt} />
                        <div className="px-4 pb-3 text-xs text-text-tertiary">对照理由：{altReason(tool, alt)}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-3">
          <h3 className="font-semibold">精选工具</h3>
          {sidebar.map((item) => (
            <CompactSideCard key={item.slug} tool={item} />
          ))}
        </aside>
      </div>

      {preview ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPreview('')}
          role="dialog"
          aria-modal="true"
          aria-label="工具截图预览"
        >
          <img
            src={coverUrl(preview)}
            alt={`${tool.name} 截图预览`}
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  )
}
