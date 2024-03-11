import { fileURLToPath, URL } from 'url';
import path from 'path';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import gettextExtractorForWordpress from './vite-plugins/gettext-extractor-for-wordpress.js'

const filename = '{plugin-shortcode}';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [
    vue(), 
    gettextExtractorForWordpress({
      path: path.resolve(__dirname, 'languages/'),
      context: '',
      domain: '{plugin-shortcode}'
    })
  ],
  server: {
    hmr: false
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      name: '{plugin}',
      entry: path.resolve(__dirname, `src/main.js`),
      formats: ['iife'],
      fileName: () => `${filename}.js`
    },
    rollupOptions: {
      output: {
        extend: true,
        assetFileNames: (assetInfo) => {
          if( assetInfo.name == 'style.css') {
            return `${filename}.css`;
          }
          return assetInfo.name;
        },
      }
    }
  }
});
