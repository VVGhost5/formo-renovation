import sanity from "@sanity/astro";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: "static", // SSG by default
  site: 'https://formorenovations.com/',
  integrations: [
    vue(),
    react(),
    sanity({
      projectId: "9g3zb5ng",
      dataset: "production",
      useCdn: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/studio'),
    })  
  ],
});