const webpack = require('webpack');
const {getDocusaurusConfig} = require('@vis.gl/docusaurus-website');
const {resolve} = require('path');

const config = getDocusaurusConfig({
  projectName: 'react-map-gl',
  tagline: 'React components for Mapbox GL JS and Maplibre GL JS',
  siteUrl: 'https://visgl.github.io/react-map-gl',
  repoUrl: 'https://github.com/visgl/react-map-gl',

  docsTableOfContents: require('../docs/table-of-contents.json'),

  examplesDir: './src/examples',
  exampleTableOfContents: require('./src/examples/table-of-contents.json'),

  search: 'local',

  webpackConfig: {
    plugins: [
      new webpack.EnvironmentPlugin({
        MapboxAccessToken: 'MapboxAccessToken'
      })
    ],
    resolve: {
      alias: {
        'mapbox-examples': resolve('../examples/mapbox'),
        'maplibre-examples': resolve('../examples/maplibre')
      }
    }
  },

  customCss: [
    './src/styles.css',
    './src/mapbox-gl.css',
    './src/maplibre-gl.css'
  ]
});

module.exports = config;
