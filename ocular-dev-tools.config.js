const {resolve} = require('path');

const config = {
  lint: {
    paths: ['src', 'examples', 'test'],
    extensions: ['js']
  },

  alias: {
    'react-map-gl/test': resolve('./test'),
    'react-map-gl': resolve('./src')
  },

  // https://github.com/puppeteer/puppeteer/issues/661#issuecomment-545757822
  browserTest: {
    browser: {
      args: ['--font-render-hinting=full']
    }
  },

  entry: {
    test: 'test/src/index.js',
    'test-browser': 'test/browser.js',
    size: 'test/size/import-nothing.js'
  }
};

module.exports = config;
