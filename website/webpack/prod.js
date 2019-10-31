const webpack = require('webpack');
const {resolve} = require('path');
const config = require('./config');

module.exports = Object.assign(config, {
  mode: 'production',

  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'main.js'
  },

  resolve: {
    modules: config.resolve.modules,
    alias: {
      'react-map-gl': resolve('../src'),
      '../utils/mapboxgl': resolve('../node_modules/mapbox-gl')
    }
  },

  plugins: config.plugins.concat([
    new webpack.DefinePlugin({
      DOCS_DIR: JSON.stringify('https://raw.githubusercontent.com/uber/react-map-gl/5.1-release')
    })
  ])
});
