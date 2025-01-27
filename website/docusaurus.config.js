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

  themeConfig: {
    footer: {
      copyright: '<p>Copyright <a href="https://openjsf.org">OpenJS Foundation</a> and vis.gl contributors. All rights reserved. The <a href="https://openjsf.org">OpenJS Foundation</a> has registered trademarks and uses trademarks. For a list of trademarks of the <a href="https://openjsf.org">OpenJS Foundation</a>, please see our <a href="https://trademark-policy.openjsf.org">Trademark Policy</a> and <a href="https://trademark-list.openjsf.org">Trademark List</a>. Trademarks and logos not indicated on the <a href="https://trademark-list.openjsf.org">list of OpenJS Foundation trademarks</a> are trademarks&trade; or registered&reg; trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.</p><p><a href="https://openjsf.org">The OpenJS Foundation</a> | <a href="https://terms-of-use.openjsf.org">Terms of Use</a> | <a href="https://privacy-policy.openjsf.org">Privacy Policy</a> | <a href="https://bylaws.openjsf.org">Bylaws</a> | <a href="https://code-of-conduct.openjsf.org">Code of Conduct</a> | <a href="https://trademark-policy.openjsf.org">Trademark Policy</a> | <a href="https://trademark-list.openjsf.org">Trademark List</a> | <a href="https://www.linuxfoundation.org/cookies">Cookie Policy</a></p>'
    }
  },

  customCss: [
    './src/styles.css',
    './src/mapbox-gl.css',
    './src/maplibre-gl.css'
  ]
});

module.exports = config;
