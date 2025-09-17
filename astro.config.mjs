// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import mdx from '@astrojs/mdx';
import icon from "astro-icon";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
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