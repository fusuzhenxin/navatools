import nodemailer from 'nodemailer'

const LIMIT = 5
const WINDOW_MS = 10 * 60 * 1000
const hits = new Map()

export function tooMany(ip) {
  const now = Date.now()
  const list = (hits.get(ip) || []).filter((time) => now - time < WINDOW_MS)
  if (list.length >= LIMIT) return true
  list.push(now)
  hits.set(ip, list)
  return false
}

function text(value, max = 2000) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, max)
}

export function readSubmission(body) {
  const name = text(body.name, 80)
  const website = text(body.website, 300)
  const intro = text(body.intro, 2000)
  if (!name || !website || !intro) return { error: 'required' }
  if (body.website2) return { error: 'spam' }

  let url = website
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`
  try {
    const parsed = new URL(url)
    if (!['http:', 'https:'].includes(parsed.protocol)) return { error: 'url' }
  } catch {
    return { error: 'url' }
  }

  return {
    name,
    website: url,
    intro,
    category: text(body.category, 80),
    tags: text(body.tags, 200),
    price: text(body.price, 40),
    email: text(body.email, 120),
    note: text(body.note, 2000),
  }
}

function line(label, value) {
  return value ? `${label}：${value}` : ''
}

const QQ_SMTP_HOSTS = ['183.47.101.192']

function smtpTargets(host) {
  if (!host || host === 'smtp.qq.com') return QQ_SMTP_HOSTS
  return [host]
}

export async function sendToolSubmission(item) {
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.SMTP_TO || user
  if (!user || !pass) throw new Error('smtp-missing')

  const host = process.env.SMTP_HOST || 'smtp.qq.com'
  const port = Number(process.env.SMTP_PORT || 465)
  const targets = smtpTargets(host)
  const body = [
    line('工具名称', item.name),
    line('官网', item.website),
    line('简介', item.intro),
    line('分类', item.category),
    line('标签', item.tags),
    line('定价', item.price),
    line('联系邮箱', item.email),
    line('备注', item.note),
  ]
    .filter(Boolean)
    .join('\n')

  const mail = {
    from: `"ToolLu 工具提交" <${user}>`,
    to,
    replyTo: item.email || undefined,
    subject: `新工具提交：${item.name}`,
    text: body,
  }

  let last
  for (const target of targets) {
    try {
      const transporter = nodemailer.createTransport({
        host: target,
        port,
        secure: port === 465,
        auth: { user, pass },
        tls: host === 'smtp.qq.com' || !host ? { servername: 'smtp.qq.com' } : undefined,
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
      })
      await transporter.sendMail(mail)
      return
    } catch (error) {
      last = error
      console.error('submit-smtp-target-failed', target, error?.code || '', error?.message || error)
    }
  }
  throw last || new Error('smtp-send-failed')
}
