'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { IMG, NAV } from '../data/site.js'
import { useAuth } from '../context/AuthContext.jsx'
import Link from './Link.jsx'
import NavLink from './NavLink.jsx'

export default function Header() {
  const router = useRouter()
  const { user, setLoginOpen, logout } = useAuth()
  const [q, setQ] = useState('')
  const [mobileSearch, setMobileSearch] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const value = q.trim()
    if (!value) return
    router.push(`/search?q=${encodeURIComponent(value)}`)
    setMobileSearch(false)
  }

  return (
    <>
      <header className="md:hidden border-b border-border sticky top-0 z-50 bg-surface-raised/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Link to="/" className="relative w-7 h-7 rounded-lg overflow-hidden">
                <img src={IMG.logo} alt="NovaTools Icon" className="h-7 w-7 object-cover" />
              </Link>
              <Link to="/" className="flex items-center h-7">
                <img src={IMG.banner} alt="NovaTools Banner" className="h-10 w-[120px] object-contain" />
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-lg text-text-secondary hover:bg-surface-muted hover:text-brand"
                aria-label="打开搜索"
                onClick={() => setMobileSearch((v) => !v)}
              >
                <Search className="h-5 w-5" />
              </button>
              {user ? (
                <Link to="/profile" className="text-sm font-medium text-brand">
                  {user.name}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setLoginOpen(true)}
                  className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-control bg-brand px-4 text-sm font-medium text-brand-foreground shadow-card transition hover:bg-brand-hover"
                >
                  登录
                </button>
              )}
            </div>
          </div>
          {mobileSearch ? (
            <form className="pb-3" onSubmit={submit}>
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="搜索 AI 工具..."
                className="h-10 w-full rounded-control border border-input bg-surface px-3 text-sm outline-none focus:border-brand"
              />
            </form>
          ) : null}
        </div>
      </header>

      <header className="hidden md:block sticky top-0 z-50 w-full px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="relative flex items-center justify-between h-14 px-6 rounded-panel bg-surface-raised/85 backdrop-blur-xl border border-border shadow-card animate-fade-in">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="relative w-8 h-8 rounded-md overflow-hidden transition-transform group-hover:scale-110">
                  <img src={IMG.logo} alt="NovaTools Icon" className="h-full w-full object-cover" />
                </div>
                <img src={IMG.banner} alt="NovaTools Banner" className="h-8 w-[100px] object-contain group-hover:opacity-80 transition-opacity" />
              </Link>
              <nav className="flex items-center gap-1">
                {NAV.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `relative px-4 py-2 text-sm font-medium transition-colors group ${
                        isActive ? 'text-brand' : 'text-text-secondary hover:text-brand'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        <span
                          className={`absolute inset-x-4 bottom-1 h-0.5 rounded-full bg-brand transition-transform origin-left ${
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-64 transition-all duration-300 focus-within:w-80">
                <form className="relative w-full max-w-sm" onSubmit={submit}>
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    className="border-input flex h-9 w-full min-w-0 rounded-control border bg-surface-raised px-3 py-1 pl-10 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus-visible:border-brand focus-visible:ring-[3px] focus-visible:ring-brand/20"
                    placeholder="搜索 AI 工具..."
                  />
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
                </form>
              </div>
              <div className="h-6 w-px bg-border mx-2" />
              {user ? (
                <div className="flex items-center gap-3">
                  <Link to="/profile" className="text-sm font-medium text-text-primary hover:text-brand">
                    {user.name}
                  </Link>
                  <button type="button" onClick={logout} className="text-sm text-text-secondary hover:text-text-primary">
                    退出
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setLoginOpen(true)}
                  className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-control bg-brand px-4 text-sm font-medium text-brand-foreground shadow-card transition hover:bg-brand-hover"
                >
                  登录
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
