// 适用于 Deno Deploy

const targetHost = "api.kurobbs.com";
const targetUrl = `https://${targetHost}`;

function setCORSHeaders(headers: Headers) {
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  headers.set("Access-Control-Max-Age", "86400");
}

async function proxyHandler(req: Request): Promise<Response> {
  // 处理 OPTIONS 预检请求
  if (req.method === "OPTIONS") {
    const headers = new Headers();
    setCORSHeaders(headers);
    return new Response(null, { status: 200, headers });
  }

  const url = new URL(req.url);
  const proxyUrl = new URL(url.pathname + url.search, targetUrl);

  // 复制 headers
  const headers = new Headers(req.headers);
  headers.set("Host", targetHost);
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
  }
  // 删除 Deno 相关头部
  headers.delete("x-forwarded-for");
  headers.delete("x-real-ip");

  let body: BodyInit | null = null;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.arrayBuffer();
  }

  try {
    const resp = await fetch(proxyUrl.toString(), {
      method: req.method,
      headers,
      body: body && body.byteLength > 0 ? body : undefined,
    });
    // 构造响应
    const respHeaders = new Headers(resp.headers);
    setCORSHeaders(respHeaders);
    return new Response(resp.body, {
      status: resp.status,
      statusText: resp.statusText,
      headers: respHeaders,
    });
  } catch (err) {
    const headers = new Headers({ "Content-Type": "application/json" });
    setCORSHeaders(headers);
    return new Response(
      JSON.stringify({
        error: "代理请求失败",
        message: err.message,
        timestamp: new Date().toISOString(),
      }),
      { status: 500, headers },
    );
  }
}

// Deno Deploy 入口
// deno run -N deno_proxy.ts
if (typeof (globalThis as any).Deno !== "undefined" && (globalThis as any).Deno.serve) {
  (globalThis as any).Deno.serve(proxyHandler);
}
