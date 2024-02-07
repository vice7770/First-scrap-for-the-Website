import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), mdx(), sitemap(), react()],
  output: "server",
  adapter: vercel(),
  vite: {
    build: {
      rollupOptions: {
        external: ['@/stores/partnerSelected']
      }
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  },
});

