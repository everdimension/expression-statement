import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Spacer } from "structure-kit";
import { Layout } from "~/components/Layout";

export function loader({ request }: LoaderFunctionArgs) {
  return json({
    url: request.url,
    request,
    headers: Object.fromEntries(request.headers),
  });
}

export default function Mirror() {
  const data = useLoaderData<typeof loader>();
  return (
    <Layout>
      <Spacer height={40} />
      <h1>Request</h1>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </Layout>
  );
}
