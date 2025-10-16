# 📱 Termux 部署指南

> 在 Android 手机上使用 Termux 部署 RoverProxy 反向代理服务

## 一键安装 (自动使用默认端口7860)，推荐新手使用
```bash
curl -fsSL https://raw.githubusercontent.com/tyql688/RoverProxy/master/install_nginx_proxy.sh | bash
```

## 指定端口安装
```bash
curl -fsSL https://raw.githubusercontent.com/tyql688/RoverProxy/master/install_nginx_proxy.sh | bash -s -- -p 2233
```

## 🌐 异地组网配置

### ZeroTier (推荐新手)
1. 访问 [ZeroTier官网](https://www.zerotier.com/) 注册账号，[客户端下载](https://download.zerotier.com/RELEASES/)
2. 创建网络并获取Network ID
3. 手机安装ZeroTier客户端加入网络
4. 服务器也安装ZeroTier加入同一网络
5. 使用虚拟IP访问代理服务

### Tailscale (推荐高级用户)
1. 访问 [Tailscale官网](https://tailscale.com/) 注册账号，[客户端下载](https://tailscale.com/download/)
2. 手机和服务器都安装Tailscale客户端
3. 使用Tailscale分配的IP地址访问