const webpack = require('webpack');
const {getDocusaurusConfig} = require('@vis.gl/docusaurus-website');
const {resolve} = require('path');

const SITE_URL = 'https://visgl.github.io/react-map-gl';

const sharedDocPatterns = [
  'README.md',
  'whats-new.md',
  'upgrade-guide.md',
  'contributing.md',
  'get-started/**'
];
const mapboxApiPatterns = ['api-reference/mapbox/**'];
const maplibreApiPatterns = ['api-reference/maplibre/**'];
const mapboxDocPatterns = [...sharedDocPatterns, ...mapboxApiPatterns];
const maplibreDocPatterns = [...sharedDocPatterns, ...maplibreApiPatterns];

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
  ],

  plugins: [
    [
      'docusaurus-plugin-llms',
      {
        docsDir: [{path: '../docs', routeBasePath: 'docs', label: 'Docs'}],
        generateLLMsTxt: false,
        generateLLMsFullTxt: false,
        generateMarkdownFiles: false,
        excludeImports: true,
        removeDuplicateHeadings: true,
        title: 'react-map-gl',
        description: 'React components for Mapbox GL JS and MapLibre GL JS',
        customLLMFiles: [
          {
            filename: 'llms.txt',
            fullContent: false,
            title: 'react-map-gl',
            description: 'React components for Mapbox GL JS and MapLibre GL JS',
            includePatterns: sharedDocPatterns,
            orderPatterns: sharedDocPatterns,
            includeUnmatchedLast: false,
            rootContent: `Choose the documentation bundle for your base map library:

- [Mapbox GL JS index](${SITE_URL}/llms-mapbox.txt) (full content: [llms-mapbox-full.txt](${SITE_URL}/llms-mapbox-full.txt))
- [MapLibre GL JS index](${SITE_URL}/llms-maplibre.txt) (full content: [llms-maplibre-full.txt](${SITE_URL}/llms-maplibre-full.txt))

Only load one stack's files — API reference pages are parallel but not interchangeable.`
          },
          {
            filename: 'llms-mapbox.txt',
            fullContent: false,
            title: 'react-map-gl (Mapbox GL JS)',
            description: 'Docs for react-map-gl with Mapbox GL JS',
            includePatterns: mapboxDocPatterns,
            orderPatterns: mapboxDocPatterns,
            includeUnmatchedLast: false
          },
          {
            filename: 'llms-mapbox-full.txt',
            fullContent: true,
            title: 'react-map-gl (Mapbox GL JS) — full',
            description: 'Docs for react-map-gl with Mapbox GL JS',
            includePatterns: mapboxDocPatterns,
            orderPatterns: mapboxDocPatterns,
            includeUnmatchedLast: false
          },
          {
            filename: 'llms-maplibre.txt',
            fullContent: false,
            title: 'react-map-gl (MapLibre GL JS)',
            description: 'Docs for react-map-gl with MapLibre GL JS',
            includePatterns: maplibreDocPatterns,
            orderPatterns: maplibreDocPatterns,
            includeUnmatchedLast: false
          },
          {
            filename: 'llms-maplibre-full.txt',
            fullContent: true,
            title: 'react-map-gl (MapLibre GL JS) — full',
            description: 'Docs for react-map-gl with MapLibre GL JS',
            includePatterns: maplibreDocPatterns,
            orderPatterns: maplibreDocPatterns,
            includeUnmatchedLast: false
          }
        ]
      }
    ]
  ]
});

module.exports = config;
