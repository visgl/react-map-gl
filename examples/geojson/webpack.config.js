// NOTE: To use this example standalone (e.g. outside of repo)
// delete the local development overrides at the bottom of this file

// avoid destructuring for older Node version support
const resolve = require('path').resolve;
const webpack = require('webpack');

// Otherwise modules imported from outside this directory does not compile.
// Also needed if modules from this directory were imported elsewhere
// Seems to be a Babel bug
// https://github.com/babel/babel-loader/issues/149#issuecomment-191991686
const BABEL_CONFIG = {
  babelrc: false,
  presets: [
    'es2015',
    'react',
    'stage-2'
  ].map(function configMap(name) {
    return require.resolve(`babel-preset-${name}`);
  })
};

const config = {
  entry: {
    app: resolve('./src/root.js')
  },

  devServer: {
    contentBase: [
      __dirname,
      resolve(__dirname, '../')
    ]
  },

  devtool: 'source-map',

  module: {
    rules: [{
      // Compile ES2015 using bable
      test: /\.js$/,
      include: [resolve('.')],
      exclude: [/node_modules/],
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

// Enables bundling against src in this repo rather than the installed version
module.exports = env => env && env.local ?
  require('../webpack.config.local')(config)(env) : config;
