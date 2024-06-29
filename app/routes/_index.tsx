import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { z } from "zod";
// import fs from "node:fs/promises";
// import path from "path";
import invariant from "tiny-invariant";
import { Link, useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/Layout";
import s from "../styles/styles.module.css";
import { getPostObject, PostModuleSchema } from "./_posts/shared/getPostObject";
import mainPagePreviewSrc from "./social-preview/pre-built/main-page-preview.png";

// const subtitle = 'Software, UX Design and the Web platform'
const subtitle = "Software, UX Design and the Web";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = "Expression Statement";
  const description = subtitle;
  invariant(data);
  const previewImageUrl = new URL(mainPagePreviewSrc, data.origin);
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://expressionstatement.com/" },
    { property: "og:site_name", content: title },
    // TODO:
    { property: "og:image", content: previewImageUrl },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:creator", content: "@everdimension" },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: previewImageUrl },
    { property: "twitter:image:alt", content: description },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const mdxModules = import.meta.glob("./_posts.*.mdx", { eager: true });
  // console.log({ mdxModules })
  const postModules = z.record(z.string(), PostModuleSchema).parse(mdxModules);
  // console.log({ postModules });

  // const pathnames = Object.keys(postModules);
  // console.log("import emta dirname", import.meta.dirname);
  // const filesStats = await Promise.all(
  //   pathnames.map(async (pathname) => {
  //     const stats = await fs.stat(path.resolve(import.meta.dirname, pathname));
  //     return { pathname, stats };
  //   })
  // );
  // const statsMap = new Map(
  //   filesStats.map(({ pathname, stats }) => [pathname, stats])
  // );
  const posts = Object.keys(postModules)
    .reverse()
    .map((key) => ({ pathname: key, postModule: postModules[key] }))
    .filter(({ postModule }) => postModule.frontmatter.draft !== true)
    .map(({ pathname, postModule }) => {
      // const stats = statsMap.get(pathname);
      // invariant(stats, `File Stats not found for ${pathname}`);
      return getPostObject({
        pathname,
        postModule,
        // stats,
        origin: url.origin,
      });
    });

  return json({ posts, origin: url.origin });
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
