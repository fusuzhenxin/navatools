import Link from '../components/Link.jsx'
import { CATEGORIES } from '../data/categories.js'

const TASKS = [
  { title: '搭建网站', desc: '从想法到落地页，用低代码和 Agent 快速生成站点。', slug: 'low-code-ai' },
  { title: 'AI 智能体', desc: '把对话变成可执行任务，覆盖客服、编程和办公自动化。', slug: 'ai-agents' },
  { title: '视频生成', desc: '从一句话、剧本或素材生成短剧、广告和成片。', slug: 'video-creation' },
  { title: '代码助手', desc: '补全、生成、审查和端到端交付，减少重复开发。', slug: 'code-writing' },
  { title: '学术研究', desc: '文献检索、翻译、概念图和论文润色。', slug: 'learning-tools' },
  { title: '营销增长', desc: '内容生产、达人数据和跨境店铺洞察。', slug: 'marketing-tools' },
]

export default function Tasks() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-bold">浏览 AI 任务</h1>
      <p className="mt-3 max-w-2xl text-text-secondary">从你想完成的事情出发，而不是从工具名字出发。每个任务都会连到对应分类和代表工具。</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {TASKS.map((task) => {
          const cat = CATEGORIES.find((c) => c.slug === task.slug)
          return (
            <Link key={task.title} to={`/categories/${task.slug}`} className="rounded-card border border-border bg-surface-raised p-6 shadow-card hover:border-brand-soft">
              <div className="text-2xl">{cat?.icon}</div>
              <h2 className="mt-3 text-xl font-bold">{task.title}</h2>
              <p className="mt-2 text-sm text-text-secondary">{task.desc}</p>
              <div className="mt-4 text-sm text-brand">查看相关工具 →</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
