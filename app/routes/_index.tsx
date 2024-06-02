import { json, type MetaFunction } from "@remix-run/node";
import fs from "node:fs/promises";
import path from "path";
import { Link, useLoaderData } from "@remix-run/react";
import { Footer } from "~/components/Footer";
import s from "../styles/styles.module.css";
import type { FrontMatter } from "*.mdx";
import invariant from "tiny-invariant";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type PostModule = { frontmatter: FrontMatter; excerpt?: string };

function isPostModule(obj: object): obj is PostModule {
  const hasFrontMatter = "frontmatter" in obj && Boolean(obj.frontmatter);
  if (!hasFrontMatter) {
    return false;
  }
  if ("excerpt" in obj === false) {
    return true;
  } else if (typeof obj.excerpt !== "string") {
    throw new Error("{exceprt} export must be a string");
  } else {
    return true;
  }
}

export async function loader() {
  const postModules: Record<string, { frontmatter?: FrontMatter }> =
    import.meta.glob("./_posts.*.mdx", { eager: true });
  const data = Object.keys(postModules)
    .reverse()
    .map((key) => ({ pathname: key, post: postModules[key] }))
    .filter((module): module is { pathname: string; post: PostModule } =>
      isPostModule(module.post)
    )
    .filter(({ post }) => post.frontmatter.draft !== true)
    .map(({ pathname, post }) => {
      const slug = pathname.replace("./_posts.", "").replace(/\.mdx$/, "");
      return {
        pathname,
        slug,
        post,
      };
    });

  const stats = await Promise.all(
    data.map(async ({ pathname }) => {
      const stats = await fs.stat(path.resolve(import.meta.dirname, pathname));
      return { pathname, stats };
    })
  );
  const statsMap = new Map(
    stats.map(({ pathname, stats }) => [pathname, stats])
  );
  const posts = data.map(({ pathname, slug, post }) => {
    const postFileStats = statsMap.get(pathname);
    invariant(postFileStats, `File Stats not found for ${pathname}`);
    return {
      slug,
      frontmatter: post.frontmatter,
      excerpt: post.excerpt,
      date: post.frontmatter.date || postFileStats.birthtimeMs,
      modified: postFileStats.mtimeMs,
    };
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
        <h3 className={s.title}>
          Expression
          {ONELINE_TITLE ? (
            <span> Statement</span>
          ) : (
            <>
              <br />
              <span style={{ fontSize: "1.081em" }}>Statement</span>
            </>
          )}
        </h3>
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
