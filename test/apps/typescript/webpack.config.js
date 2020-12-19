const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    app: './app.tsx'
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        // Compile ES2015 using babel
        test: /\.ts(x?)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/react']
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },

  // Optional: Enables reading mapbox token from environment variable
  plugins: [
    new HtmlWebpackPlugin({title: 'react-map-gl Example'}),
    new webpack.EnvironmentPlugin(['MapboxAccessToken'])
  ]
};
