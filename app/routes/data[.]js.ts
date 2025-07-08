import { ANALYTICS_SERVICE_URL } from "~/analytics/config";

export async function loader() {
  const response = await fetch(new URL("/script.js", ANALYTICS_SERVICE_URL));
  const text = await response.text();
  const headers = new Headers();
  for (const [key, value] of response.headers) {
    if (key.toLowerCase() !== "content-encoding" && key !== "fly-request-id") {
      headers.set(key, value);
    }
  }
  return new Response(text, { headers });
}
