import { ANALYTICS_SERVICE_URL, SEND_EVENTS, UMAMI_WEBSITE_ID } from "./config";

interface UmamiEvent {
  payload: {
    id?: string;
    hostname: string;
    language: string;
    referrer: string;
    screen: string;
    title: string;
    url: string;
    website: string;
    name?: string;
    data?: object;
  };
  type: "event";
}

async function sendEvent(
  payload: UmamiEvent["payload"],
  { userAgent }: { userAgent: string | null }
) {
  const body = {
    payload,
    type: "event",
  } satisfies UmamiEvent;
  if (SEND_EVENTS) {
    await fetch(new URL("/api/send", ANALYTICS_SERVICE_URL), {
      method: "post",
      body: JSON.stringify(body),
      headers: { "User-Agent": userAgent || "Unknown UserAgent" },
    });
  } else {
    console.group("event");
    console.table(payload);
    console.groupEnd();
  }
}

function parseLanguage(headers: Headers) {
  const value = headers.get("accept-language");
  if (!value) {
    return "en-US";
  }
  return value.split(",").at(0)?.trim() || "en-US";
}

export async function trackIncomingRequest(
  request: Request,
  { distinctId }: { distinctId: string }
) {
  const url = new URL(request.url);

  return sendEvent(
    {
      id: distinctId,
      hostname: url.hostname,
      language: parseLanguage(request.headers),
      referrer: request.headers.get("referrer") || "",
      screen: "",
      title: "",
      url: request.url,
      website: UMAMI_WEBSITE_ID,
      data: { serverSide: true },
    },
    { userAgent: request.headers.get("user-agent") ?? null }
  );
}
