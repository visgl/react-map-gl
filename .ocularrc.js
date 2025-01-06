/** @typedef {import('@vis.gl/dev-tools').OcularConfig} OcularConfig */
import {resolve} from 'path';

/** @type {OcularConfig} */
export default {
  lint: {
    paths: ['modules', 'test', 'examples']
  },

  coverage: {
    test: 'browser'
  },
  aliases: {
    'react-map-gl/test': resolve('./test')
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
