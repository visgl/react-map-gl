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
  },

  browserTest: {
    server: {wait: 5000}
  },

  entry: {
    test: 'test/node.js',
    'test-browser': 'test/browser.js',
    size: [
      'test/size/mapbox-legacy.js',
      'test/size/maplibre.js',
      'test/size/mapbox.js'
    ]
  }
};
