# 🔺 Vercel 部署指南

> 使用 Vercel 无服务器平台部署 RoverProxy，享受全球边缘网络加速

## 🚀 一键部署（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tyql688/RoverProxy/tree/master/vercel-proxy)

**最简单的部署方式**：
1. 点击上方按钮
2. 登录 Vercel 账号
3. 确认部署
4. 获得代理地址：`https://your-project.vercel.app`

## 📋 手动部署

1. 克隆项目到本地：
   ```bash
   git clone https://github.com/tyql688/RoverProxy.git
   cd RoverProxy/vercel-proxy
   ```

2. 安装 Vercel CLI：
   ```bash
   npm install -g vercel
   ```

3. 登录并部署：
   ```bash
   vercel login
   vercel --prod
   ```