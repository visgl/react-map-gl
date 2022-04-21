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

// Support for hot reloading changes
const LOCAL_DEVELOPMENT_CONFIG = {
  // suppress warnings about bundle size
  devServer: {
    stats: {
      warnings: false
    }
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],

    alias: {
      // Imports the react-map-gl library from the src directory in this repo
      'react-map-gl': SRC_DIR,
      'mapbox-gl': resolve(LIB_DIR, './node_modules/mapbox-gl/dist/mapbox-gl-dev.js'),
      react: resolve(LIB_DIR, './node_modules/react')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [SRC_DIR],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/react'],
              plugins: ['@babel/proposal-class-properties']
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  // Optional: Enables reading mapbox token from environment variable
  plugins: [new webpack.EnvironmentPlugin(['MapboxAccessToken'])]
};

function addLocalDevSettings(config) {
  config.resolve = config.resolve || {};
  config.resolve.alias = Object.assign(
    {},
    config.resolve.alias,
    LOCAL_DEVELOPMENT_CONFIG.resolve.alias
  );
  config.module.rules = config.module.rules.concat(LOCAL_DEVELOPMENT_CONFIG.module.rules);
  config.devtool = LOCAL_DEVELOPMENT_CONFIG.devtool;
  return config;
}

module.exports = baseConfig => env => {
  const config = baseConfig;
  if (env && env.local) {
    addLocalDevSettings(config);
  }
  return config;
};
