import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { data, redirect } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { UMAMI_WEBSITE_ID } from "./analytics/config";
import { trackIncomingRequest } from "./analytics/send";
import { parseDistinctIdCookie } from "./sessions.server";
import stylesHref from "./styles/main.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesHref },
  { rel: "icon", href: "/logo-from-center.svg", type: "image/svg+xml" },
];

function redirectFromWww(request: Request) {
  const url = new URL(request.url);
  if (process.env.NODE_ENV === "production") {
    if (url.hostname.startsWith("www.")) {
      url.protocol = "https:";
      url.hostname = url.hostname.replace("www.", "");
      throw redirect(url.toString(), 301);
    }
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  redirectFromWww(request);
  const { cookieToSet, distinctId } = await parseDistinctIdCookie(request);
  trackIncomingRequest(request, { distinctId });
  return data(
    {
      distinctId,
      websiteId: UMAMI_WEBSITE_ID,
      NODE_ENV: process.env.NODE_ENV,
      sendEvents: process.env.NODE_ENV === "production",
    },
    { headers: cookieToSet ? { "Set-Cookie": cookieToSet } : undefined }
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const clientData = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.APP_DATA = ${JSON.stringify(clientData)}`,
          }}
        />
        {clientData.sendEvents ? (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `window.beforeSendHandler = function(type, payload) {
                  payload.id = APP_DATA.distinctId;
                  return payload;
                }`,
              }}
            />
            <script
              defer
              src="/data.js"
              data-website-id={clientData.websiteId}
              data-before-send="beforeSendHandler"
            />
          </>
        ) : null}
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ paddingBlockStart: "15vh" }}>
        <h1 style={{ borderBottom: "4px solid", paddingInlineStart: 16 }}>
          {error.status} {error.statusText}
        </h1>
        {error.status !== 404 ? (
          <p style={{ paddingInlineStart: 16 }}>{error.data}</p>
        ) : null}
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div style={{ paddingBlockStart: "3rem", paddingInline: 16 }}>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return (
      <div style={{ paddingBlockStart: "3rem", paddingInline: 16 }}>
        <h1>Unknown Error</h1>;
      </div>
    );
  }
}

export default function App() {
  return <Outlet />;
}
