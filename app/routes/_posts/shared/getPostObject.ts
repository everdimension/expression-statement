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
}: {
  pathname: string;
  postModule: PostModule;
}) {
  const slug = pathname.replace(/^.+\/_posts\./, "").replace(/\.mdx$/, "");
  const description = postModule.excerpt || postModule.frontmatter.description;
  invariant(description, "Post must contain excerpt or description");
  const imagePreviewPath = `/social-preview?post=${encodeURIComponent(slug)}`;

  return {
    pathname,
    slug,
    frontmatter: postModule.frontmatter,
    excerpt: postModule.excerpt,
    title: postModule.frontmatter.title,
    description,
    date: postModule.frontmatter.date,
    // modified: stats.mtimeMs,
    imagePreviewPath,
  };
}
