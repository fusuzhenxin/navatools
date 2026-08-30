import Profile from '../../src/views/Profile.jsx'
import { staticMeta } from '../../src/lib/seo.js'

export const metadata = staticMeta('profile')

export default function Page() {
  return <Profile />
}
