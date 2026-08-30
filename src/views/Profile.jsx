'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { ToolRowCard } from '../components/ToolCards.jsx'
import Link from '../components/Link.jsx'

export default function Profile() {
  const { user, setLoginOpen, logout, favorites } = useAuth()
  const [saved, setSaved] = useState([])

  useEffect(() => {
    if (!favorites.length) {
      setSaved([])
      return
    }
    const params = new URLSearchParams({ slugs: favorites.join(',') })
    fetch(`/api/tools?${params}`)
      .then((res) => (res.ok ? res.json() : []))
      .then(setSaved)
      .catch(() => setSaved([]))
  }, [favorites])

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">我的</h1>
        <p className="mt-3 text-text-secondary">登录后可以查看收藏的工具，并提交新产品。</p>
        <button type="button" onClick={() => setLoginOpen(true)} className="mt-6 rounded-control bg-brand px-5 py-2 text-sm text-white">
          登录
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="mt-1 text-sm text-text-secondary">{user.email}</p>
        </div>
        <button type="button" onClick={logout} className="text-sm text-text-secondary hover:text-text-primary">
          退出登录
        </button>
      </div>
      <h2 className="mt-10 mb-4 text-xl font-bold">我的收藏</h2>
      {saved.length ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {saved.map((tool) => (
            <ToolRowCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="rounded-card border border-border p-8 text-sm text-text-secondary">
          还没有收藏。去 <Link className="text-brand" to="/tools">工具库</Link> 挑几个值得跟进的产品吧。
        </div>
      )}
    </div>
  )
}
