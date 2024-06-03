import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import fs from "node:fs/promises";
import path from "path";
import { Article } from "./Article";
import { Footer } from "~/components/Footer";
import { getPostObject, type PostModule } from "./shared/getPostObject";

export async function loader({ request }: LoaderFunctionArgs) {
  const slug = new URL(request.url).pathname.slice(1);
  const pathname = `../_posts.${slug}.mdx`;
  const postModule: PostModule | undefined = await import(pathname);
  if (!postModule) {
    throw new Error("post not found");
  }
  const stats = await fs.stat(path.resolve(import.meta.dirname, pathname));
  return json(getPostObject({ pathname, postModule, stats }));
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return data?.frontmatter.meta || [];
};

export default function Post() {
  const {
    frontmatter: { title },
    date,
  } = useLoaderData<typeof loader>();
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
            {"<-"} Expression Statement
          </Link>
        </div>
      </nav>
      <main className="column">
        <Article>
          <h1>{title}</h1>
          <time style={{ color: "var(--neutral-5)", fontSize: "0.8em" }}>
            {new Intl.DateTimeFormat("en", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }).format(new Date(date))}
          </time>
          <Outlet />
        </Article>
        <div style={{ height: "2rem" }}></div>
        <Footer />
      </main>
    </>
  );
}
