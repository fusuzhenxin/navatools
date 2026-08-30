'use client'

import { useState } from 'react'
import Link from '../components/Link.jsx'

const GROUPS = [
  {
    title: '关于 NovaTools',
    desc: '了解平台定位、适合人群和当前重点建设方向。',
    items: [
      ['NovaTools 是什么？', 'NovaTools 是面向中文用户的 AI 工具发现与选型平台。我们按工具、任务、类别、榜单和 AI观察组织信息，帮助创作者、开发者、产品团队、运营和知识工作者更快找到适合自己工作流的 AI 应用。'],
      ['NovaTools 和普通 AI 工具导航有什么不同？', '我们不只做链接收录，更强调可比较、可判断和可继续探索。你可以从具体任务进入，也可以通过免费工具、精选工具、趋势榜单和 AI观察了解产品变化、使用场景和选型思路。'],
      ['NovaTools 未来重点会放在哪里？', '未来重点会放在更高质量的 AI 工具库、面向任务的选型入口、榜单体系，以及 /insights 下的 AI观察内容。'],
    ],
  },
  {
    title: '工具发现与选型',
    desc: '如何找到工具、理解分类，并判断是否值得试用。',
    items: [
      ['我应该从哪里开始找 AI 工具？', '如果你已经知道工具名称，可以直接搜索；如果你只知道要完成的任务，可以从任务页、分类页、免费工具、精选工具或趋势榜单开始。'],
      ['免费工具、精选工具和趋势工具有什么区别？', '免费工具强调低门槛试用，精选工具强调编辑筛选和代表性，趋势工具更关注近期热度、发布动态和用户关注度。'],
      ['NovaTools 会给出唯一的最佳工具答案吗？', '通常不会。AI 工具选型和预算、语言、团队流程、数据安全要求都有关。我们更倾向于帮你缩小范围、理解差异。'],
    ],
  },
  {
    title: 'AI观察与内容',
    desc: '了解 /insights 的定位，以及它和旧文章模块的关系。',
    items: [
      ['AI观察是什么？', 'AI观察是 NovaTools 用来跟踪 AI 工具趋势、产品发布、工作流变化和选型判断的内容模块。'],
      ['为什么不再重点更新早期文章模块？', '早期 /posts 模块已经不适合当前产品重点。后续新内容会更集中地放在 /insights。'],
    ],
  },
  {
    title: '提交、更新与合作',
    desc: '如何提交工具、反馈错误信息或联系 NovaTools。',
    items: [
      ['如何向 NovaTools 提交新的 AI 工具？', '你可以通过提交工具页面提供工具名称、官网链接、简介、分类建议和补充信息。'],
      ['提交工具后一定会被收录吗？', '不一定。我们会优先考虑可访问性、实际用途、信息完整度、用户价值和重复度。'],
      ['NovaTools 接受品牌合作或内容合作吗？', '可以交流，但合作内容需要保持清晰标识和基本客观性。'],
    ],
  },
  {
    title: '账号、收藏与隐私',
    desc: '账号能力、收藏工具和基础隐私说明。',
    items: [
      ['必须注册账号才能使用 NovaTools 吗？', '不需要。大部分工具浏览、分类、榜单和 AI观察内容都可以直接访问。'],
      ['收藏工具有什么作用？', '收藏适合把正在评估、准备试用或经常使用的工具保存起来。'],
    ],
  },
]

function Item({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border py-4">
      <button type="button" className="flex w-full items-center justify-between text-left font-medium" onClick={() => setOpen((v) => !v)}>
        {q}
        <span className="text-text-tertiary">{open ? '–' : '+'}</span>
      </button>
      {open ? <p className="mt-3 text-sm leading-7 text-text-secondary">{a}</p> : null}
    </div>
  )
}

export default function FAQ() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-medium text-brand">NovaTools FAQ</p>
      <h1 className="mt-2 text-4xl font-bold">常见问题</h1>
      <p className="mt-4 text-text-secondary">这里整理了 NovaTools 当前最重要的使用问题：如何发现 AI 工具、如何理解榜单和 AI观察、怎样提交工具，以及在选型时需要注意什么。</p>
      <div className="mt-5 flex gap-3">
        <Link to="/tools" className="text-sm text-brand">浏览 AI 工具</Link>
        <Link to="/insights" className="text-sm text-brand">查看 AI观察</Link>
      </div>
      {GROUPS.map((group) => (
        <section key={group.title} className="mt-10">
          <h2 className="text-2xl font-bold">{group.title}</h2>
          <p className="mt-2 text-sm text-text-secondary">{group.desc}</p>
          <div className="mt-4">
            {group.items.map(([q, a]) => (
              <Item key={q} q={q} a={a} />
            ))}
          </div>
        </section>
      ))}
      <section className="mt-12 rounded-panel bg-surface-muted p-6">
        <h2 className="text-xl font-bold">还有其他问题？</h2>
        <p className="mt-2 text-sm text-text-secondary">如果你想反馈工具信息、提交合作需求，或发现页面内容需要修正，可以直接联系我们。</p>
        <Link to="/contact" className="mt-3 inline-block text-sm text-brand">联系我们</Link>
      </section>
    </div>
  )
}
