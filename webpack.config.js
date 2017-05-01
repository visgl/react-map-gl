const {resolve} = require('path');
const webpack = require('webpack');

const BASE_CONFIG = {
  // Bundle the transpiled code in dist
  entry: {
    lib: resolve('./src/index.js')
  },

  // Generate a bundle in dist folder
  output: {
    path: resolve('./dist'),
    filename: 'index.js',
    library: 'react-map-gl',
    libraryTarget: 'umd'
  },

  // Exclude any non-relative imports from resulting bundle
  externals: [
    /^[a-z\-0-9]+$/
  ],

  resolve: {
    alias: {
      'react-map-gl': resolve('./dist')
    }
  },

  module: {
    rules: []
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  ]
};

const BROWSER_CONFIG = Object.assign({}, BASE_CONFIG, {
  devServer: {
    stats: {
      warnings: false
    },
    quiet: true
  },

  // Bundle the tests for running in the browser
  entry: {
    'test-browser': resolve('./test/browser.js')
  },

  // Generate a bundle in dist folder
  output: {
    path: resolve('./dist'),
    filename: '[name]-bundle.js'
  },

  devtool: '#inline-source-maps',

  resolve: {
    alias: {
      // Build tests against source rather than an installed version of react-map-gl
      'react-map-gl': resolve('./src'),
      // Use mapbox prebuilt
      'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js'),
      webworkify: 'webworkify-webpack-dropin'
    }
  },

  externals: [],

  node: {
    fs: 'empty'
  },

  plugins: []
});

module.exports = env => {
  const config = BASE_CONFIG;
  if (env && env.browser) {
    return BROWSER_CONFIG;
  }
  return config;
};
