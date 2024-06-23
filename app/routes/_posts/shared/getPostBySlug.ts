import fs from "node:fs/promises";
import path from "path";
import { PostModuleSchema, getPostObject } from "./getPostObject";

export async function getPostBySlug(slug: string, origin: string) {
  const pathname = `../../_posts.${slug}.mdx`;
  const mdxModule = await import(`../../_posts.${slug}.mdx`); // string literal for vite
  const postModule = PostModuleSchema.parse(mdxModule);
  const stats = await fs.stat(path.resolve(import.meta.dirname, pathname));
  return getPostObject({ pathname, postModule, stats, origin });
}
