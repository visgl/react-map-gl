/* eslint-disable import/no-extraneous-dependencies */
const {getBabelConfig} = require('ocular-dev-tools');

module.exports = api => {
  let config = getBabelConfig(api, {react: true});

  return config;
};
