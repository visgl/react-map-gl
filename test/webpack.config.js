const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ALIASES = require('../aliases');

const BROWSER_CONFIG = {
  mode: 'development',
  devServer: {
    stats: {
      warnings: false
    },
    quiet: true
  },

  // Generate a bundle in dist folder
  output: {
    path: resolve('./dist'),
    filename: '[name]-bundle.js'
  },

  resolve: {
    alias: Object.assign({}, ALIASES, {
      // Use mapbox prebuilt
      'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js'),
      webworkify: 'webworkify-webpack-dropin',

      // Aliases needed to defeat root scripts from getting duplicate dependencies
      // from sub module node_modules
      'math.gl': resolve('./node_modules/math.gl'),
      'probe.gl': resolve('./node_modules/probe.gl')
    })
  },

  devtool: '#inline-source-maps',

  module: {
    rules: [
      {
        // Unfortunately, webpack doesn't import library sourcemaps on its own...
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        include: [/src/, /test/],
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/flow'
            ],
            plugins: [
              '@babel/proposal-class-properties'
            ]
          }
        }]
      }
    ]
  },

  node: {
    fs: 'empty'
  },

  plugins: [
    new webpack.DefinePlugin({
      // Overwrite the default env var so that we can test access token handling
      'process.env.MapboxAccessToken': JSON.stringify(''),
      // Secret env var for testing only
      'process.env._MapboxAccessToken_': JSON.stringify(process.env.MapboxAccessToken) // eslint-disable-line
    }),
    new HtmlWebpackPlugin({title: 'react-map-gl tests'})
  ]
};

const TEST_BROWSER_CONFIG = Object.assign({}, BROWSER_CONFIG, {
  // Bundle the tests for running in the browser
  entry: {
    'test-browser': resolve('./test/test-browser.js')
  }
});

const BENCH_BROWSER_CONFIG = Object.assign({}, BROWSER_CONFIG, {
  entry: {
    'test-browser': resolve('./test/bench/browser.js')
  }
});

// Get first key in an object
function getFirstKey(object) {
  for (const key in object) {
    return key;
  }
  return null;
}

function getDist(env) {
  if (env.es5) {
    return 'es5';
  }
  if (env.esm) {
    return 'esm';
  }
  return 'es6';
}

// Bundles a test app for size analysis
function getBundleConfig(env) {
  const app = getFirstKey(env);
  const dist = getDist(env);

  const config = Object.assign(TEST_BROWSER_CONFIG, {
    mode: 'production',
    // Replace the entry point for webpack-dev-server
    entry: {
      'test-browser': resolve(__dirname, './size', `${app}.js`)
    },
    output: {
      path: resolve('/tmp'),
      filename: 'bundle.js'
    },
    resolve: {
      mainFields: env.es6 ? ['esnext', 'browser', 'module', 'main'] : ['browser', 'module', 'main'],
      alias: Object.assign({}, ALIASES, {
        'react-map-gl': resolve(__dirname, `../dist/${dist}`)
      })
    },
    plugins: [
      // leave minification to app
      new webpack.DefinePlugin({NODE_ENV: JSON.stringify('production')})
    ]
  });

  delete config.devtool;
  return config;
}

// Bundles a test app for size analysis and starts the webpack bundle analyzer
function getBundleSizeAnalyzerConfig(env) {
  const config = getBundleConfig(env);
  config.plugins.push(new BundleAnalyzerPlugin());
  return config;
}

// Pick a webpack config based on --env.*** argument to webpack
function getConfig(env) {
  if (env.test || env.test_in_browser) {
    return TEST_BROWSER_CONFIG;
  }
  if (env.bench) {
    return BENCH_BROWSER_CONFIG;
  }

  if (env.bundle) {
    return getBundleConfig(env);
  }

  return getBundleSizeAnalyzerConfig(env);
}

module.exports = env => {
  const config = getConfig(env || {});
  // NOTE uncomment to display config
  // console.log('webpack env', JSON.stringify(env));
  // console.log('webpack config', JSON.stringify(config));
  return config;
};
