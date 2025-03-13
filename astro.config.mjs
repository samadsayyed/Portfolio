import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify';

export default defineConfig({
  integrations: [tailwind(), react(), sitemap()],
  adapter:netlify(),
  site: 'https://samad-sayyed.netlify.app',
  build:{
    rollupOptions: {
      treeshake: true, // Remove unused JS
    }
  }
});