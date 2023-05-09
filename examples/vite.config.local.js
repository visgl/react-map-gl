import {defineConfig} from 'vite';
import {join} from 'path';

const rootDir = join(__dirname, '..');

/** https://vitejs.dev/config/ */
export default defineConfig(async () => {
  return {
    resolve: {
      alias: {
        // Use root dependencies
        'react-map-gl': join(rootDir, './src/index.ts'),
        'mapbox-gl': join(rootDir, './node_modules/mapbox-gl/dist/mapbox-gl-dev.js'),
        'maplibre-gl': join(rootDir, './node_modules/maplibre-gl/dist/maplibre-gl-dev.js'),
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
