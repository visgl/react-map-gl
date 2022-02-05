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
        PROJECT_ORG: 'visgl',
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
            componentUrl: resolve(__dirname, '../examples/layers/src/app.tsx'),
            path: 'examples/layers'
          },
          {
            title: 'Markers & Popups',
            image: 'images/example-controls.jpg',
            componentUrl: resolve(__dirname, '../examples/controls/src/app.tsx'),
            path: 'examples/controls'
          },
          {
            title: 'Custom Cursor',
            image: 'images/example-custom-cursor.jpg',
            componentUrl: resolve(__dirname, '../examples/custom-cursor/src/app.tsx'),
            path: 'examples/custom-cursor'
          },
          {
            title: 'Draggable Marker',
            image: 'images/example-draggable-markers.jpg',
            componentUrl: resolve(__dirname, '../examples/draggable-markers/src/app.tsx'),
            path: 'examples/draggable-markers'
          },
          {
            title: 'GeoJSON',
            image: 'images/example-geojson.jpg',
            componentUrl: resolve(__dirname, '../examples/geojson/src/app.tsx'),
            path: 'examples/geojson'
          },
          {
            title: 'GeoJSON Animation',
            image: 'images/example-geojson-animation.jpg',
            componentUrl: resolve(__dirname, '../examples/geojson-animation/src/app.tsx'),
            path: 'examples/geojson-animation'
          },
          {
            title: 'Clusters',
            image: 'images/example-clusters.jpg',
            componentUrl: resolve(__dirname, '../examples/clusters/src/app.tsx'),
            path: 'examples/clusters'
          },
          {
            title: 'Limit Map Interaction',
            image: 'images/example-interaction.jpg',
            componentUrl: resolve(__dirname, '../examples/interaction/src/app.tsx'),
            path: 'examples/interaction'
          },
          {
            title: 'Camera Transition',
            image: 'images/example-viewport-animation.jpg',
            componentUrl: resolve(__dirname, '../examples/viewport-animation/src/app.tsx'),
            path: 'examples/viewport-animation'
          },
          {
            title: 'Highlight By Filter',
            image: 'images/example-filter.jpg',
            componentUrl: resolve(__dirname, '../examples/filter/src/app.tsx'),
            path: 'examples/filter'
          },
          {
            title: 'Zoom To Bounds',
            image: 'images/example-zoom-to-bounds.jpg',
            componentUrl: resolve(__dirname, '../examples/zoom-to-bounds/src/app.tsx'),
            path: 'examples/zoom-to-bounds'
          },
          {
            title: 'Heatmap',
            image: 'images/example-heatmap.jpg',
            componentUrl: resolve(__dirname, '../examples/heatmap/src/app.tsx'),
            path: 'examples/heatmap'
          },
          {
            title: 'Draw Polygon',
            image: 'images/example-draw-polygon.jpg',
            componentUrl: resolve(__dirname, '../examples/draw-polygon/src/app.tsx'),
            path: 'examples/draw-polygon'
          },
          {
            title: 'Terrain',
            image: 'images/example-terrain.jpg',
            componentUrl: resolve(__dirname, '../examples/terrain/src/app.tsx'),
            path: 'examples/terrain'
          },
          {
            title: 'Geocoder',
            image: 'images/example-geocoder.jpg',
            componentUrl: resolve(__dirname, '../examples/geocoder/src/app.tsx'),
            path: 'examples/geocoder'
          },
          {
            title: 'Side by Side',
            image: 'images/example-side-by-side.jpg',
            componentUrl: resolve(__dirname, '../examples/side-by-side/src/app.tsx'),
            path: 'examples/side-by-side'
          }
        ],

        THEME_OVERRIDES: require('./src/theme.json'),

        STYLESHEETS: [
          'https://api.tiles.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css',
          'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.3.0/mapbox-gl-draw.css',
          'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css',
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
