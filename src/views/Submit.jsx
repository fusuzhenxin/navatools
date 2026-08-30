'use client'

import { useState } from 'react'
import Link from '../components/Link.jsx'
import { CATEGORIES } from '../data/categories.js'

const ERRORS = {
  required: '请填写工具名称、官网和简介。',
  url: '官网地址格式不对，请填写可访问的链接。',
  limit: '提交太频繁，请稍后再试。',
  send: '邮件没发出去，请稍后再试或直接发邮件给我们。',
  invalid: '提交失败，请检查后再试。',
}

export default function Submit() {
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-sm font-medium text-brand">面向 AI 工具开发者与增长团队</p>
      <h1 className="mt-3 text-4xl font-bold leading-tight">提交你的 AI 工具，触达正在寻找解决方案的用户</h1>
      <p className="mt-4 max-w-2xl text-text-secondary">
        NovaTools 会把优质工具呈现在分类、搜索、详情页和后续推广场景中，帮助供应商获得更精准的自然发现机会。
      </p>
      <div className="mt-6 flex gap-3">
        <a href="#form" className="rounded-control bg-brand px-4 py-2 text-sm text-white">免费提交</a>
        <Link to="/contact" className="rounded-control border border-border px-4 py-2 text-sm">了解加速收录</Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          ['独立详情页', '审核通过后生成'],
          ['搜索曝光', '承接明确需求'],
          ['推广机会', '支持后续升级'],
        ].map(([t, d]) => (
          <div key={t} className="rounded-card border border-border p-5">
            <h3 className="font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-text-secondary">{d}</p>
          </div>
        ))}
      </div>

      <section id="form" className="mt-12 rounded-panel border border-border bg-surface-raised p-6">
        <h2 className="text-2xl font-bold">免费提交工具</h2>
        <p className="mt-2 text-sm text-text-secondary">提交后会发到我们的邮箱，审核通过后进入工具目录。</p>
        <form
          className="mt-6 grid gap-3"
          onSubmit={async (e) => {
            e.preventDefault()
            setError('')
            setDone(false)
            const form = e.currentTarget
            const data = Object.fromEntries(new FormData(form).entries())
            setSending(true)
            try {
              const res = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
              })
              const result = await res.json().catch(() => ({}))
              if (!res.ok || !result.ok) {
                setError(ERRORS[result.error] || ERRORS.send)
                return
              }
              setDone(true)
              form.reset()
            } catch {
              setError(ERRORS.send)
            } finally {
              setSending(false)
            }
          }}
        >
          <input name="website2" tabIndex={-1} autoComplete="off" className="hidden" />
          <input name="name" required className="h-11 rounded-control border border-input px-3 text-sm" placeholder="工具名称*" />
          <input name="website" required className="h-11 rounded-control border border-input px-3 text-sm" placeholder="官网地址*" />
          <textarea name="intro" required rows={4} className="rounded-control border border-input px-3 py-2 text-sm" placeholder="简短介绍*" />
          <select name="category" className="h-11 rounded-control border border-input px-3 text-sm">
            <option value="">所属分类</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.name}>{c.name}</option>
            ))}
          </select>
          <input name="tags" className="h-11 rounded-control border border-input px-3 text-sm" placeholder="关键词标签" />
          <select name="price" className="h-11 rounded-control border border-input px-3 text-sm">
            <option value="">定价模式请选择</option>
            <option>免费</option>
            <option>免费增值</option>
            <option>试用</option>
            <option>付费</option>
            <option>定制报价</option>
          </select>
          <input name="email" type="email" className="h-11 rounded-control border border-input px-3 text-sm" placeholder="联系邮箱" />
          <textarea name="note" rows={3} className="rounded-control border border-input px-3 py-2 text-sm" placeholder="备注" />
          <button className="h-11 rounded-control bg-brand text-sm font-medium text-white disabled:opacity-60" type="submit" disabled={sending}>
            {sending ? '正在发送…' : '提交'}
          </button>
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          {done ? <p className="text-sm text-success">已发送到邮箱，我们会尽快审核。</p> : null}
        </form>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">收录不是结束，是获得持续发现的开始</h2>
        <p className="mt-3 max-w-2xl leading-7 text-text-secondary">
          我们会优先审核信息完整、官网可访问、定位清晰的工具。简介写清楚核心卖点，更容易获得高质量展示。
        </p>
      </section>

      <h2 className="mt-14 text-2xl font-bold">收录路径</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {[
          ['免费', '标准收录', '进入正常审核队列'],
          ['即将开放', '加速审核', '提交后可升级优先处理'],
          ['商务合作', '推广曝光', '适合新品发布和增长活动'],
        ].map(([tag, title, desc]) => (
          <div key={title} className="rounded-card border border-border p-5">
            <span className="text-xs text-brand">{tag}</span>
            <h3 className="mt-2 font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
