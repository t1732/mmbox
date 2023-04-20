/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'webui',

  base: '/',
  publicDir: 'public',
  build: {
    outDir: '../dist',
  },
  envDir: '../',
  define: {
    MMBOX_API_BASE_URL: JSON.stringify(process.env.MMBOX_API_BASE_URL),
  },
  plugins: [
    react(),
    tsconfigPaths({
      root: '../',
    }),
  ],
});
