import { freeTools, getTools } from '../data/tools.js'
import { MediaCard } from '../components/ToolCards.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Link from '../components/Link.jsx'

export default function Tools({ filter, page = 1 }) {
  const pageSize = 12
  const base = filter === 'free' ? freeTools() : getTools()
  const list = [...base].sort((a, b) => String(b.published || b.updated).localeCompare(String(a.published || a.updated)))
  const visible = page * pageSize
  const href = filter === 'free' ? '/tools/free' : '/tools'

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: '工具', to: '/tools' }]} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary lg:text-4xl">AI 工具库</h1>
        <p className="mt-3 max-w-2xl text-text-secondary">发现和使用最新的 AI 工具，提升你的工作效率</p>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.slice(0, visible).map((tool) => (
          <MediaCard key={tool.slug} tool={tool} />
        ))}
      </div>
      {visible < list.length ? (
        <div className="mt-8 text-center">
          <Link
            to={`${href}?page=${page + 1}`}
            className="inline-flex h-10 items-center rounded-control border border-border bg-surface-raised px-5 text-sm font-medium text-text-primary hover:border-brand-soft hover:text-brand"
          >
            加载更多
          </Link>
        </div>
      ) : null}
    </div>
  )
}
