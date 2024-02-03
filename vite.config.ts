import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

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
    svgr()
  ],
});
