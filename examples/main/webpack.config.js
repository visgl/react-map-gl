// NOTE: This is a Webpack 2 configuration file for react-map-gl
const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BABEL_CONFIG = {
  presets: [
    '@babel/env',
    '@babel/react'
  ],
  plugins: [
    '@babel/proposal-class-properties'
  ]
};

const config = {
  mode: 'development',

  // Example entry point
  entry: {
    app: resolve('./app.js')
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
      // Compile ES2015 using babel
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: BABEL_CONFIG
      }]
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },

  resolve: {
    modules: [
      // Always resolve module to this app's node_modules first
      resolve('./node_modules'),
      'node_modules'
    ]
  },

  // Allow setting mapbox token using environment variables
  plugins: [
    new HtmlWebpackPlugin({title: 'react-map-gl Example'}),
    new webpack.EnvironmentPlugin(['MapboxAccessToken'])
  ]
};

// Enables bundling against src in this repo rather than the installed version
module.exports = (env) => env && env.local ?
  require('../webpack.config.local')(config)(env) : config;
