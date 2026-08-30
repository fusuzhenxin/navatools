import Insights from '../../src/views/Insights.jsx'
import { getInsights } from '../../src/data/tools.js'
import { staticMeta } from '../../src/lib/seo.js'

export const metadata = staticMeta('insights')

export default function Page() {
  return <Insights insights={getInsights()} />
}
