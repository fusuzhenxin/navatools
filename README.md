# ToolLu

站点域名：[www.toollu.cn](https://www.toollu.cn)。使用 Next.js 服务端渲染，工具详情、分类和观察页会直接输出 HTML，便于搜索引擎收录。

```bash
npm install
npm run crawl
npm run dev
```

- 本地预览：http://127.0.0.1:3000
- 正式地址：https://www.toollu.cn
- `NEXT_PUBLIC_SITE_URL` 已设为 `https://www.toollu.cn`，sitemap、canonical、Open Graph 都走这个域名
- `npm run crawl` 从公开源站读取工具数据，写入 `public/data/tools.json`
