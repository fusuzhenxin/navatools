import Link from './Link.jsx'
import { ExternalLink, Eye } from 'lucide-react'
import { PriceBadge, CategoryChip } from './Badge.jsx'
import StarRating from './StarRating.jsx'
import { coverUrl, formatViews, iconUrl } from '../lib/utils.js'

export function ToolRowCard({ tool }) {
  return (
    <div className="group relative flex flex-col rounded-card border border-border bg-surface-raised p-4 shadow-card transition-colors hover:border-brand-soft hover:shadow-card-hover">
      <PriceBadge price={tool.price} chinese={tool.chinese} className="absolute top-3 right-3 z-10 max-w-[45%]" />
      <Link to={`/tools/${tool.slug}`} className="flex gap-3.5">
        <div className="flex flex-shrink-0 items-center justify-center overflow-hidden border border-border bg-surface-muted h-16 w-16 rounded-lg p-1.5">
          <img src={iconUrl(tool.icon)} alt={tool.name} className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mb-1 flex items-start justify-between gap-2 pr-24">
            <h3 className="line-clamp-1 flex-1 text-base font-semibold text-text-primary transition-colors group-hover:text-brand">
              {tool.name}
            </h3>
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">{tool.desc}</p>
        </div>
      </Link>
    </div>
  )
}

export function FeaturedCard({ tool }) {
  return (
    <div className="relative group">
      <Link
        to={`/tools/${tool.slug}`}
        className="group block overflow-hidden rounded-card border border-border bg-surface-raised shadow-card transition-colors hover:border-brand-soft hover:shadow-card-hover"
      >
        <div className="relative overflow-hidden rounded-t-card border-b border-border bg-brand-subtle">
          <div className="flex flex-wrap gap-1.5 absolute top-3 left-3 z-10">
            {tool.tags.slice(0, 3).map((tag, i) => (
              <CategoryChip key={tag} name={tag} index={i} />
            ))}
          </div>
          <div className="relative aspect-[2/1] w-full overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200">
            <img src={coverUrl(tool.cover)} alt={tool.name} className="h-full w-full object-cover object-top shadow-sm transition-transform group-hover:scale-105" />
          </div>
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-lg font-semibold text-text-primary group-hover:text-brand">{tool.name}</h3>
            <span className="rounded-md border border-brand-soft bg-brand-subtle px-2 py-0.5 text-xs font-medium text-brand">精选</span>
          </div>
          <p className="line-clamp-2 text-sm text-text-secondary">{tool.desc}</p>
          {(tool.price || tool.chinese) && (
            <div className="pt-1">
              <PriceBadge price={tool.price} chinese={tool.chinese} className="justify-start" />
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export function FreeCard({ tool }) {
  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="group relative block rounded-card border border-border bg-surface-raised p-4 shadow-card transition-colors hover:border-brand-soft hover:shadow-card-hover"
    >
      <PriceBadge price={tool.price || '免费'} chinese={tool.chinese} className="absolute top-3 right-3 z-10 max-w-[45%]" />
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-muted p-1">
          <img src={iconUrl(tool.icon)} alt={tool.name} className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105" />
        </div>
        <h3 className="truncate text-lg font-semibold text-text-primary group-hover:text-brand">{tool.name}</h3>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-text-secondary">{tool.desc}</p>
      <div className="mt-2 flex max-h-[26px] flex-wrap gap-2 overflow-hidden">
        {tool.tags.slice(0, 3).map((tag, i) => (
          <CategoryChip key={tag} name={tag} index={i} />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-text-secondary">
        <StarRating value={tool.rating} />
        <span className="inline-flex items-center gap-1">
          <Eye className="h-3.5 w-3.5" />
          {formatViews(tool.views)} 浏览
        </span>
      </div>
    </Link>
  )
}

export function MediaCard({ tool }) {
  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="group block overflow-hidden rounded-card border border-border bg-surface-raised shadow-card transition-colors hover:border-brand-soft hover:shadow-card-hover"
    >
      <div className="relative aspect-[2/1] overflow-hidden bg-surface-muted">
        <img src={coverUrl(tool.cover)} alt={tool.name} className="h-full w-full object-cover object-top transition-transform group-hover:scale-105" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {tool.tags.slice(0, 3).map((tag, i) => (
            <CategoryChip key={tag} name={tag} index={i} />
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="truncate text-lg font-semibold text-text-primary group-hover:text-brand">{tool.name}</h3>
          <PriceBadge price={tool.price} chinese={tool.chinese} />
        </div>
        <p className="line-clamp-2 text-sm text-text-secondary">{tool.desc}</p>
      </div>
    </Link>
  )
}

export function CompactSideCard({ tool }) {
  const isFree = tool.price?.includes('免费') || tool.price === '免费'
  return (
    <article className="group relative rounded-card border border-border bg-surface-raised p-3 transition-colors hover:border-brand-soft hover:bg-brand-subtle focus-within:ring-2 focus-within:ring-brand/20">
      <Link to={`/tools/${tool.slug}`} className="absolute inset-0 z-0 rounded-card focus:outline-none" aria-label={`查看 ${tool.name} 工具详情`} />
      <div className="pointer-events-none relative z-10 flex gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-muted p-1">
          <img src={iconUrl(tool.icon)} alt={tool.name} className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-start gap-1.5">
            <div className="flex min-w-0 flex-1 items-center gap-1.5">
              <h4 className="min-w-0 truncate text-sm font-semibold leading-5 text-text-primary group-hover:text-brand">{tool.name}</h4>
              {tool.website ? (
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto flex-shrink-0 rounded-sm text-text-tertiary transition-colors hover:text-brand"
                  aria-label={`访问 ${tool.name} 官网`}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
            {tool.price ? (
              <span
                className={`inline-flex w-fit shrink-0 items-center justify-center truncate rounded-md border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${
                  isFree ? 'border-success-soft bg-success-soft text-success' : 'border-warning-soft bg-warning-soft text-warning'
                }`}
              >
                {tool.price}
              </span>
            ) : null}
          </div>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-text-secondary">
            {tool.tags[0] ? <span className="font-semibold text-text-primary">{tool.tags[0]}</span> : null}
            {tool.tags[0] ? ' ' : null}
            {tool.desc}
          </p>
        </div>
      </div>
    </article>
  )
}
