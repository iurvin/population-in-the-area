import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babelDev from 'vite-plugin-babel-dev';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          [
            "@babel/plugin-proposal-class-properties",
            { loose: true },
          ],
        ],
      },
    }),
  ],
});
