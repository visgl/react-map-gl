import {resolve} from 'path';

export default {
  lint: {
    paths: ['src', 'test', 'examples']
  },

  typescript: {
    project: 'tsconfig.build.json'
  },

  aliases: {
    'react-map-gl/test': resolve('./test'),
    'react-map-gl': resolve('./src')
  },
  nodeAliases: {
    'react-dom': resolve('./test/src/utils/react-dom-mock.js')
  },

  browserTest: {
    server: {wait: 5000}
  },

  entry: {
    test: 'test/node.js',
    'test-browser': 'test/browser.js',
    size: ['test/size/all.js', 'test/size/map.js']
  }
};
