const webpack = require('webpack');

module.exports = {
  reactStrictMode: true,

  webpack: config => {
    // Optional: Enables reading mapbox token from environment variable
    config.plugins.push(new webpack.EnvironmentPlugin({MapboxAccessToken: ''}));
    return config;
  }
};
