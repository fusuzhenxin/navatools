import { Star } from 'lucide-react'

export default function StarRating({ value = 0 }) {
  return (
    <div className="flex items-center gap-1 text-warning">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = value >= i + 1
        const half = !filled && value > i
        return (
          <Star
            key={i}
            width={14}
            height={14}
            fill={filled || half ? 'currentColor' : 'none'}
            className={filled ? 'fill-opacity-100' : half ? 'fill-opacity-50' : 'fill-opacity-20'}
          />
        )
      })}
    </div>
  )
}
