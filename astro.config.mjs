import sanity from "@sanity/astro";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static", // SSG by default
  integrations: [
    vue(),
    react(),
    sanity({
      projectId: "9g3zb5ng",
      dataset: "production",
      useCdn: false,
      studioBasePath: "/studio",
    }),
  ],
});