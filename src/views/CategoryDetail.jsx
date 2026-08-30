import Breadcrumb from '../components/Breadcrumb.jsx'
import Link from '../components/Link.jsx'
import { CompactSideCard, MediaCard } from '../components/ToolCards.jsx'

export default function CategoryDetail({ cat, tools = [], sidebar = [], page = 1 }) {
  const visible = page * 12

  if (!cat) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">未找到该分类</h1>
        <Link to="/tools" className="mt-4 inline-block text-brand">返回工具库</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: '工具', to: '/tools' }, { label: '分类', to: '/categories' }, { label: cat.name }]} />

      <div className="mb-8 rounded-panel border border-border bg-surface-raised p-6 shadow-card sm:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-card border border-border bg-surface-muted sm:h-20 sm:w-20">
            <span className="text-4xl sm:text-6xl">{cat.icon}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="mb-2 text-2xl font-bold text-text-primary sm:text-3xl">{cat.name}</h1>
            <p className="text-base leading-relaxed text-text-secondary sm:text-lg">{cat.desc}</p>
            <div className="mt-4 text-sm text-text-tertiary">
              共收录 <span className="font-medium text-text-primary">{cat.count}</span> 个相关工具
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          {tools.length ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {tools.slice(0, visible).map((tool) => (
                  <MediaCard key={tool.slug} tool={tool} />
                ))}
              </div>
              {visible < tools.length ? (
                <div className="mt-8 text-center">
                  <Link
                    to={`/categories/${cat.slug}?page=${page + 1}`}
                    className="inline-flex h-10 items-center rounded-md bg-brand px-6 text-sm font-medium text-brand-foreground hover:bg-brand-hover"
                  >
                    加载更多
                  </Link>
                </div>
              ) : null}
            </>
          ) : (
            <div className="rounded-card border border-border bg-surface-raised p-10 text-center text-text-secondary">
              该分类正在持续收录中，欢迎先浏览其他分类或提交新工具。
            </div>
          )}
        </div>

        <aside>
          <div className="rounded-panel border border-border bg-surface-raised p-4 lg:sticky lg:top-24">
            <h3 className="mb-3 text-base font-semibold text-text-primary">精选工具</h3>
            <div className="grid grid-cols-1 gap-3">
              {sidebar.map((tool) => (
                <CompactSideCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
