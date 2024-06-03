import type { Stats } from "fs";
import type { FrontMatter } from "*.mdx";

export interface PostModule {
  frontmatter: FrontMatter;
  excerpt?: string;
}

export function isPostModule(obj: object): obj is PostModule {
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

export function getPostObject({
  pathname,
  postModule,
  stats,
}: {
  pathname: string;
  postModule: PostModule;
  stats: Stats;
}) {
  const slug = pathname.replace("./_posts.", "").replace(/\.mdx$/, "");
  return {
    pathname,
    slug,
    frontmatter: postModule.frontmatter,
    excerpt: postModule.excerpt,
    date: postModule.frontmatter.date || stats.birthtimeMs,
    modified: stats.mtimeMs,
  };
}
