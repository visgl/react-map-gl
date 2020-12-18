/* eslint-disable import/no-extraneous-dependencies */
const getBabelConfig = require('ocular-dev-tools/config/babel.config');

module.exports = api => {
  const config = getBabelConfig(api);

  config.presets = (config.presets || []).concat(['@babel/preset-react']);
  config.plugins = (config.plugins || []).concat('@babel/proposal-class-properties');

  return config;
};
