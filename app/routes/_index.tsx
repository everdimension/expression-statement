import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { z } from "zod";
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
  if (process.env.NODE_ENV !== "development") {
    // Our server doesn't see that it's being requested via https
    // This is part of a bigger problem:
    // 1. https://github.com/remix-run/remix/issues/2306
    // 2. https://github.com/remix-run/remix/issues/420
    // But because we know that in production we only use https,
    // it's safe to hardcode this here
    previewImageUrl.protocol = "https:";
  }
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

function reverseChronologicalSorter(
  a: { date?: string },
  b: { date?: string }
) {
  const now = Date.now();
  return new Date(b.date || now).getTime() - new Date(a.date || now).getTime();
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const mdxModules = import.meta.glob("./_posts.*.mdx", { eager: true });
  const postModules = z.record(z.string(), PostModuleSchema).parse(mdxModules);
  const posts = Object.keys(postModules)
    .reverse()
    .map((key) => ({ pathname: key, postModule: postModules[key] }))
    .filter(({ postModule }) => postModule.frontmatter.draft !== true)
    .map(({ pathname, postModule }) => {
      return getPostObject({
        pathname,
        postModule,
        origin: url.origin,
      });
    })
    .sort(reverseChronologicalSorter);

  return json({ posts, origin: url.origin });
}

const ONELINE_TITLE = false;

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
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
                }).format(new Date(post.date || Date.now()))}
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
