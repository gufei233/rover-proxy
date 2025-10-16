# 🐳 Docker 部署指南

> 使用 Docker 容器化部署 RoverProxy

## Nginx Docker 方式
```bash
# 克隆项目
git clone https://github.com/tyql688/RoverProxy.git
cd RoverProxy/proxy-nginx-docker

# 使用默认端口7860启动
docker-compose up -d

# 或指定自定义端口启动
PROXY_PORT=8080 docker-compose up -d
```

## Node.js Docker 方式
```bash
# 克隆项目
git clone https://github.com/tyql688/RoverProxy.git
cd RoverProxy/proxy-js

# 使用默认端口7860启动
docker-compose up -d

```

## 已有镜像部署
```bash
docker run -d -p 7860:7860 tyql688/rover-proxy:latest

```