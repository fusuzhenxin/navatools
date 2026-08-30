import Breadcrumb from '../components/Breadcrumb.jsx'
import Link from '../components/Link.jsx'

export default function InsightDetail({ item, others = [] }) {
  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">未找到该观察</h1>
        <Link to="/insights" className="mt-4 inline-block text-brand">返回 AI观察</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Breadcrumb items={[{ label: 'AI观察', to: '/insights' }, { label: item.title }]} />
      <p className="text-sm text-text-tertiary">{item.kind} · {item.date}</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight lg:text-4xl">{item.title}</h1>
      <p className="mt-5 max-w-[760px] text-lg leading-8 text-text-secondary sm:text-xl sm:leading-9">{item.excerpt}</p>
      <article className="mt-10 max-w-[760px] space-y-5 text-[17px] leading-8 text-text-secondary sm:text-[18px] sm:leading-9">
        {(item.content || []).map((block, index) => {
          if (typeof block === 'string') return <p key={index}>{block}</p>
          if (block.type === 'h2') return <h2 key={index} className="mt-12 text-2xl font-bold text-text-primary">{block.text}</h2>
          return <p key={index}>{block.text}</p>
        })}
      </article>
      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">继续阅读</h2>
        <div className="space-y-3">
          {others.map((other) => (
            <Link key={other.slug} to={`/insights/${other.slug}`} className="block rounded-card border border-border p-4 hover:border-brand-soft">
              <div className="text-xs text-text-tertiary">{other.kind}</div>
              <div className="mt-1 font-semibold">{other.title}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
