import Tools from '../../src/views/Tools.jsx'
import { staticMeta } from '../../src/lib/seo.js'

export const metadata = staticMeta('tools')

export default async function Page({ searchParams }) {
  const params = await searchParams
  return <Tools page={Number(params.page) || 1} />
}
