import {resolve} from 'path';
import {getVitestConfig} from '@vis.gl/dev-tools';

const rootDir = import.meta.dirname;
const nodeTestPatterns = [
  'test/src/**/*.ts',
  'modules/**/test/utils/**/*.spec.{js,jsx,ts,tsx}'
];
const browserTestPatterns = ['modules/**/test/{components,utils}/**/*.spec.{js,jsx,ts,tsx}'];
const aliases = {
  'react-map-gl': resolve(rootDir, 'modules/main/src'),
  '@vis.gl/react-mapbox': resolve(rootDir, 'modules/react-mapbox/src'),
  '@vis.gl/react-maplibre': resolve(rootDir, 'modules/react-maplibre/src'),
  'test': resolve(rootDir, 'test')
};

export default getVitestConfig({
  projects: {
    node: {
      resolve: {alias: aliases},
      test: {
        environment: 'jsdom',
        include: nodeTestPatterns
      }
    },
    browser: {
      resolve: {alias: aliases},
      test: {
        fileParallelism: false,
        include: browserTestPatterns,
        setupFiles: ['./test/browser-test-setup.ts']
      }
    },
    headless: {
      resolve: {alias: aliases},
      test: {
        fileParallelism: false,
        include: browserTestPatterns,
        setupFiles: ['./test/browser-test-setup.ts']
      }
    }
  },
  coverage: {
    include: ['modules/*/src/**/*.{ts,tsx}'],
    exclude: ['**/*.d.ts']
  }
});
