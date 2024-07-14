/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

const isDev = process.env.NODE_ENV === 'development';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  server: {
    host: '0.0.0.0',
  },
  define: { global: 'window' },
  build: {
    sourcemap: isDev ? true : false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  base: '',
});
