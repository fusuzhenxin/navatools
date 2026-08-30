import Home from '../src/views/Home.jsx'
import JsonLd from '../src/components/JsonLd.jsx'
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from '../src/lib/seo.js'

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
          description: DEFAULT_DESCRIPTION,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_URL}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      <Home />
    </>
  )
}
