import { CONTACT, IMG } from '../data/site.js'

export default function Contact() {
  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-bold">联系我们</h1>
      <p className="mt-3 text-text-secondary">有问题、合作或建议，可以通过邮箱、微信、Gitee 或小红书联系。</p>

      <div className="mt-8 rounded-panel border border-border bg-surface-raised p-6 shadow-card">
        <img src={IMG.wechat} alt="微信公众号" className="mx-auto h-48 w-48 rounded-md bg-white object-contain" />
        <p className="mt-4 text-center text-sm text-text-secondary">扫码关注公众号</p>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-text-tertiary">微信号</dt>
            <dd className="font-medium">{CONTACT.wechat}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-text-tertiary">邮箱</dt>
            <dd>
              <a className="font-medium text-brand" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-text-tertiary">GitHub</dt>
            <dd>
              <a className="font-medium text-brand" href={CONTACT.github} target="_blank" rel="noreferrer">
                gitee.com/su_zhenhui
              </a>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-text-tertiary">小红书</dt>
            <dd>
              <a className="font-medium text-brand" href={CONTACT.xiaohongshuUrl} target="_blank" rel="noreferrer">
                {CONTACT.xiaohongshu}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
