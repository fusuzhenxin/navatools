import { readSubmission, sendToolSubmission, tooMany } from '../../../src/lib/mail.js'

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  if (tooMany(ip)) return Response.json({ ok: false, error: 'limit' }, { status: 429 })

  let body = {}
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'invalid' }, { status: 400 })
  }

  const item = readSubmission(body)
  if (item.error) return Response.json({ ok: false, error: item.error }, { status: 400 })

  try {
    await sendToolSubmission(item)
    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false, error: 'send' }, { status: 500 })
  }
}
