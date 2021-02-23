const webpack = require('webpack');
const getWebpackConfig = require('ocular-dev-tools/config/webpack.config');

const BABEL_CONFIG = {
  presets: ['@babel/env', '@babel/react'],
  plugins: ['version-inline', '@babel/proposal-class-properties']
};

module.exports = env => {
  const config = getWebpackConfig(env);

  config.module.rules.push({
    // This is required to handle inline worker!
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader',
        options: BABEL_CONFIG
      }
    ]
  });

  config.modules.rules.push({
    test: /\bmapbox-gl-csp-worker.js\b/i,
    use: {
      loader: 'worker-loader',
      options: {
        inline: 'no-fallback'
      }
    }
  });

  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      __MAPBOX_TOKEN__: JSON.stringify(process.env.MapboxAccessToken) // eslint-disable-line
    })
  ]);

  if (env.mode === 'size') {
    // Only measure self bundle size
    config.externals = ['mapbox-gl'];
  }

  return config;
};
