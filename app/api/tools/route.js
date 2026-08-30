import { getTool } from '../../../src/data/tools.js'

export async function GET(request) {
  const slugs = new URL(request.url).searchParams.get('slugs')?.split(',').filter(Boolean) || []
  return Response.json(slugs.map((slug) => getTool(slug)).filter(Boolean))
}
