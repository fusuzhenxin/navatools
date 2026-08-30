const TONES = {
  brand: 'border-brand-soft bg-brand-soft text-brand',
  success: 'border-success-soft bg-success-soft text-success',
  info: 'border-info-soft bg-info-soft text-info',
  warning: 'border-warning-soft bg-warning-soft text-warning',
  muted: 'border-border bg-surface-muted text-text-secondary',
}

export default function Badge({ children, tone = 'brand', className = '' }) {
  if (!children) return null
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap ${TONES[tone] || TONES.brand} ${className}`}
    >
      {children}
    </span>
  )
}

export function PriceBadge({ price, chinese, className = '' }) {
  if (!price && !chinese) return null
  const isFree = price?.includes('免费') || price === '免费'
  return (
    <div className={`flex flex-wrap items-center justify-end gap-1.5 ${className}`}>
      {price ? <Badge tone={isFree ? 'success' : 'warning'}>{price}</Badge> : null}
      {chinese ? <Badge tone="info">中文</Badge> : null}
    </div>
  )
}

export function CategoryChip({ name, to, index = 0 }) {
  const tones = ['brand', 'success', 'info']
  const Comp = to ? 'a' : 'span'
  return (
    <Comp
      href={to}
      className={`rounded-md border px-2 py-1 text-xs font-medium transition ${
        tones[index % 3] === 'brand'
          ? 'border-brand-soft bg-brand-soft text-brand'
          : tones[index % 3] === 'success'
            ? 'border-success-soft bg-success-soft text-success'
            : 'border-info-soft bg-info-soft text-info'
      }`}
    >
      {name}
    </Comp>
  )
}
