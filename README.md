# 🚀 RoverProxy - 多平台反向代理解决方案

> 🎯 支持多种反向代理部署方案

# 默认端口

> 7860

## 📚 详细文档

- [📱 Termux 部署指南](./docs/termux-deploy.md) - 手机部署 + 异地组网配置
- [🤗 Hugging Face 部署指南](./docs/huggingface-deploy.md) - Hugging Face Spaces 部署
- [☁️ Cloudflare Workers 部署指南](./docs/cloudflare-deploy.md) - Cloudflare Workers 部署
- [🔺 Vercel 部署指南](./docs/vercel-deploy.md) - Vercel 部署
- [🌐 EdgeOne边缘函数 部署指南](./docs/edgeone-deploy.md) - 腾讯云EdgeOne边缘函数部署
- [🚂 Railway 部署指南](./docs/railway-deploy.md) - Railway 部署
- [🚀 Claw Cloud 部署指南](./docs/claw-cloud-deploy.md) - Claw Cloud 部署
- [☁️ Google Cloud Run 部署指南](./docs/google-cloud-run-deploy.md) - Google Cloud Run 部署
- [🚀 AWS Lambda 部署指南](./docs/aws-lambda-deploy.md) - AWS Lambda 部署
- [🐱 Ali ESA 部署指南](./docs/ali-function-deploy.md) - 阿里 ESA 部署
- [ 🦕 Deno 部署指南](./docs/deno-deploy.md) - Deno 部署
- [🐳 Docker 部署指南](./docs/docker-deploy.md) - Docker 部署
- [📦 Node.js 部署指南](./docs/nodejs-deploy.md) - 本地部署

## 📁 项目结构

```
RoverProxy/
├── docs/                             # 📚 详细文档
│   ├── termux-deploy.md              # Termux 部署指南
│   ├── docker-deploy.md              # Docker 部署指南
│   ├── nodejs-deploy.md              # Node.js 部署指南
│   ├── huggingface-deploy.md         # Hugging Face 部署指南
│   ├── cloudflare-deploy.md          # Cloudflare 部署指南
│   ├── vercel-deploy.md              # Vercel 部署指南
│   ├── edgeone-deploy.md             # EdgeOne边缘函数 部署指南
│   ├── railway-deploy.md             # Railway 部署指南
│   ├── claw-cloud-deploy.md          # Claw Cloud 部署指南
│   ├── google-cloud-run-deploy.md    # Google Cloud Run 部署指南
│   ├── ali-function-deploy.md        # 阿里 ESA 部署指南
│   ├── deno-deploy.md                # Deno 部署指南
│   └── aws-lambda-deploy.md          # AWS Lambda 部署指南
├── proxy-js/                         # Node.js 代理服务
│   ├── server.js                     # 主服务文件
│   ├── package.json                  # 依赖配置
│   ├── Dockerfile                    # Docker 镜像配置
│   └── docker-compose.yml            # Docker Compose 配置
├── proxy-nginx-docker/               # Nginx Docker 方案
│   ├── nginx.conf                    # Nginx 配置
│   ├── Dockerfile                    # Docker 镜像配置
│   └── docker-compose.yml            # Docker Compose 配置
├── vercel-proxy/                     # Vercel 部署方案
│   ├── api/[...path].js              # Vercel API 路由
│   ├── vercel.json                   # Vercel 配置文件
│   ├── package.json                  # 项目配置
│   └── README.md                     # 使用说明
├── install_nginx_proxy.sh            # Termux Nginx 一键安装脚本
├── railway.toml                      # Railway 配置文件
├── edgeone_function.js               # EdgeOne边缘函数 代码
├── aws_lambda.js                     # AWS Lambda 函数代码
├── deno_proxy.ts                     # Deno 代码
├── cloudflare_worker.js              # Cloudflare Workers 代码
├── wrangler.toml                     # Cloudflare 配置文件
└── package.json                      # Cloudflare package.json
```

## 免责声明

本项目仅供学习和研究使用，不得用于任何商业目的。使用本项目所产生的一切法律责任和风险由用户自行承担，与项目作者无关。