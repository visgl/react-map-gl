module.exports = {
  extends: '@istanbuljs/nyc-config-typescript',
  all: 'true',
  sourceMap: false,
  instrument: true,
  extensions: ['.ts', '.tsx'],
  include: ['src']
};
