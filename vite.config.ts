import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
// import Inspect from "vite-plugin-inspect";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkSmartyPants from "remark-smartypants";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeExternalLinks, {
  type Options as ExternalLinksOptions,
} from "rehype-external-links";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

const options: Options = {
  keepBackground: true,
  // theme: "catppuccin-macchiato",
  theme: {
    dark: "catppuccin-macchiato",
    // light: "one-light",
    light: "catppuccin-frappe",
  },
};

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    // Inspect(),
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkSmartyPants,
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypePrettyCode, options],
        [
          rehypeExternalLinks,
          {
            target: "_blank",
            rel: ["noopener"],
          } satisfies ExternalLinksOptions,
        ],
      ],
    }),
    remix({ future: { v3_singleFetch: true } }),
    tsconfigPaths(),
  ],
});
