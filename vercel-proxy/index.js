const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// 启用 CORS
app.use(cors());

// 代理所有请求到 api.kurobbs.com
app.use('/', createProxyMiddleware({
  target: 'https://api.kurobbs.com',
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    // 转发原始 Authorization 头
    if (req.headers.authorization) {
      proxyReq.setHeader('Authorization', req.headers.authorization);
    }
    
    // 设置 User-Agent
    if (!req.headers['user-agent']) {
      proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    }
    
    // 删除 Vercel 相关 headers
    proxyReq.removeHeader('x-vercel-id');
    proxyReq.removeHeader('x-vercel-cache');
    proxyReq.removeHeader('x-vercel-execution-region');
    proxyReq.removeHeader('x-forwarded-for');
    proxyReq.removeHeader('x-forwarded-host');
    proxyReq.removeHeader('x-forwarded-proto');
    
    console.log('Proxying request:', req.method, req.url);
  },
  onProxyRes: (proxyRes, req) => {
    // 添加 CORS 头
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With';
    
    console.log('Response status:', proxyRes.statusCode, 'for', req.method, req.url);
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err.message);
    res.status(500).json({
      error: '代理请求失败',
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }
}));

// Vercel 需要导出 app
module.exports = app;
