import { fileURLToPath } from "node:url";
import mdx from "@mdx-js/rollup";
import rehypeExtractToc from "@stefanprobst/rehype-extract-toc";
import rehypeExtractTocMdx from "@stefanprobst/rehype-extract-toc/mdx";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import rehypeSlug from "rehype-slug";
import { defineConfig } from "vite";
import { prerender } from "./site/prerender.ts";

export default defineConfig({
  root: "site",
  // tsconfig.json's paths, which MDX files sit outside of.
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("site", import.meta.url)),
      "@roprgm/ui": fileURLToPath(new URL("src/components", import.meta.url)),
    },
  },
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        rehypePlugins: [rehypeSlug, rehypeExtractToc, rehypeExtractTocMdx],
      }),
    },
    react({ include: /\.(mdx|tsx)$/ }),
    tailwindcss(),
  ],
  environments: {
    // One bundle with every page, so navigating fetches nothing.
    client: { build: { outDir: "out", chunkSizeWarningLimit: 2000 } },
    ssr: {
      build: { outDir: ".server", rolldownOptions: { input: "server.tsx" } },
    },
  },
  builder: {
    // The app, then the same routes rendered to HTML, written over it page by page.
    async buildApp(builder) {
      await builder.build(builder.environments.client);
      await builder.build(builder.environments.ssr);
      await prerender("site");
    },
  },
});
