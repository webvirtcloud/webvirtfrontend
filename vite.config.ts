import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2020',
      },
    },
    plugins: [
      react({
        babel: { plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'] },
      }),
    ],
    resolve: {
      alias: {
        app: resolve(__dirname, 'src', 'app'),
        assets: resolve(__dirname, 'src', 'assets'),
        components: resolve(__dirname, 'src', 'components'),
        hooks: resolve(__dirname, 'src', 'hooks'),
      },
    },
    css: {
      modules: {
        generateScopedName: isDevelopment
          ? '[name]__[local]__[hash:base64:5]'
          : '[hash:base64:5]',
      },
    },
  };
});
