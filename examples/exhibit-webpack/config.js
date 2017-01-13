module.exports = {

  entry: [
    './app',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000',
  ],

  devtool: 'source-maps',

  resolve: {
    alias: {
      webworkify: 'webworkify-webpack-dropin',
    },
  },

  module: {

    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
    }, {
      include: /node_modules\/mapbox-gl.*\.js$/,
      loader: 'transform-loader?brfs-babel',
      enforce: 'post',
    }],

  },

  node: {
    fs: 'empty',
  },

};
