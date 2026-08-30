import ToolCollection from '../../../src/views/ToolCollection.jsx'
import { featuredTools } from '../../../src/data/tools.js'
import { PAGES, staticMeta } from '../../../src/lib/seo.js'

export const metadata = staticMeta('toolsFeatured')

export default function Page() {
  const page = PAGES.toolsFeatured
  return <ToolCollection title={page.heading} desc={page.lead} tools={featuredTools()} card="featured" />
}
