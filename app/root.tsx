import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import stylesHref from "./styles/main.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesHref },
  { rel: "icon", href: "/logo-from-center.svg" },
];

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  console.log("root loader");
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

export default function App() {
  return <Outlet />;
}
