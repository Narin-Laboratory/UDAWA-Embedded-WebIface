import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { promises as fs } from 'fs';
import path from 'path';

const copyLocalesPlugin = () => ({
  name: 'copy-locales-and-rename',
  async writeBundle(options) {
    const localesDest = path.resolve(options.dir, 'locales');
    try {
      await fs.copyFile(path.join(localesDest, 'en.json'), path.join(localesDest, 'en-US.json'));
      await fs.copyFile(path.join(localesDest, 'id.json'), path.join(localesDest, 'id-ID.json'));
      console.log('Successfully created region-specific locale files.');
    } catch (error) {
      console.error('Failed to create region-specific locale files:', error);
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/ws': {
        target: 'ws://gadadar4ch.local',
        ws: true,
      },
    },
  },
  plugins: [preact(), copyLocalesPlugin()],
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/bundle.js',
        chunkFileNames: 'assets/chunk-[name].js',
        assetFileNames: ({ name }) => {
          // Determine the correct extension based on the asset's content type
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/[name].[ext]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'css/[name].[ext]';
          }
		  if (/\.js$/.test(name ?? '')) {
            return 'js/[name].[ext]';
          }
          // Add more specific cases if needed

          // Fallback for other asset types
          return 'assets/[name].[ext]';
        }
      }
    }
  },
});
