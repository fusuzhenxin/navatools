import Categories from '../../src/views/Categories.jsx'
import { staticMeta } from '../../src/lib/seo.js'

export const metadata = staticMeta('categories')

export default function Page() {
  return <Categories />
}
