import Link from './Link.jsx'

export default function SectionHeader({ title, to, more = '查看更多 →' }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
      <h2 className="text-2xl font-bold tracking-normal text-text-primary">{title}</h2>
      {to ? (
        <Link to={to} className="inline-flex shrink-0 items-center text-sm font-medium text-brand hover:text-brand-hover">
          {more}
        </Link>
      ) : null}
    </div>
  )
}
