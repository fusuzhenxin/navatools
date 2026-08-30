import Link from '../components/Link.jsx'

const audiences = ['内容创作者和自媒体团队', '开发者、产品经理和设计师', '市场、销售和运营团队', '教育、研究和知识工作者']

const entries = [
  { title: '工具库', desc: '浏览不同类型的 AI 应用，查看简介、分类、价格线索和相关工具。', to: '/tools', label: '查看工具库' },
  { title: '榜单与专题', desc: '通过精选、趋势、免费工具和任务页快速缩小选择范围。', to: '/tools/featured', label: '查看精选' },
  { title: 'AI观察', desc: '关注工具趋势、产品变化和选型思路，理解 AI 应用背后的真实场景。', to: '/insights', label: '查看 AI观察' },
]

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-sm font-medium text-brand">About NovaTools</p>
      <h1 className="mt-3 text-4xl font-bold leading-tight">让 AI 工具选择变得更清楚</h1>
      <p className="mt-4 text-lg leading-8 text-text-secondary">
        NovaTools 关注一个具体问题：当新的 AI 应用不断出现时，中文用户怎样更快判断哪一个真正适合自己的工作流。我们把工具、任务、分类、榜单和内容连接起来，减少反复搜索和盲目试错。
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/tools" className="rounded-control bg-brand px-4 py-2 text-sm font-medium text-white">探索 AI 工具</Link>
        <Link to="/submit" className="rounded-control border border-border px-4 py-2 text-sm font-medium">提交工具</Link>
      </div>

      <h2 className="mt-14 text-2xl font-bold">我们正在做什么</h2>
      <p className="mt-3 leading-7 text-text-secondary">
        NovaTools 不是简单的链接集合。我们希望用更贴近日常工作的方式组织 AI 工具：你可以从工具名称进入，也可以从“我想完成什么任务”开始；可以看最新收录，也可以通过免费、精选、趋势和专题内容找到更稳妥的起点。
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          ['按真实任务组织工具', '我们更关注用户要完成什么，而不只是工具属于哪个热门标签。'],
          ['把发现和判断放在一起', '工具库、免费工具、精选工具、趋势榜单和专题内容相互连接。'],
          ['持续更新而非一次性收录', '围绕新发布、功能变化、定价信息和使用反馈持续整理。'],
        ].map(([title, desc]) => (
          <div key={title} className="rounded-card border border-border p-5">
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-2xl font-bold">适合谁使用</h2>
      <p className="mt-3 text-text-secondary">如果你正在为个人创作、团队效率、产品研发或业务增长寻找 AI 工具，NovaTools 可以作为日常选型和持续跟进的入口。</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {audiences.map((item) => (
          <li key={item} className="rounded-card border border-border bg-surface-raised px-4 py-3 text-sm">{item}</li>
        ))}
      </ul>

      <h2 className="mt-14 text-2xl font-bold">从这些入口开始</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {entries.map((item) => (
          <div key={item.title} className="rounded-card border border-border p-5">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{item.desc}</p>
            <Link to={item.to} className="mt-4 inline-block text-sm text-brand">{item.label}</Link>
          </div>
        ))}
      </div>

      <section className="mt-14 rounded-panel bg-brand-subtle p-8">
        <h2 className="text-2xl font-bold">一起完善 AI 工具发现体验</h2>
        <p className="mt-3 text-text-secondary">欢迎提交新工具、反馈页面信息，或与我们交流合作。</p>
        <div className="mt-5 flex gap-3">
          <Link to="/contact" className="text-sm font-medium text-brand">联系我们</Link>
          <Link to="/submit" className="text-sm font-medium text-brand">提交 AI 工具</Link>
        </div>
      </section>
    </div>
  )
}
