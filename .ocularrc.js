const {resolve} = require('path');

const config = {
  lint: {
    paths: ['src', 'test', 'examples']
  },

  aliases: {
    'react-map-gl/test': resolve('./test'),
    'react-map-gl': resolve('./src')
  },

  browserTest: {
    server: {wait: 5000}
  },

  entry: {
    test: 'test/node.js',
    'test-browser': 'test/browser.js',
    size: 'test/size/import-nothing.js'
  }
};

module.exports = config;
