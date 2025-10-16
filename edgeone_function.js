// EdgeOne边缘函数反代脚本 - 代理api.kurobbs.com
// 适用于腾讯云EdgeOne边缘函数Serverless

async function handleRequest(event) {
  const { request } = event;

  // 目标API地址
  const targetHost = "api.kurobbs.com";

  // 处理OPTIONS预检请求
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  try {
    // 解析请求URL
    const urlInfo = new URL(request.url);

    // 构建代理请求
    const proxyRequest = new Request(`https://${targetHost}${urlInfo.pathname}${urlInfo.search}`, {
      method: request.method,
      body: request.body,
      headers: request.headers,
      copyHeaders: true,
    });

    // 设置正确的Host头
    proxyRequest.headers.set("Host", targetHost);

    // 设置User-Agent（如果需要的话）
    if (!proxyRequest.headers.has("User-Agent")) {
      proxyRequest.headers.set(
        "User-Agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      );
    }

    // 删除EdgeOne特有的headers和可能导致问题的headers
    proxyRequest.headers.delete("x-forwarded-for");
    proxyRequest.headers.delete("x-real-ip");
    proxyRequest.headers.delete("x-edge-location");
    proxyRequest.headers.delete("x-edge-request-id");
    proxyRequest.headers.delete("cf-connecting-ip");
    proxyRequest.headers.delete("cf-ipcountry");
    proxyRequest.headers.delete("cf-ray");
    proxyRequest.headers.delete("cf-visitor");

    // 发送请求到目标服务器
    const response = await fetch(proxyRequest);

    // 设置CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With",
    );
    response.headers.set("Access-Control-Max-Age", "86400");

    // 删除可能暴露代理信息的响应头
    response.headers.delete("server");
    response.headers.delete("x-powered-by");
    response.headers.delete("x-edge-location");
    response.headers.delete("x-edge-request-id");

    return response;
  } catch (error) {
    // 错误处理
    return new Response(
      JSON.stringify({
        error: "代理请求失败",
        message: error.message,
        timestamp: new Date().toISOString(),
        target: targetHost,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event));
});
