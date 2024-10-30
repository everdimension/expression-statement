import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import stylesHref from "./styles/main.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesHref },
  { rel: "icon", href: "/logo-from-center.svg", type: "image/svg+xml" },
];

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  if (process.env.NODE_ENV === "production") {
    if (url.hostname.startsWith("www.")) {
      url.protocol = "https:";
      url.hostname = url.hostname.replace("www.", "");
      return redirect(url.toString(), 301);
    }
  }
  return null;
}

export function Layout({ children }: { children: React.ReactNode }) {
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
