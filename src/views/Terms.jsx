import Link from '../components/Link.jsx'

export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-bold">服务条款</h1>
      <p className="mt-4 leading-7 text-text-secondary">欢迎使用 NovaTools！在使用本平台前，请务必仔细阅读并理解以下服务条款。使用 NovaTools 即表示您同意并接受所有条款内容。</p>
      <h2 className="mt-10 text-2xl font-bold">使用规则</h2>
      <p className="mt-3 leading-7 text-text-secondary">您同意在使用 NovaTools 提供的服务时遵守所有适用的法律法规，并不得利用本平台进行任何违法、侵权或不当行为。我们保留在任何时候终止或限制您使用权限的权利，尤其是在违反使用规则时。</p>
      <h2 className="mt-10 text-2xl font-bold">内容与责任</h2>
      <h3 className="mt-5 font-semibold">工具信息</h3>
      <p className="mt-2 leading-7 text-text-secondary">NovaTools 致力于提供最新、最准确的 AI 工具信息，但不对内容的完整性、准确性或适用性作任何保证。用户需自行判断并承担使用后果。</p>
      <h3 className="mt-5 font-semibold">第三方链接</h3>
      <p className="mt-2 leading-7 text-text-secondary">本平台可能包含指向第三方网站的链接。这些链接仅为方便用户而提供，我们不对第三方网站的内容、政策或行为负责。</p>
      <h3 className="mt-5 font-semibold">用户行为</h3>
      <p className="mt-2 leading-7 text-text-secondary">用户在平台上发布的任何内容（如评论、分享）应符合法律法规，并对自己的言论与行为独立承担全部责任。</p>
      <h2 className="mt-10 text-2xl font-bold">知识产权</h2>
      <p className="mt-3 leading-7 text-text-secondary">NovaTools 上的所有内容，包括但不限于文字、图片、图标、界面设计和数据库信息，均受相关知识产权法保护。未经授权，任何人不得以任何形式使用或转载平台内容。</p>
      <h2 className="mt-10 text-2xl font-bold">条款修改与更新</h2>
      <p className="mt-3 leading-7 text-text-secondary">NovaTools 有权根据运营需要随时更新服务条款。更新后的条款将在本页面发布，并自发布时立即生效。</p>
      <p className="mt-6 text-sm text-text-secondary">
        如有疑问，请前往 <Link to="/contact" className="text-brand">联系我们</Link>。
      </p>
    </div>
  )
}
