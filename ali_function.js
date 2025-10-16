// 反代 api.kurobbs.com —— 阿里云 边缘函数
const targetHost = "api.kurobbs.com";

export default {
  async fetch(request) {
    // CORS 预检
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
      // 1. 构造上游请求
      const url = new URL(request.url);
      const upstream = new Request(`https://${targetHost}${url.pathname}${url.search}`, request);

      // 2. 修正 Host 头
      upstream.headers.set("Host", targetHost);

      // 3. 默认 UA
      if (!upstream.headers.has("User-Agent")) {
        upstream.headers.set(
          "User-Agent",
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        );
      }

      // 4. 删除阿里云特有的“身份”请求头
      upstream.headers.delete("x-forwarded-for");
      upstream.headers.delete("x-real-ip");
      upstream.headers.delete("x-edge-location");
      upstream.headers.delete("x-edge-request-id");

      // 5. 发送请求
      const response = await fetch(upstream);

      // 6. 处理响应头
      const newHeaders = new Headers(response.headers);
      newHeaders.set("Access-Control-Allow-Origin", "*");
      newHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      newHeaders.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Requested-With",
      );
      newHeaders.set("Access-Control-Max-Age", "86400");
      newHeaders.delete("server");
      newHeaders.delete("x-powered-by");
      newHeaders.delete("x-edge-location");
      newHeaders.delete("x-edge-request-id");

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    } catch (error) {
      // 7. 统一异常返回
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
  },
};
