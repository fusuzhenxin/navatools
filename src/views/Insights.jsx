import Breadcrumb from '../components/Breadcrumb.jsx'
import Link from '../components/Link.jsx'
import { PAGE_LEADS } from '../lib/copy.js'

export default function Insights({ insights = [] }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'AI观察' }]} />
      <p className="text-sm font-medium text-brand">NovaTools Insights</p>
      <h1 className="mt-2 text-4xl font-bold">AI观察</h1>
      <p className="mt-4 max-w-2xl text-text-secondary">
        {PAGE_LEADS.insights}
      </p>
      <div className="mt-10 space-y-4">
        {insights.map((item) => (
          <article key={item.slug} className="rounded-card border border-border bg-surface-raised p-6 shadow-card hover:border-brand-soft">
            <div className="text-xs text-text-tertiary">
              {item.kind} · {new Date(item.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <h2 className="mt-2 text-xl font-bold leading-snug">
              <Link to={`/insights/${item.slug}`} className="hover:text-brand">{item.title}</Link>
            </h2>
            <p className="mt-3 text-sm leading-7 text-text-secondary">{item.excerpt}</p>
            <Link to={`/insights/${item.slug}`} className="mt-4 inline-block text-sm font-medium text-brand">
              阅读详情
            </Link>
          </article>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-text-tertiary">已经到底了</p>
    </div>
  )
}
