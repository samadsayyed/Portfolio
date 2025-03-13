import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [tailwind(), react(), sitemap({
    filter: (page) => page.search.includes("404") ? false : true
  })],
  site: 'https://samad-sayyed.netlify.app'
});