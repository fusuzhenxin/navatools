import Link from '../components/Link.jsx'
import { listCategories, listCategoryGroups } from '../data/categories.js'
import Breadcrumb from '../components/Breadcrumb.jsx'
import { PAGE_LEADS } from '../lib/copy.js'

export default function Categories() {
  const groups = listCategoryGroups()
  const categories = listCategories()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: '工具', to: '/tools' }, { label: '分类' }]} />
      <header className="mb-16">
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-text-primary lg:text-5xl">
          AI 工具<span className="text-brand">分类导航</span>
        </h1>
        <p className="hidden max-w-2xl text-lg leading-8 text-text-secondary lg:block">
          {PAGE_LEADS.categories}
        </p>
      </header>

      {groups.map((group) => (
        <section key={group.type} className="mb-14">
          <h2 className="text-2xl font-bold text-text-primary">{group.title}</h2>
          <p className="mt-2 mb-6 max-w-3xl text-text-secondary">{group.desc}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.filter((c) => c.type === group.type).map((cat) => (
              <Link key={cat.slug} to={`/categories/${cat.slug}`} aria-label={`查看 ${cat.name} 分类`} className="group block">
                <div className="relative h-full overflow-hidden rounded-card border border-border bg-surface-raised p-6 shadow-card transition-colors duration-200 hover:border-brand-soft hover:bg-brand-subtle">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-card border border-border bg-surface-muted text-xl transition-colors group-hover:border-brand-soft">
                        {cat.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate font-bold text-text-primary">{cat.name}</h3>
                        <span className="mt-1 inline-flex rounded-full bg-brand-soft px-2 py-0.5 text-xs text-brand">{cat.type}</span>
                      </div>
                    </div>
                    <span className="rounded-md bg-surface-muted px-2 py-0.5 text-xs text-text-secondary">{cat.count}</span>
                  </div>
                  <p className="line-clamp-3 text-sm leading-6 text-text-secondary">{cat.desc}</p>
                  <div className="mt-4 text-sm font-medium text-brand">查看分类 &gt;</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section className="mb-8 rounded-panel border border-border bg-brand-subtle px-6 py-10 text-center">
        <h2 className="text-2xl font-bold">没找到合适的 AI 工具？</h2>
        <p className="mx-auto mt-3 max-w-2xl text-text-secondary">NovaTools 持续收录全球优质 AI 工具，欢迎提交你发现的新工具或优秀产品。</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/submit" className="rounded-control bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover">
            提交 AI 工具
          </Link>
          <Link to="/tasks" className="rounded-control border border-border bg-surface-raised px-4 py-2 text-sm font-medium hover:border-brand-soft">
            浏览 AI 任务
          </Link>
        </div>
      </section>
    </div>
  )
}
