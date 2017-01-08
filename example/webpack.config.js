const {resolve} = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: resolve('./app.js')
  },

  // output: {
  //   filename: 'bundle.js',
  //   path: resolve('./dist')
  // },

  devtool: 'source-maps',

  resolve: {
    alias: {
      // Work against base library
      'react-map-gl': resolve('..'),
      'viewport-mercator-project': resolve('./node_modules/viewport-mercator-project'),
      react: resolve('./node_modules/react'),
      brfs: resolve('./node_modules/brfs'),

      // mapbox-gl config
      'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js'),
      'gl-matrix$': resolve('./node_modules/gl-matrix/dist/gl-matrix.js'),
      webworkify: 'webworkify-webpack-dropin'
    }
  },

  module: {
    rules: [
      {
        // Compile ES2015 using buble
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
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        include: resolve('./node_modules/webworkify/index.js'),
        loader: 'worker'
      },
      {
        // Mapbox has some unresolved fs calls
        include: [/node_modules\/mapbox-gl/],
        loader: 'transform-loader',
        options: 'brfs'
      }
      // ,
      // {
      //   test: /mapbox-gl.+\.js$/,
      //   loader: 'transform/cacheable?brfs'
      // }
    ]
  },

  node: {
    fs: 'empty'
  },

  // Allow setting mapbox token using environment variables
  plugins: [
    new webpack.EnvironmentPlugin(['MAPBOX_ACCESS_TOKEN', 'MapboxAccessToken']),
    new webpack.LoaderOptionsPlugin({minimize: false, debug: true})
  ]
};
