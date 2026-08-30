import Link from '../components/Link.jsx'

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-bold">隐私政策</h1>
      <p className="mt-4 leading-7 text-text-secondary">欢迎使用 NovaTools。我们高度重视您的隐私与数据安全。本隐私政策详细说明了我们如何收集、使用、存储和保护您的个人信息。</p>
      <h2 className="mt-10 text-2xl font-bold">信息收集</h2>
      <p className="mt-3 leading-7 text-text-secondary">我们可能收集您在使用 NovaTools 服务时主动提供的信息，如注册信息、联系方式等；以及使用过程中产生的使用数据、设备信息和日志数据。</p>
      <h2 className="mt-10 text-2xl font-bold">信息使用</h2>
      <p className="mt-3 leading-7 text-text-secondary">收集的信息将用于提升产品体验、优化服务内容、保障账户安全，以及在征得您同意的情况下向您发送服务通知或营销信息。</p>
      <h2 className="mt-10 text-2xl font-bold">信息共享与披露</h2>
      <p className="mt-3 leading-7 text-text-secondary">除法律法规要求或征得您授权同意外，NovaTools 不会将您的个人信息出售、出租或泄露给任何第三方。</p>
      <h2 className="mt-10 text-2xl font-bold">数据安全</h2>
      <p className="mt-3 leading-7 text-text-secondary">我们采取多种安全技术和管理措施保护您的信息，防止数据的丢失、滥用、未经授权访问或泄露。</p>
      <p className="mt-6 text-sm text-text-secondary">
        如有疑问，请通过 <a className="text-brand" href="mailto:2201219073@qq.com">2201219073@qq.com</a>、微信号 S_7512 或 <Link className="text-brand" to="/contact">联系页面</Link> 与我们沟通。
      </p>
    </div>
  )
}
