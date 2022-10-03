import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: false,
  build: {
    minify: false,
    sourcemap: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'JsonForms React Spectrum Renderers',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom', '@jsonforms/core', '@jsonforms/react', 'moment'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@jsonforms/core': '@jsonforms/core',
          '@jsonforms/react': '@jsonforms/react',
          moment: 'moment',
        },
      },
    },
  },
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  define: {
    'process.platform': null,
    'global.setImmediate': null,
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
});
