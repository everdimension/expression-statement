import type { Stats } from "fs";
import invariant from "tiny-invariant";
import { z } from "zod";
import { FrontMatterSchema } from "~/types/mdx-types";

export const PostModuleSchema = z.object({
  frontmatter: FrontMatterSchema,
  excerpt: z.string().optional(),
});
export type PostModule = z.infer<typeof PostModuleSchema>;

export function getPostObject({
  pathname,
  postModule,
  stats,
  origin,
}: {
  pathname: string;
  postModule: PostModule;
  stats: Stats;
  origin: string;
}) {
  const slug = pathname.replace(/^.+\/_posts\./, "").replace(/\.mdx$/, "");
  const description = postModule.excerpt || postModule.frontmatter.description;
  invariant(description, "Post must contain excerpt or description");
  return {
    pathname,
    slug,
    frontmatter: postModule.frontmatter,
    excerpt: postModule.excerpt,
    title: postModule.frontmatter.title,
    description,
    date: postModule.frontmatter.date || stats.birthtimeMs,
    modified: stats.mtimeMs,
    imagePreview: new URL(`/social-preview?post=${slug}`, origin),
  };
}
