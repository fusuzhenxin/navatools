import ToolCollection from '../../../src/views/ToolCollection.jsx'
import { trendingTools } from '../../../src/data/tools.js'
import { PAGES, staticMeta } from '../../../src/lib/seo.js'

export const metadata = staticMeta('toolsTrending')

export default function Page() {
  const page = PAGES.toolsTrending
  return <ToolCollection title={page.heading} desc={page.lead} tools={trendingTools()} card="row" />
}
