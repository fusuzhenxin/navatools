import ToolCollection from '../../../src/views/ToolCollection.jsx'
import { newTools } from '../../../src/data/tools.js'
import { PAGES, staticMeta } from '../../../src/lib/seo.js'

export const metadata = staticMeta('toolsNew')

export default function Page() {
  const page = PAGES.toolsNew
  return <ToolCollection title={page.heading} desc={page.lead} tools={newTools()} card="row" />
}
