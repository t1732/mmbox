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
  plugins: [
    react(),
    tsconfigPaths({
      root: '../',
    }),
  ],
});
