import ToolCollection from '../../../src/views/ToolCollection.jsx'
import { freeTools } from '../../../src/data/tools.js'
import { PAGES, staticMeta } from '../../../src/lib/seo.js'

export const metadata = staticMeta('toolsFree')

export default function Page() {
  const page = PAGES.toolsFree
  return <ToolCollection title={page.heading} desc={page.lead} tools={freeTools()} card="free" />
}
