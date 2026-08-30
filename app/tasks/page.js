import Tasks from '../../src/views/Tasks.jsx'
import { staticMeta } from '../../src/lib/seo.js'

export const metadata = staticMeta('tasks')

export default function Page() {
  return <Tasks />
}
