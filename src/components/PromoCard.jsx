import { ArrowUpRight } from 'lucide-react'
import { PROMOS } from '../data/promos.js'

export function PromoTopBar({ promo = PROMOS[0] }) {
  if (!promo) return null

  return (
    <a
      href={promo.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border-b border-brand-soft bg-gradient-to-r from-brand-subtle via-surface-raised to-warning-soft/70"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:gap-4 sm:px-6 sm:py-3 lg:px-8">
        <img
          src={promo.logo}
          alt={`${promo.name} logo`}
          className="h-10 w-10 flex-shrink-0 rounded-lg border border-border bg-surface-raised object-contain p-1 sm:h-11 sm:w-11"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-sm font-semibold text-text-primary group-hover:text-brand sm:text-base">{promo.name}</span>
            <span className="hidden text-sm text-text-tertiary sm:inline">{promo.tagline}</span>
          </div>
          <p className="mt-0.5 truncate text-xs leading-5 text-text-secondary sm:text-sm">{promo.desc}</p>
        </div>
        <span className="inline-flex h-9 flex-shrink-0 items-center justify-center gap-1 rounded-control bg-brand px-3 text-sm font-medium text-white transition-colors group-hover:bg-brand-hover sm:h-10 sm:px-4">
          {promo.cta}
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  )
}

export function PromoBanner({ promo = PROMOS[0] }) {
  if (!promo) return null

  return (
    <a
      href={promo.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col gap-4 overflow-hidden rounded-card border border-brand-soft bg-gradient-to-r from-brand-subtle via-surface-raised to-warning-soft/60 p-4 shadow-card transition-colors hover:border-brand hover:shadow-card-hover sm:flex-row sm:items-center sm:p-5"
    >
      <div className="flex min-w-0 flex-1 items-start gap-3.5 sm:items-center">
        <img
          src={promo.logo}
          alt={`${promo.name} logo`}
          className="h-14 w-14 flex-shrink-0 rounded-xl border border-border bg-surface-raised object-contain p-1.5"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-text-primary group-hover:text-brand">{promo.name}</span>
            <span className="text-sm text-text-tertiary">{promo.tagline}</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">{promo.desc}</p>
        </div>
      </div>
      <span className="inline-flex h-10 flex-shrink-0 items-center justify-center gap-1 rounded-control bg-brand px-4 text-sm font-medium text-white transition-colors group-hover:bg-brand-hover">
        {promo.cta}
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </a>
  )
}

export function PromoSideCard({ promo = PROMOS[0] }) {
  if (!promo) return null

  return (
    <a
      href={promo.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-card border border-brand-soft bg-gradient-to-b from-brand-subtle to-warning-soft/60 p-4 shadow-card transition-colors hover:border-brand hover:shadow-card-hover"
    >
      <div className="flex items-start gap-3">
        <img
          src={promo.logo}
          alt={`${promo.name} logo`}
          className="h-14 w-14 flex-shrink-0 rounded-xl border border-border bg-surface-raised object-contain p-1.5"
        />
        <div className="min-w-0 flex-1">
          <h4 className="text-base font-semibold text-text-primary group-hover:text-brand">{promo.name}</h4>
          <p className="mt-0.5 text-sm text-text-secondary">{promo.tagline}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-text-secondary">{promo.desc}</p>
      <span className="mt-3 inline-flex h-10 w-full items-center justify-center gap-1 rounded-control bg-brand px-4 text-sm font-medium text-white transition-colors group-hover:bg-brand-hover">
        {promo.cta}
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </a>
  )
}
