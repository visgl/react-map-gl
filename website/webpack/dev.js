const webpack = require('webpack');

const config = require('./config');

module.exports = Object.assign(config, {

  entry: [
    'webpack-hot-middleware/client',
    './src/main'
  ],

  devServer: {
    port: 3000,
    progress: true
  },

  devtool: 'cheap-source-maps',

  plugins: config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ])

});
