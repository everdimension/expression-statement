import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Article } from "./Article";
import { Layout } from "~/components/Layout";
import s from "./shared/styles.module.css";
import { getPostBySlug } from "./shared/getPostBySlug";
import { Navbar } from "~/components/Navbar";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const slug = url.pathname.slice(1);
  const post = await getPostBySlug(slug, url.origin);
  return json(post);
}

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  if (!data) {
    return [];
  }
  const { title, description, imagePreview } = data;
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "article:author", content: "everdimension" },
    { property: "article:section", content: "Technology" },
    // TODO?:
    // { property: "article:tag", content: "..." },
    // { property: "article:published_time", content: "..." },
    // { property: "article:modified_time", content: "..." },
    {
      property: "og:url",
      content: new URL(location.pathname, "https://expressionstatement.com/"),
    },
    { property: "og:site_name", content: "Expression Statement" },
    { property: "og:image", content: imagePreview },

    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:creator", content: "@everdimension" },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: imagePreview },
    { property: "twitter:image:alt", content: description },
    ...(data.frontmatter.meta || []),
  ];
};

export default function Post() {
  const {
    frontmatter: { title },
    date,
  } = useLoaderData<typeof loader>();
  return (
    <Layout>
      <Navbar />
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
