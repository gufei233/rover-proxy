export const handler = async (event) => {
  const targetHost = "api.kurobbs.com";
  const targetUrl = `https://${targetHost}`;

  const method = event.requestContext.http.method;

  if (method === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Max-Age": "86400",
      },
      body: "",
    };
  }

  try {
    const path = event.rawPath;

    if (path === "/favicon.ico") {
      return {
        statusCode: 404,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: "",
      };
    }

    const queryString = event.rawQueryString ? `?${event.rawQueryString}` : "";
    const proxyUrl = `${targetUrl}${path}${queryString}`;

    const headers = new Headers();
    Object.entries(event.headers || {}).forEach(([key, value]) => {
      const lowerKey = key.toLowerCase();
      if (
        !lowerKey.startsWith("x-forwarded-") &&
        !lowerKey.startsWith("x-amzn-") &&
        !lowerKey.startsWith("x-amz-")
      ) {
        headers.set(key, value);
      }
    });

    headers.set("Host", targetHost);

    if (!headers.has("User-Agent")) {
      headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
    }

    let body = null;

    if (method !== "GET" && method !== "HEAD" && event.body) {
      body = event.body;

      if (event.isBase64Encoded) {
        body = Buffer.from(body, "base64").toString("utf8");
      }
    }

    // console.log(`请求: ${proxyUrl} | Headers: ${JSON.stringify(Object.fromEntries(headers.entries()))} | Body: ${body || 'null'}`)

    const response = await fetch(proxyUrl, {
      method: method,
      headers: headers,
      body: body,
    });

    const responseHeaders = Object.fromEntries(response.headers.entries());
    responseHeaders["Access-Control-Allow-Origin"] = "*";

    const responseBody = await response.text();

    // console.log(`响应: ${response.status} | ${responseBody.substring(0, 200)}${responseBody.length > 200 ? '...' : ''}`)

    return {
      statusCode: response.status,
      headers: responseHeaders,
      body: responseBody,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "代理请求失败",
        message: error.message,
        timestamp: new Date().toISOString(),
      }),
    };
  }
};
