import Link from './Link.jsx'
import { ChevronRight, House } from 'lucide-react'

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1 overflow-x-auto text-sm text-text-secondary sm:mb-6">
      <Link to="/" className="flex flex-shrink-0 items-center gap-1 transition-colors hover:text-text-primary">
        <House className="h-4 w-4" />
      </Link>
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-1 flex-shrink-0">
          <ChevronRight className="h-4 w-4 text-text-tertiary" />
          {item.to && i < items.length - 1 ? (
            <Link to={item.to} className="whitespace-nowrap transition-colors hover:text-text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="whitespace-nowrap font-medium text-text-primary">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
