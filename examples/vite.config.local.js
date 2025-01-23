import {defineConfig} from 'vite';
import {join} from 'path';

const rootDir = join(__dirname, '..');

/** https://vitejs.dev/config/ */
export default defineConfig(async () => {
  return {
    resolve: {
      alias: {
        // Use root dependencies
        'react-map-gl/mapbox': join(rootDir, './modules/main/src/mapbox.ts'),
        'react-map-gl/maplibre': join(rootDir, './modules/main/src/maplibre.ts'),
        react: join(rootDir, './node_modules/react'),
        'react-dom': join(rootDir, './node_modules/react-dom')
      }
    },
    define: {
      'process.env.MapboxAccessToken': JSON.stringify(process.env.MapboxAccessToken)
    },
    server: {
      open: true,
      port: 8080
    },
    optimizeDeps: {
      esbuildOptions: {target: 'es2020'}
    }
  };
});
