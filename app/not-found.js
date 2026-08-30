import Link from '../src/components/Link.jsx'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-sm font-medium text-brand">404</p>
      <h1 className="mt-2 text-3xl font-bold">页面不存在</h1>
      <p className="mt-3 text-text-secondary">这个地址没有对应的工具、分类或内容页。</p>
      <Link to="/" className="mt-6 inline-block text-brand">返回首页</Link>
    </div>
  )
}
