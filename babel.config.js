/* eslint-disable import/no-extraneous-dependencies */
const getBabelConfig = require('ocular-dev-tools/config/babel.config');

module.exports = api => {
  const config = getBabelConfig(api);

  config.presets.push('@babel/flow');
  config.plugins.push('@babel/proposal-class-properties');

  return config;
};
