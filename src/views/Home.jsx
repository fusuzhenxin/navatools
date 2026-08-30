import { featuredTools, freeTools, newTools, trendingTools } from '../data/tools.js'
import SectionHeader from '../components/SectionHeader.jsx'
import { FeaturedCard, FreeCard, ToolRowCard } from '../components/ToolCards.jsx'
import HomeSearch from '../components/HomeSearch.jsx'

export default function Home() {
  return (
    <div>
      <HomeSearch />
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section>
          <SectionHeader title="最新上线" to="/tools/new" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {newTools().slice(0, 6).map((tool) => (
              <ToolRowCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="热门工具" to="/tools/trending" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {trendingTools().slice(0, 9).map((tool) => (
              <ToolRowCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="本站精选" to="/tools/featured" more="查看全部 →" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools().slice(0, 24).map((tool) => (
              <FeaturedCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="免费工具" to="/tools/free" more="查看全部 →" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {freeTools().slice(0, 12).map((tool) => (
              <FreeCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
