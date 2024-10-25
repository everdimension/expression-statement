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
  origin,
}: {
  pathname: string;
  postModule: PostModule;
  origin: string;
}) {
  const slug = pathname.replace(/^.+\/_posts\./, "").replace(/\.mdx$/, "");
  const description = postModule.excerpt || postModule.frontmatter.description;
  invariant(description, "Post must contain excerpt or description");
  const previewImageUrl = new URL(`/social-preview?post=${slug}`, origin);

  if (process.env.NODE_ENV !== "development") {
    // Our server doesn't see that it's being requested via https
    // This is part of a bigger problem:
    // 1. https://github.com/remix-run/remix/issues/2306
    // 2. https://github.com/remix-run/remix/issues/420
    // But because we know that in production we only use https,
    // it's safe to hardcode this here
    previewImageUrl.protocol = "https:";
  }

  return {
    pathname,
    slug,
    frontmatter: postModule.frontmatter,
    excerpt: postModule.excerpt,
    title: postModule.frontmatter.title,
    description,
    date: postModule.frontmatter.date,
    // modified: stats.mtimeMs,
    imagePreview: previewImageUrl,
  };
}
