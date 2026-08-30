'use client'

import { House, LayoutGrid, Search, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { CONTACT, FOOTER, IMG } from '../data/site.js'
import Link from './Link.jsx'
import NavLink from './NavLink.jsx'

const mobileItems = [
  { to: '/', label: '首页', icon: House },
  { to: '/tools', label: '发现', icon: Search },
  { to: '/insights', label: '观察', icon: LayoutGrid },
  { to: '/profile', label: '我的', icon: User },
]

export default function Footer() {
  const pathname = usePathname()
  const activeIndex = Math.max(
    0,
    mobileItems.findIndex((item) => (item.to === '/' ? pathname === '/' : pathname.startsWith(item.to))),
  )

  return (
    <>
      <footer className="bg-gray-900 text-gray-300 mt-auto hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative w-[120px] h-[40px]">
                  <img src={IMG.banner} alt="NovaTools Logo" className="h-full w-full object-contain brightness-0 invert" />
                </div>
                <p className="mt-4 text-sm text-gray-400 text-center lg:text-left">{FOOTER.about}</p>
                <p className="mt-2 text-sm text-gray-400 text-center lg:text-left">{FOOTER.mission}</p>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-center lg:text-left">关于</h3>
              <ul className="space-y-2 text-center lg:text-left">
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/about">关于我们</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/contact">联系我们</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/submit">工具提交</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-center lg:text-left">法律</h3>
              <ul className="space-y-2 text-center lg:text-left">
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/terms">服务条款</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/privacy">隐私政策</Link></li>
                <li><Link className="text-gray-400 hover:text-white transition-colors" to="/faq">常见问题</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-center lg:text-left">关注我们</h3>
              <p className="text-sm text-gray-400 text-center lg:text-left mb-2">微信公众号</p>
              <img src={IMG.wechat} alt="微信公众号" className="mx-auto lg:mx-0 h-28 w-28 rounded-md bg-white object-contain p-1" />
              <p className="mt-3 text-sm text-gray-400 text-center lg:text-left">微信号 {CONTACT.wechat}</p>
              <a className="mt-1 block text-sm text-gray-400 text-center lg:text-left hover:text-white" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
              <div className="mt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-sm">
                <a href={CONTACT.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                  GitHub
                </a>
                <a href={CONTACT.xiaohongshuUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                  小红书 {CONTACT.xiaohongshu}
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-sm leading-7 text-gray-400">{FOOTER.seo}</p>
            <nav className="mt-4 flex flex-wrap gap-x-3 gap-y-2" aria-label="热门搜索">
              {FOOTER.keywords.map((item) => (
                <Link key={item.label} to={item.to} className="text-xs text-gray-500 hover:text-gray-300">
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="mt-6 text-sm text-gray-500">© 2026 NovaTools</p>
          </div>
        </div>
      </footer>

      <footer className="fixed bottom-0 z-50 w-full bg-surface-raised/90 backdrop-blur-xl border-t border-border md:hidden shadow-popover">
        <div className="relative h-0.5 bg-surface-muted">
          <div
            className="absolute top-0 h-full bg-brand rounded-full transition-all"
            style={{ left: `${activeIndex * 25}%`, width: '25%', transform: 'scaleX(0.6)', transformOrigin: 'center' }}
          />
        </div>
        <nav className="flex justify-around items-center h-16 px-2">
          {mobileItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                aria-label={item.label}
                className={({ isActive }) =>
                  `relative flex flex-col items-center justify-center text-xs min-w-[64px] h-12 px-3 py-1 rounded-xl transition-colors ${
                    isActive ? 'text-brand bg-brand-soft' : 'text-text-tertiary hover:text-text-secondary'
                  }`
                }
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </footer>
    </>
  )
}
