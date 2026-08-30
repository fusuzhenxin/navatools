import { FeaturedCard, FreeCard, MediaCard, ToolRowCard } from '../components/ToolCards.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'

const CARDS = {
  row: ToolRowCard,
  featured: FeaturedCard,
  free: FreeCard,
  media: MediaCard,
}

export default function ToolCollection({ title, desc, tools, card = 'row' }) {
  const Card = CARDS[card] || MediaCard

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: '工具', to: '/tools' }, { label: title }]} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">{title}</h1>
        <p className="mt-3 max-w-2xl text-text-secondary">{desc}</p>
      </header>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Card key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  )
}
