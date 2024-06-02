/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export type FrontMatter = {
    title?: string;
    description?: string;
    draft?: boolean;
    meta?: Record<string, unknown>;
    date?: string;
  };
  export const frontmatter: undefined | FrontMatter;
  export default MDXComponent;
}
