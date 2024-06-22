import type { Stats } from "fs";
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
}: {
  pathname: string;
  postModule: PostModule;
  stats: Stats;
}) {
  const slug = pathname.replace(/^.+\/_posts\./, "").replace(/\.mdx$/, "");
  return {
    pathname,
    slug,
    frontmatter: postModule.frontmatter,
    excerpt: postModule.excerpt,
    date: postModule.frontmatter.date || stats.birthtimeMs,
    modified: stats.mtimeMs,
  };
}
