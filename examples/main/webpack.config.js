// NOTE: This is a Webpack 2 configuration file for react-map-gl
const {resolve} = require('path');
const webpack = require('webpack');

// Otherwise modules imported from outside this directory does not compile
// Seems to be a Babel bug
// https://github.com/babel/babel-loader/issues/149#issuecomment-191991686
const BABEL_CONFIG = {
  presets: [
    'es2015',
    'react',
    'stage-2'
  ].map(function configMap(name) {
    return require.resolve(`babel-preset-${name}`);
  })
};

const config = {
  // Example entry point
  entry: {
    app: resolve('./root.js')
  },

  // Silence excessive webpack dev server warnings
  devServer: {
    stats: {
      warnings: false
    },

    contentBase: [
      __dirname,
      resolve(__dirname, '../')
    ]
  },

  devtool: 'source-maps',

  module: {
    rules: [{
      // Compile ES2015 using bable
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: BABEL_CONFIG
      }]
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader', 'autoprefixer-loader']
    }]
  },

  resolve: {
    alias: {
      // Ensure only one copy of react
      react: resolve('./node_modules/react'),
      immutable: resolve('./node_modules/immutable'),
      // Per mapbox-gl-js README for non-browserify bundlers
      'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
    }
  },

  // Allow setting mapbox token using environment variables
  plugins: [
    new webpack.EnvironmentPlugin(['MAPBOX_ACCESS_TOKEN', 'MapboxAccessToken']),
    new webpack.LoaderOptionsPlugin({minimize: false, debug: true})
  ]
};

// Enables bundling against src in this repo rather than the installed version
module.exports = (env) => env && env.local ?
  require('../webpack.config.local')(config)(env) : config;
