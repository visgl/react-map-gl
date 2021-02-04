const resolve = require('path').resolve;
const DEPENDENCIES = require('./package.json').dependencies;

module.exports.onCreateWebpackConfig = function onCreateWebpackConfigOverride(opts) {
  const {
    stage, // build stage: ‘develop’, ‘develop-html’, ‘build-javascript’, or ‘build-html’
    // rules, // Object (map): set of preconfigured webpack config rules
    // plugins, // Object (map): A set of preconfigured webpack config plugins
    getConfig, // Function that returns the current webpack config
    // loaders, // Object (map): set of preconfigured webpack config loaders
    actions
  } = opts;

  console.log(`App rewriting gatsby webpack config ${stage}`); // eslint-disable-line

  const config = getConfig();
  config.resolve = config.resolve || {};
  config.resolve.alias = config.resolve.alias || {};

  // When duplicating example dependencies in website, autogenerate
  // aliases to ensure the website version is picked up
  // NOTE: module dependencies are automatically injected
  // TODO - should this be automatically done by ocular-gatsby?
  const dependencyAliases = {};
  for (const dependency in DEPENDENCIES) {
    dependencyAliases[dependency] = `${__dirname}/node_modules/${dependency}`;
  }

  Object.assign(config.resolve.alias, {
    'react-map-gl': resolve(__dirname, '../src'),
    react: resolve('node_modules/react'),
    'react-dom': resolve('node_modules/react-dom')
  }, dependencyAliases);

  // turf.js uses mjs
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });

  // Work around for https://github.com/mapbox/mapbox-gl-js/issues/10173
  if (stage === 'build-javascript') {
    for (const rule of config.module.rules) {
      // find the babel loader
      const loader = rule.use &&
        (Array.isArray(rule.use) ? rule.use : [rule.use])
          .find(u => u.loader && u.loader.includes("babel-loader"));
      if (!rule.include && loader && loader.options) {
        loader.options.ignore = [
          resolve(__dirname, '../node_modules/mapbox-gl/dist/mapbox-gl.js')
        ];
      }
    }
  }

  // Completely replace the webpack config for the current stage.
  // This can be dangerous and break Gatsby if certain configuration options are changed.
  // Generally only useful for cases where you need to handle config merging logic yourself,
  // in which case consider using webpack-merge.
  actions.replaceWebpackConfig(config);
};
