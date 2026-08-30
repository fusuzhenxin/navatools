export const SITE_NAME = 'NovaTools'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.toollu.cn'
export const DEFAULT_TITLE = 'NovaTools - AI 工具发现与推荐平台'
export const DEFAULT_DESCRIPTION =
  'NovaTools 是面向任务的 AI 工具发现与推荐平台，帮助你更快找到能解决问题的那一个。'

export const PAGES = {
  tools: {
    title: 'AI 工具库 - NovaTools | 探索最新最全的 AI 工具',
    description: '发现和使用最新的 AI 工具，提升你的工作效率。',
    path: '/tools',
    heading: 'AI 工具库',
    lead: '发现和使用最新的 AI 工具，提升你的工作效率',
  },
  toolsNew: {
    title: '最新上线 - NovaTools',
    description: '刚刚收录进 NovaTools 的新工具，适合第一时间试用和跟踪。',
    path: '/tools/new',
    heading: '最新上线',
    lead: '刚刚收录进 NovaTools 的新工具，适合第一时间试用和跟踪。',
  },
  toolsTrending: {
    title: '热门工具 - NovaTools',
    description: '近期关注度更高、讨论更多的 AI 工具。',
    path: '/tools/trending',
    heading: '热门工具',
    lead: '近期关注度更高、讨论更多的 AI 工具。',
  },
  toolsFeatured: {
    title: '本站精选 - NovaTools',
    description: '编辑筛选后的代表性工具，适合作为更稳妥的起点。',
    path: '/tools/featured',
    heading: '本站精选',
    lead: '编辑筛选后的代表性工具，适合作为更稳妥的起点。',
  },
  toolsFree: {
    title: '免费工具 - NovaTools',
    description: '低门槛试用的免费或含免费档位工具。',
    path: '/tools/free',
    heading: '免费工具',
    lead: '低门槛试用的免费或含免费档位工具。',
  },
  categories: {
    title: 'AI 工具分类导航 | 功能、行业与技术维度 - NovaTools',
    description: '按功能、行业与技术维度浏览 AI 工具，快速发现适合开发、设计、营销、教育、自动化与企业协作场景的智能工具。',
    path: '/categories',
  },
  insights: {
    title: 'AI观察 - NovaTools',
    description: '聚合 AI 工具、产品发布、工作流和趋势判断，帮助你快速找到值得继续阅读和尝试的信息。',
    path: '/insights',
  },
  about: {
    title: '关于 NovaTools - AI 工具发现、评测与选型平台',
    description: '了解 NovaTools 如何按任务、分类、榜单和 AI观察组织 AI 工具，帮助你更快判断哪一个适合自己的工作流。',
    path: '/about',
  },
  contact: {
    title: '联系我们 | NovaTools 官方联系页面',
    description: '有问题、合作或建议？欢迎通过 2201219073@qq.com 或微信号 S_7512 联系。',
    path: '/contact',
  },
  submit: {
    title: '提交 AI 工具 - NovaTools',
    description: '提交你的 AI 工具，进入 NovaTools 分类、搜索和详情页，触达正在寻找解决方案的用户。',
    path: '/submit',
  },
  faq: {
    title: '常见问题 - NovaTools AI 工具发现与选型指南',
    description: '了解如何发现 AI 工具、理解榜单和 AI观察、提交工具，以及在选型时需要注意什么。',
    path: '/faq',
  },
  terms: {
    title: '服务条款 | NovaTools AI工具平台',
    description: '使用 NovaTools 前请阅读服务条款，了解使用规则、内容责任与第三方链接说明。',
    path: '/terms',
  },
  privacy: {
    title: '隐私政策 | NovaTools',
    description: '了解 NovaTools 如何收集、使用、存储和保护你的个人信息。',
    path: '/privacy',
  },
  profile: {
    title: '我的 - NovaTools',
    description: '登录后查看收藏的 AI 工具并提交新产品。',
    path: '/profile',
    noIndex: true,
  },
  tasks: {
    title: '浏览 AI 任务 - NovaTools',
    description: '从你想完成的事情出发，而不是从工具名字出发。每个任务都会连到对应分类和代表工具。',
    path: '/tasks',
  },
  search: {
    title: '搜索 - NovaTools',
    description: '搜索 NovaTools 收录的 AI 工具、分类和观察内容。',
    path: '/search',
    noIndex: true,
  },
}

export function absoluteUrl(path = '/') {
  return new URL(path, `${SITE_URL.replace(/\/$/, '')}/`).toString()
}

export function pageMeta({ title, description, path, image, noIndex = false }) {
  const url = absoluteUrl(path)
  const desc = description || DEFAULT_DESCRIPTION
  return {
    title,
    description: desc,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      siteName: SITE_NAME,
      title,
      description: desc,
      url,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description: desc,
      images: image ? [image] : undefined,
    },
  }
}

export function staticMeta(key) {
  return pageMeta(PAGES[key])
}

export function searchMeta(q = '') {
  return pageMeta({
    title: q ? `搜索：${q} - NovaTools` : PAGES.search.title,
    description: q ? `查找与「${q}」相关的 AI 工具和 AI 观察。` : PAGES.search.description,
    path: q ? `/search?q=${encodeURIComponent(q)}` : '/search',
    noIndex: true,
  })
}

export function stripHtml(text = '') {
  return String(text)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function aboutParagraphs(about = '') {
  const raw = String(about || '')
  if (!raw) return []
  if (/<p[\s>]/i.test(raw)) {
    return raw
      .split(/<\/p>/i)
      .map((chunk) => stripHtml(chunk.replace(/<p[^>]*>/i, '')))
      .filter(Boolean)
  }
  return raw.split(/\n\n+/).map((part) => part.trim()).filter(Boolean)
}
