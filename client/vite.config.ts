import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          'react-obsidian/dist/transformers/babel-plugin-obsidian',
          ['@babel/plugin-proposal-decorators', { legacy: true }],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      src: '/src',
    },
  },
  base: '/react-todo-app-ddd-service/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
});
