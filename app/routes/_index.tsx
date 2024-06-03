import { json, type MetaFunction } from "@remix-run/node";
import fs from "node:fs/promises";
import path from "path";
import invariant from "tiny-invariant";
import { Link, useLoaderData } from "@remix-run/react";
import { Footer } from "~/components/Footer";
import s from "../styles/styles.module.css";
import type { FrontMatter } from "*.mdx";
import {
  type PostModule,
  isPostModule,
  getPostObject,
} from "./_posts/shared/getPostObject";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const postModules: Record<string, { frontmatter?: FrontMatter }> =
    import.meta.glob("./_posts.*.mdx", { eager: true });

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
    .filter((value): value is { pathname: string; postModule: PostModule } =>
      isPostModule(value.postModule)
    )
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

// const subtitle = 'Software, UX Design and the Web platform'
const subtitle = "Software, UX Design and the Web";

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div className="column">
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
        <div style={{ color: "var(--neutral-6)" }}>{subtitle}</div>
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
        </div>
        <div style={{ height: "3rem" }}></div>
      </main>
      <Footer />
    </div>
  );
}
