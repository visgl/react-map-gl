// This file contains webpack configuration settings that allow
// examples to be built against the deck.gl source code in this repo instead
// of building against their installed version of deck.gl.
//
// This enables using the examples to debug the main deck.gl library source
// without publishing or npm linking, with conveniences such hot reloading etc.

const {resolve} = require('path');
const webpack = require('webpack');

const LIB_DIR = resolve(__dirname, '..');
const SRC_DIR = resolve(LIB_DIR, './src');

const BABEL_CONFIG = {
  presets: [
    '@babel/env',
    '@babel/react'
  ],
  plugins: [
    '@babel/proposal-class-properties'
  ]
};

// Support for hot reloading changes
const LOCAL_DEVELOPMENT_CONFIG = {
  // suppress warnings about bundle size
  devServer: {
    stats: {
      warnings: false
    }
  },

  resolve: {
    alias: {
      // Imports the react-map-gl library from the src directory in this repo
      'react-map-gl': SRC_DIR,
      '../utils/mapboxgl': resolve(LIB_DIR, './node_modules/mapbox-gl/dist/mapbox-gl-dev.js'),
      react: resolve(LIB_DIR, './node_modules/react')
    }
  },
  module: {
    rules: [{
      // Compile ES2015 using babel
      test: /\.js$/,
      include: [SRC_DIR],
      use: [{
        loader: 'babel-loader',
        options: BABEL_CONFIG
      }]
    }]
  },
  // Optional: Enables reading mapbox token from environment variable
  plugins: [
    new webpack.EnvironmentPlugin(['MapboxAccessToken'])
  ]
};

function addLocalDevSettings(config) {
  config.resolve = config.resolve || {};
  config.resolve.alias = Object.assign({}, config.resolve.alias, LOCAL_DEVELOPMENT_CONFIG.resolve.alias);
  config.module.rules = config.module.rules.concat(LOCAL_DEVELOPMENT_CONFIG.module.rules);
  return config;
}

module.exports = baseConfig => env => {
  const config = baseConfig;
  if (env && env.local) {
    addLocalDevSettings(config);
  }
  return config;
};
