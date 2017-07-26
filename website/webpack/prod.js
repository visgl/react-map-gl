const config = require('./config');
const path = require('path');

module.exports = Object.assign(config, {

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  }

});
