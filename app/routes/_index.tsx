import { json, type MetaFunction } from "@remix-run/node";
import { z } from "zod";
import fs from "node:fs/promises";
import path from "path";
import invariant from "tiny-invariant";
import { Link, useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/Layout";
import s from "../styles/styles.module.css";
import { getPostObject, PostModuleSchema } from "./_posts/shared/getPostObject";

// const subtitle = 'Software, UX Design and the Web platform'
const subtitle = "Software, UX Design and the Web";

export const meta: MetaFunction = () => {
  return [
    { title: "Expression Statement" },
    { name: "description", content: subtitle },
  ];
};

export async function loader() {
  const mdxModules = import.meta.glob("./_posts.*.mdx", { eager: true });
  const postModules = z.record(z.string(), PostModuleSchema).parse(mdxModules);
  console.log({ postModules });

  const pathnames = Object.keys(postModules);
  const filesStats = await Promise.all(
    pathnames.map(async (pathname) => {
      const stats = await fs.stat(path.resolve(import.meta.dirname, pathname));
      return { pathname, stats };
    })
  );
  const statsMap = new Map(
    filesStats.map(({ pathname, stats }) => [pathname, stats])
  );
  const posts = Object.keys(postModules)
    .reverse()
    .map((key) => ({ pathname: key, postModule: postModules[key] }))
    .filter(({ postModule }) => postModule.frontmatter.draft !== true)
    .map(({ pathname, postModule }) => {
      const stats = statsMap.get(pathname);
      invariant(stats, `File Stats not found for ${pathname}`);
      return getPostObject({
        pathname,
        postModule,
        stats,
      });
    });

  return json({ posts });
}

const ONELINE_TITLE = false;

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  console.log({ posts });
  return (
    <Layout>
      <div
        style={{
          paddingBlock: "2rem",
          paddingTop: "3rem",
          marginBottom: "4rem",
          display: "grid",
          gap: "1rem",
        }}
      >
        <h1 className={s.title}>
          Expression
          {ONELINE_TITLE ? (
            <span> Statement</span>
          ) : (
            <>
              <br />
              <span style={{ fontSize: "1.081em" }}>Statement</span>
            </>
          )}
        </h1>
        <div style={{ color: "var(--neutral-5)" }}>{subtitle}</div>
      </div>

      <div
        style={{
          aspectRatio: 1,
          width: 200,
          color: "white",
          backgroundColor: "black",
          // display: "grid",
          display: "none",
        }}
      >
        <span style={{ placeSelf: "end", fontSize: 80, fontWeight: 800 }}>
          ES
        </span>
      </div>

      <main>
        <div style={{ display: "grid", gap: 96 }}>
          {posts.map((post) => (
            <article key={post.slug} style={{ display: "grid", gap: 12 }}>
              <Link
                to={post.slug}
                className="link-heading no-underline hover:underline"
              >
                <h2>{post.frontmatter.title}</h2>
              </Link>
              <p style={{ margin: 0 }}>
                {post.frontmatter.description || post.excerpt}
              </p>
              <time style={{ color: "var(--neutral-5)", fontSize: "0.8em" }}>
                {new Intl.DateTimeFormat("en", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(post.date))}
              </time>
            </article>
          ))}
          <details>
            <summary>More Posts</summary>
            <div>
              {posts.length === 1
                ? "Nope, no more, just that one."
                : posts.length === 2
                ? "Nope, just those two."
                : "There aren't really any more posts actually."}{" "}
              Why would I hide them lol
            </div>
          </details>
        </div>
      </main>
    </Layout>
  );
}
