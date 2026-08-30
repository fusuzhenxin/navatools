'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { IMG } from '../data/site.js'

export default function LoginModal() {
  const { loginOpen, setLoginOpen, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login')

  if (!loginOpen) return null

  const submit = (e) => {
    e.preventDefault()
    const name = email.split('@')[0] || 'Nova 用户'
    login({ name, email: email || `${name}@novatools.cn` })
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 p-4" onClick={() => setLoginOpen(false)}>
      <div
        className="w-full max-w-md rounded-panel border border-border bg-surface-raised p-6 shadow-popover"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={IMG.logo} alt="" className="h-8 w-8 rounded-md object-cover" />
            <h2 className="text-lg font-semibold text-text-primary">{mode === 'login' ? '登录 NovaTools' : '创建账号'}</h2>
          </div>
          <button type="button" className="rounded-lg p-1 text-text-tertiary hover:bg-surface-muted" onClick={() => setLoginOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mb-5 text-sm text-text-secondary">登录后可以收藏工具、提交产品和同步你的 AI 工具清单。</p>
        <form className="space-y-3" onSubmit={submit}>
          <input
            className="h-10 w-full rounded-control border border-input bg-surface-raised px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            placeholder="邮箱"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="h-10 w-full rounded-control border border-input bg-surface-raised px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            placeholder="密码"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="inline-flex h-10 w-full items-center justify-center rounded-control bg-brand text-sm font-medium text-brand-foreground hover:bg-brand-hover"
          >
            {mode === 'login' ? '登录' : '注册并登录'}
          </button>
        </form>
        <button
          type="button"
          className="mt-4 text-sm text-brand hover:text-brand-hover"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login' ? '没有账号？创建新账号' : '已有账号？返回登录'}
        </button>
      </div>
    </div>
  )
}
