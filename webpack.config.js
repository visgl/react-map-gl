/* eslint-disable */
var webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    libraryTarget: 'umd',
    library: 'ReactMapboxGl',
    filename: 'react-mapbox-gl.js'
  },
  externals: [
    {
      'immutable': {
        root: 'immutable',
        commonjs2: 'immutable',
        commonjs: 'immutable',
        amd: 'immutable'
      }
    },
    {
      'r-dom': {
        root: 'r-dom',
        commonjs2: 'r-dom',
        commonjs: 'r-dom',
        amd: 'r-dom'
      }
    },
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'd3': {
        root: 'd3',
        commonjs2: 'd3',
        commonjs: 'd3',
        amd: 'd3'
      }
    },
    {
      'mapbox-gl': {
        root: 'mapbox-gl',
        commonjs2: 'mapbox-gl',
        commonjs: 'mapbox-gl',
        amd: 'mapbox-gl'
      }
    }
  ]
};
