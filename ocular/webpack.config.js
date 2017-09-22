const {resolve} = require('path');

module.exports = {

  resolve: {
    modules: [
      resolve(__dirname, '../node_modules')
    ],

    alias: {
      'react-map-gl': resolve(__dirname, '../src')
    }
  }

};
