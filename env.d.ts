/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />
import type { FrontMatter } from "~/types/mdx-types";

declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export const frontmatter: undefined | FrontMatter;
  export default MDXComponent;
}
