// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import mdx from '@astrojs/mdx';
import icon from "astro-icon";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import vercel from '@astrojs/vercel/serverless'; // <-- changed

export default defineConfig({
  output: 'server',
  adapter: vercel({}), // <-- changed
  integrations: [icon(), mdx({
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  })],
  vite: { plugins: [tailwindcss()], },
  markdown: {
    shikiConfig: {
      themes: {
        dark: 'gruvbox-dark-medium',
        light: 'gruvbox-light-medium'
      },
      wrap: true
    }
  }
});
