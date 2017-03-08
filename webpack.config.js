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
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'remove-flow-types-loader',
        include: [/node_modules\/mapbox-gl\/js/]
      },
      {
        // Compile ES2015 using buble
        test: /\.js$/,
        loader: 'buble-loader',
        include: [/src/, /test/],
        options: {
          objectAssign: 'Object.assign',
          transforms: {
            dangerousForOf: true,
            modules: false
          }
        }
      }
    ]
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
      'react-map-gl': resolve('./src'),
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
