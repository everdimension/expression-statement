import { createCookieSessionStorage } from "@remix-run/node";
import invariant from "tiny-invariant";

/**
 * 400 days in seconds
 *
 * Chrome has an upper limit for cookie max-age:
 * 1. https://httpwg.org/http-extensions/draft-ietf-httpbis-rfc6265bis.html#name-cookie-lifetime-limits
 * 2. https://developer.chrome.com/blog/cookie-max-age-expires
 * 3. https://chromestatus.com/feature/4887741241229312
 */
const COOKIE_MAX_AGE = 400 * 24 * 60 * 60;

invariant(process.env.COOKIE_SECRET, "COOKIE_SECRET not set");
const COOKIE_SECRET = process.env.COOKIE_SECRET;

export const cookieSession = createCookieSessionStorage<{
  distinctId: string;
}>({
  cookie: {
    name: "__session",
    httpOnly: true,
    secrets: [COOKIE_SECRET],
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  },
});

export async function parseDistinctIdCookie(
  request: Request
): Promise<{ cookieToSet: string | null; distinctId: string }> {
  const cookie = request.headers.get("cookie");
  const session = await cookieSession.getSession(cookie);
  const id = session.get("distinctId");
  if (!id) {
    const distinctId = crypto.randomUUID();
    session.set("distinctId", distinctId);
    return {
      cookieToSet: await cookieSession.commitSession(session),
      distinctId,
    };
  } else {
    return {
      cookieToSet: null,
      distinctId: id,
    };
  }
}
