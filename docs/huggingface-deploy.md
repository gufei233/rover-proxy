# 🤗 Hugging Face Spaces 部署指南

> 在 Hugging Face Spaces 免费平台上部署 RoverProxy 反向代理服务

## 📋 部署步骤

### 1. 创建 Hugging Face Space

1. 访问 [Hugging Face Spaces](https://huggingface.co/spaces)
2. 点击 "Create new Space"
3. 配置参数：
   - **Space name**: `rover-proxy`（或您喜欢的名称）
   - **SDK**: 选择 `Docker`
   - **Hardware**: `CPU basic`（免费版本）
   - **Visibility**: `Public`

### 2. 准备部署文件

将以下文件复制到您的 Space 仓库中：

```
your-hf-space/
├── server.js              # 从 proxy-js/server.js 复制
├── package.json           # 从 proxy-js/package.json 复制  
├── package-lock.json      # 从 proxy-js/package-lock.json 复制
├── Dockerfile             # 从 proxy-js/Dockerfile 复制
└── .env                   # 需要新建，内容见下方（可选，默认7860端口）
```

### 3. 环境配置

**新建** `.env` 文件，内容为：
```env
PROXY_PORT=7860
```

> 💡 **注意**: 7860 是 Hugging Face Spaces 的标准端口，请勿修改

### 4. 部署和访问

1. 将文件推送到您的 Space 仓库
2. Hugging Face 会自动构建和部署
3. 部署完成后，访问地址为：`https://your-username-rover-proxy.hf.space`
