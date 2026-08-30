'use client'

import { ArrowRight, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { HOT_SEARCHES } from '../data/site.js'

export default function HomeSearch() {
  const router = useRouter()

  const onSearch = (e) => {
    e.preventDefault()
    const q = new FormData(e.currentTarget).get('q')?.toString().trim()
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
  }

  return (
    <section className="border-b border-border bg-surface-raised">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-8 text-center sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <form className="w-full max-w-3xl" onSubmit={onSearch}>
          <div className="flex items-center gap-2 rounded-panel border border-border bg-surface px-3 py-2 shadow-card transition-colors focus-within:border-brand-soft focus-within:ring-2 focus-within:ring-brand/10 sm:px-4 sm:py-3">
            <Search className="h-4 w-4 flex-shrink-0 text-text-tertiary" />
            <input
              name="q"
              placeholder="试试：搭建网站、AI 智能体、视频生成..."
              className="min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-tertiary"
            />
            <button
              type="submit"
              className="inline-flex flex-shrink-0 items-center justify-center gap-1.5 rounded-control bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-hover"
            >
              搜索
              <ArrowRight className="hidden h-3.5 w-3.5 sm:block" />
            </button>
          </div>
        </form>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-medium text-text-tertiary">热门搜索</span>
          {HOT_SEARCHES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => router.push(`/search?q=${encodeURIComponent(item)}`)}
              className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-text-secondary transition-colors hover:border-brand-soft hover:bg-brand-subtle hover:text-brand"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
