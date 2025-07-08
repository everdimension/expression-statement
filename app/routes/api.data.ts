/** This route proxies requests to umami analytics */

import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { proxyRequestToAnalytics } from "~/analytics/proxyToAnalytics";

export async function loader({ request }: LoaderFunctionArgs) {
  return proxyRequestToAnalytics(request);
}

export async function action({ request }: ActionFunctionArgs) {
  return proxyRequestToAnalytics(request);
}
