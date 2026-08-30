import About from '../../src/views/About.jsx'
import { staticMeta } from '../../src/lib/seo.js'

export const metadata = staticMeta('about')

export default function Page() {
  return <About />
}
