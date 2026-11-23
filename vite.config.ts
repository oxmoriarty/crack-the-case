import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';
import { devvit } from '@devvit/start/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwind(),
    devvit({
      client: {
        build: {
          sourcemap: false,
        },
      },
      server: {
        build: {
          sourcemap: false,
          minify: true,
        },
      },
    }),
  ],
});
