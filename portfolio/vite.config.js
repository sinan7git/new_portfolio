import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import jsconfigPaths from "vite-jsconfig-paths";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeImgSize from "rehype-img-size";
import rehypeSlug from "rehype-slug";
import rehypePrism from "@mapbox/rehype-prism";

export default defineConfig({
  assetsInclude: ["**/*.glb", "**/*.hdr", "**/*.glsl"],
  build: {
    assetsInlineLimit: 1024,
    rollupOptions: {
      external: ['@remix-run/node']
    }
  },
  server: {
    port: 7777,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-dev-runtime',
      'react/jsx-runtime'
    ],
    exclude: ['@remix-run/node']
  },
  ssr: {
    noExternal: [
      '@mdx-js/react',
      'framer-motion',
      'three',
      'three-stdlib'
    ],
    external: ['@remix-run/node'],
    target: 'node',
    format: 'esm'
  },
  plugins: [
    mdx({
      rehypePlugins: [
        [rehypeImgSize, { dir: "public" }],
        rehypeSlug,
        rehypePrism,
      ],
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      providerImportSource: "@mdx-js/react",
    }),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_lazyRouteDiscovery: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "routes/home/route.js", { index: true });
        });
      },
    }),
    jsconfigPaths(),
  ],
});