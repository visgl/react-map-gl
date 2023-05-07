const {resolve} = require('path');

const config = {
  lint: {
    paths: ['src', 'test', 'examples']
  },

  typescript: {
    project: 'tsconfig.json'
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
    size: ['test/size/all.js', 'test/size/map.js']
  }
};

module.exports = config;
