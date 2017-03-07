// NOTE: This is a Webpack 2 configuration file for react-map-gl
const {resolve} = require('path');
const webpack = require('webpack');

module.exports = {
  // Example entry point
  entry: {
    app: resolve('./app.js')
  },

  // Silence excessive webpack dev server warnings
  devServer: {
    stats: {
      warnings: false
    }
  },

  devtool: 'source-maps',

  resolve: {
    alias: {
      // Work against the latest base library in this repo
      'react-map-gl': resolve('../..'),
      // Ensure only one copy of react
      react: resolve('./node_modules/react'),
      // Per mapbox-gl-js README for non-browserify bundlers
      'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
    }
  },

  module: {
    rules: [
      {
        // Compile ES2015 and JSX using buble
        test: /\.js$/,
        loader: 'buble-loader',
        exclude: [/node_modules/],
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

  // Allow setting mapbox token using environment variables
  plugins: [
    new webpack.EnvironmentPlugin(['MAPBOX_ACCESS_TOKEN', 'MapboxAccessToken']),
    new webpack.LoaderOptionsPlugin({minimize: false, debug: true})
  ]
};
