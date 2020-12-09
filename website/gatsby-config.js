const {resolve} = require('path');
const DOC_TABLE_OF_CONTENTS = require('../docs/table-of-contents.json');

const ROOT_DIR = resolve('..');

module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-ocular`,
      options: {
        logLevel: 1, // Adjusts amount of debug information from ocular-gatsby

        // Folders
        DIR_NAME: __dirname,
        ROOT_FOLDER: ROOT_DIR,

        DOCS: DOC_TABLE_OF_CONTENTS,
        DOC_FOLDERS: [
          resolve(ROOT_DIR, 'docs')
        ],
        SOURCE: [
          resolve('./static'),
          resolve('./src'),
        ],

        PROJECT_TYPE: 'github',

        PROJECT_NAME: 'react-map-gl',
        PROJECT_ORG: 'uber',
        PROJECT_ORG_LOGO: 'images/visgl-logo.png',
        PROJECT_URL: 'https://github.com/visgl/',
        PROJECT_DESC: 'React wrapper for Mapbox GL JS',
        PROJECT_IMAGE: 'images/hero-sm.jpg',
        PATH_PREFIX: '/react-map-gl',

        GA_TRACKING_ID: 'UA-74374017-2',

        // For showing star counts and contributors.
        // Should be like btoa('YourUsername:YourKey') and should be readonly.
        GITHUB_KEY: null,

        HOME_PATH: '',

        PROJECTS: [
          {
            name: 'deck.gl',
            url: 'https://deck.gl'
          },
          {
            name: 'luma.gl',
            url: 'https://luma.gl'
          },
          {
            name: 'loaders.gl',
            url: 'https://loaders.gl'
          },
          {
            name: 'nebula.gl',
            url: 'https://nebula.gl/'
          }
        ],

        LINK_TO_GET_STARTED: '/docs/get-started/get-started',

        ADDITIONAL_LINKS: [{name: 'Blog', href: 'http://medium.com/vis-gl', index: 4}],

        INDEX_PAGE_URL: resolve(__dirname, './src/home.js'),

        EXAMPLES: [
          {
            title: 'Dynamic Styling',
            image: 'images/example-layers.jpg',
            componentUrl: resolve(__dirname, '../examples/layers/src/app.js'),
            path: 'examples/layers'
          },
          {
            title: 'Markers & Popups',
            image: 'images/example-controls.jpg',
            componentUrl: resolve(__dirname, '../examples/controls/src/app.js'),
            path: 'examples/controls'
          },
          {
            title: 'Custom Cursor',
            image: 'images/example-custom-cursor.jpg',
            componentUrl: resolve(__dirname, '../examples/custom-cursor/src/app.js'),
            path: 'examples/custom-cursor'
          },
          {
            title: 'Draggable Marker',
            image: 'images/example-draggable-markers.jpg',
            componentUrl: resolve(__dirname, '../examples/draggable-markers/src/app.js'),
            path: 'examples/draggable-markers'
          },
          {
            title: 'GeoJSON',
            image: 'images/example-geojson.jpg',
            componentUrl: resolve(__dirname, '../examples/geojson/src/app.js'),
            path: 'examples/geojson'
          },
          {
            title: 'GeoJSON Animation',
            image: 'images/example-geojson-animation.jpg',
            componentUrl: resolve(__dirname, '../examples/geojson-animation/src/app.js'),
            path: 'examples/geojson-animation'
          },
          {
            title: 'Clusters',
            image: 'images/example-clusters.jpg',
            componentUrl: resolve(__dirname, '../examples/clusters/src/app.js'),
            path: 'examples/clusters'
          },
          {
            title: 'Locate User',
            image: 'images/example-locate-user.jpg',
            componentUrl: resolve(__dirname, '../examples/locate-user/src/app.js'),
            path: 'examples/locate-user'
          },
          {
            title: 'Limit Map Interaction',
            image: 'images/example-interaction.jpg',
            componentUrl: resolve(__dirname, '../examples/interaction/src/app.js'),
            path: 'examples/interaction'
          },
          {
            title: 'Camera Transition',
            image: 'images/example-viewport-animation.jpg',
            componentUrl: resolve(__dirname, '../examples/viewport-animation/src/app.js'),
            path: 'examples/viewport-animation'
          },
          {
            title: 'Highlight By Filter',
            image: 'images/example-filter.jpg',
            componentUrl: resolve(__dirname, '../examples/filter/src/app.js'),
            path: 'examples/filter'
          },
          {
            title: 'Zoom To Bounds',
            image: 'images/example-zoom-to-bounds.jpg',
            componentUrl: resolve(__dirname, '../examples/zoom-to-bounds/src/app.js'),
            path: 'examples/zoom-to-bounds'
          },
          {
            title: 'Heatmap',
            image: 'images/example-heatmap.jpg',
            componentUrl: resolve(__dirname, '../examples/heatmap/src/app.js'),
            path: 'examples/heatmap'
          },
          {
            title: 'DrawPolygon',
            image: 'images/example-draw-polygon.jpg',
            componentUrl: resolve(__dirname, '../examples/draw-polygon/src/app.js'),
            path: 'examples/draw-polygon'
          }
        ],

        THEME_OVERRIDES: require('./src/theme.json'),

        STYLESHEETS: [
          'https://api.tiles.mapbox.com/mapbox-gl-js/v1.6.0/mapbox-gl.css',
          'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.0.9/mapbox-gl-draw.css',
          '/style.css'
        ]
      }
    },
    {resolve: 'gatsby-plugin-no-sourcemaps'},
    {
      resolve: 'gatsby-plugin-env-variables',
      options: {
        whitelist: ['MapboxAccessToken']
      }
    }
  ]
};
