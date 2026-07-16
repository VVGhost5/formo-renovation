import sanity from "@sanity/astro";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  adapter: cloudflare({ imageService: 'passthrough' }),
  site: 'https://formorenovations.com/',
  build: {
    inlineStylesheets: 'auto',
  },
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