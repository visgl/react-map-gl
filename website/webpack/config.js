const {resolve} = require('path');
const webpack = require('webpack');

const BABEL_CONFIG = {
  presets: [
    '@babel/env',
    '@babel/react',
    '@babel/flow'
  ],
  plugins: [
    '@babel/proposal-class-properties'
  ]
};

module.exports = {

  entry: ['./src/main'],

  module: {
    rules: [{
      // Compile ES2015 using bable
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: BABEL_CONFIG
        }
      ]
    }, {
      test: /\.s?css$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths: ['./node_modules', '.']
          }
        }
      ]
    }, {
      test: /\.(eot|svg|ttf|woff|woff2|gif|jpe?g|png)$/,
      loader: 'url-loader'
    }],

    // Uglify seems to be incompatible with mapbox
    // https://github.com/mapbox/mapbox-gl-js/issues/4359#issuecomment-288001933
    noParse: /(mapbox-gl)\.js$/
  },

  resolve: {
    modules: [
      // Always resolve module to root dependencies first
      resolve('../node_modules'),
      resolve('./node_modules')
    ],
    alias: {
      'website-examples': resolve('../examples'),
      'gl-matrix': resolve('./node_modules/gl-matrix'),
      'react-map-gl': resolve('../src'),
      '../utils/mapboxgl': resolve('../node_modules/mapbox-gl/dist/mapbox-gl-dev.js'),
    }
  },

  node: {
    fs: 'empty'
  },

  plugins: [
    new webpack.EnvironmentPlugin(['MapboxAccessToken'])
  ]

};
