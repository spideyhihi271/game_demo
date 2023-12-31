import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteAliases } from 'vite-aliases';

export default defineConfig({
  plugins: [
    react(),
    ViteAliases({
      dir: 'src',
      prefix: '@',
      deep: true,
      depth: 1,
      root: process.cwd(),
    }),
  ],
  server: {
    port: 8080,
  },
  preview: {
    port: 8080,
  },
});
