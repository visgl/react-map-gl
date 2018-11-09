const config = require('./config');
const {resolve} = require('path');

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
      '../utils/mapboxgl': resolve('../node_modules/mapbox-gl'),
    }
  }
});
