// NOTE: To use this example standalone (e.g. outside of repo)
// delete the local development overrides at the bottom of this file

// avoid destructuring for older Node version support
const resolve = require('path').resolve;

const BABEL_CONFIG = {
  presets: ['@babel/env', '@babel/react'],
  plugins: ['@babel/proposal-class-properties']
};

const config = {
  mode: 'development',

  entry: {
    app: resolve('./src/app.js')
  },

  output: {
    library: 'App'
  },

  resolve: {
    alias: {
      'mapbox-gl': 'maplibre-gl'
    }
  },

  module: {
    rules: [
      {
        // Compile ES2015 using babel
        test: /\.js$/,
        include: [resolve('.')],
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: BABEL_CONFIG
          }
        ]
      }
    ]
  }
};

// Enables bundling against src in this repo rather than the installed version
module.exports = env =>
  env && env.local ? require('../webpack.config.local')(config)(env) : config;
