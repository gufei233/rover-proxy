# ☁️ Cloudflare Workers 部署指南

> 使用 Cloudflare Workers 无服务器平台部署 RoverProxy，享受全球 CDN 加速

## 🚀 一键部署（推荐）

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/tyql688/RoverProxy)

**最简单的部署方式**：
1. 点击上方按钮
2. 登录 Cloudflare 账号
3. 确认部署
4. 获得代理地址：`https://kurobbs-proxy.your-subdomain.workers.dev`

## 📋 手动部署

1. 复制 [`cloudflare_worker.js`](../cloudflare_worker.js) 的代码
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
3. 创建新的 Worker，命名为 `kurobbs-proxy`
4. 粘贴代码并部署
