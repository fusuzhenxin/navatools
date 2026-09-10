export default function Brand({ compact = false, invert = false }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`flex items-center justify-center rounded-md font-bold ${
          compact ? 'h-7 w-7 text-xs' : 'h-8 w-8 text-sm'
        } ${invert ? 'bg-white text-gray-900' : 'bg-brand text-white'}`}
      >
        T
      </span>
      <span className={`font-bold tracking-tight ${compact ? 'text-base' : 'text-lg'} ${invert ? 'text-white' : 'text-text-primary'}`}>
        ToolLu
      </span>
    </span>
  )
}
