import { z } from "zod";
import { getPostObject, PostModuleSchema } from "./getPostObject";
import { reverseChronologicalSorter } from "~/shared/reverseChronologicalSorter";

export function getAllPosts() {
  const mdxModules = import.meta.glob("../../_posts.*.mdx", { eager: true });
  const postModules = z.record(z.string(), PostModuleSchema).parse(mdxModules);
  const posts = Object.keys(postModules)
    .reverse()
    .map((key) => ({ pathname: key, postModule: postModules[key] }))
    .filter(({ postModule }) => postModule.frontmatter.draft !== true)
    .map(({ pathname, postModule }) => {
      return getPostObject({ pathname, postModule });
    })
    .sort(reverseChronologicalSorter);
  return posts;
}
