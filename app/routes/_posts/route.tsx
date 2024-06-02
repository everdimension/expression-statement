import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Article } from "./Article";
import { Footer } from "~/components/Footer";

export async function loader({ request }: LoaderFunctionArgs) {
  const slug = new URL(request.url).pathname.slice(1);
  const { frontmatter } = await import(`../_posts.${slug}.mdx`);
  console.log({ meta: frontmatter.meta });
  return json({
    title: frontmatter.title,
    meta: (frontmatter.meta as Array<Record<string, string>> | null) || null,
  });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return data?.meta || [];
};

export default function Post() {
  const { title } = useLoaderData<typeof loader>();
  return (
    <>
      <nav className="column">
        <div
          style={{
            paddingBlock: "2rem",
            marginBottom: "4rem",
            display: "grid",
            gap: "1rem",
          }}
        >
          <Link
            to="/"
            className="heading hover:primary"
            style={{ lineHeight: 0.9, color: "var(--link)" }}
          >
            {'<-'} Expression Statement
          </Link>
        </div>
      </nav>
      <main className="column">
        <Article>
          <h1>{title}</h1>
          <Outlet />
        </Article>
        <div style={{ height: "2rem" }}></div>
        <Footer />
      </main>
    </>
  );
}
