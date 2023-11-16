import react from '@vitejs/plugin-react';
import dotenv, { type DotenvPopulateInput } from 'dotenv';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const config = dotenv.config({
  path: resolve(__dirname, `.env.${process.env.NODE_ENV}`),
});

// WORKAROUND: We need to populate the process.env object with `API_DOMAIN` variable from docker
//env variables with VITE_ prefix to make them available in the browser.
dotenv.populate(process.env as DotenvPopulateInput, {
  VITE_API_BASE_DOMAIN: (process.env.API_DOMAIN || config.parsed?.API_DOMAIN) as string,
});

// console.log(process.env);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
