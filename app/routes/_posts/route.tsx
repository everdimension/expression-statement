import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import fs from "node:fs/promises";
import path from "path";
import { Article } from "./Article";
import { Footer } from "~/components/Footer";
import { PostModuleSchema, getPostObject } from "./shared/getPostObject";
import { Layout } from "~/components/Layout";
import s from "./shared/styles.module.css";

export async function loader({ request }: LoaderFunctionArgs) {
  const slug = new URL(request.url).pathname.slice(1);
  const pathname = `../_posts.${slug}.mdx`;
  const mdxModule = await import(`../_posts.${slug}.mdx`); // string literal for vite
  const postModule = PostModuleSchema.parse(mdxModule);
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
    <Layout>
      <nav>
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
      <main>
        <Article>
          <div style={{ marginBottom: "2em" }}>
            <h1 style={{ marginBottom: 0 }} className={s.postTitle}>
              {title}
            </h1>
            <time style={{ color: "var(--neutral-5)", fontSize: "0.8em" }}>
              {new Intl.DateTimeFormat("en", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(new Date(date))}
            </time>
          </div>
          <Outlet />
        </Article>
      </main>
    </Layout>
  );
}
