import { ANALYTICS_SERVICE_URL } from "./config";

export async function proxyRequestToAnalytics(request: Request) {
  const targetUrl = new URL("/api/send", ANALYTICS_SERVICE_URL);

  const headers = new Headers();
  for (const [key, value] of request.headers) {
    const keyLower = key.toLowerCase();
    if (keyLower !== "host" && keyLower !== "origin") {
      headers.set(key, value);
    }
  }

  const body = request.method === "GET" ? undefined : await request.text();

  try {
    return await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
    });
  } catch (error) {
    console.error("proxy error", error);
    return new Response("Failed to send event", { status: 503 });
  }
}
