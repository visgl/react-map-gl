const webpack = require('webpack');
const {getWebpackConfig} = require('ocular-dev-tools');

module.exports = env => {
  const config = getWebpackConfig(env);

  config.resolve = {...config.resolve, extensions: ['.ts', '.tsx', '.js', '.json']};

  config.module.rules = [
    ...config.module.rules.filter(r => r.loader !== 'babel-loader'),
    {
      // Compile source using babel
      test: /(\.js|\.ts|\.tsx)$/,
      loader: 'babel-loader',
      exclude: [/node_modules/],
      options: {
        presets: [
          ['@babel/preset-env', {targets: 'last 2 chrome versions'}],
          '@babel/preset-react',
          '@babel/preset-typescript'
        ],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    }
  ];

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
