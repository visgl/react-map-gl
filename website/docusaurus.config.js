// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const webpack = require('webpack');
const {resolve} = require('path');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React Map GL',
  tagline: 'React wrapper for MapLibre GL JS and Mapbox GL JS',
  url: 'https://visgl.github.io/',
  baseUrl: '/react-map-gl/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/favicon.ico',
  organizationName: 'visgl', // Usually your GitHub org/user name.
  projectName: 'react-map-gl', // Usually your repo name.
  trailingSlash: false,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '../docs',
          sidebarPath: resolve('./src/docs-sidebar.js'),
          // Point to to the website directory in your repo.
          editUrl: 'https://github.com/visgl/react-map-gl/tree/master/docs'
        },
        theme: {
          customCss: [
            resolve('./src/styles.css'),
            resolve('../node_modules/mapbox-gl/dist/mapbox-gl.css'),
            resolve('./node_modules/@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'),
            resolve('./node_modules/@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css')
          ]
        }
      })
    ]
  ],

  plugins: [
    [
      './ocular-docusaurus-plugin',
      {
        debug: true,
        resolve: {
          modules: [resolve('node_modules'), resolve('../node_modules')],
          alias: {
            'react-map-gl': resolve('../src'),
            'mapbox-gl': resolve('../node_modules/mapbox-gl'),
            'maplibre-gl': resolve('../node_modules/maplibre-gl'),
            'website-examples': resolve('../examples'),
            react: resolve('node_modules/react'),
            'react-dom': resolve('node_modules/react-dom'),
          }
        },
        plugins: [
          new webpack.EnvironmentPlugin([
            'MapboxAccessToken'
          ]),
          // These modules break server side bundling
          new webpack.IgnorePlugin({
            resourceRegExp: /asciify-image/
          })
        ],
        module: {
          rules: [
            // https://github.com/Esri/calcite-components/issues/2865
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false
              }
            }
          ]
        }
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'examples',
        path: './src/examples',
        routeBasePath: 'examples',
        sidebarPath: resolve('./src/examples-sidebar.js'),
        breadcrumbs: false,
        docItemComponent: resolve('./src/components/example/doc-item-component.jsx')
      }
    ]
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        // https://github.com/easyops-cn/docusaurus-search-local#theme-options
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'react-map-gl',
        logo: {
          alt: 'vis.gl Logo',
          src: 'images/visgl-logo-dark.png',
          srcDark: 'images/visgl-logo-light.png'
        },
        items: [
          {
            to: '/examples',
            position: 'left',
            label: 'Examples'
          },
          {
            to: '/docs',
            position: 'left',
            label: 'Docs'
          },
          {
            href: 'https://github.com/visgl/react-map-gl',
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Resources',
            items: [
              {
                label: 'API Reference',
                to: '/docs/api-reference/map'
              },
              {
                label: 'Starter templates',
                href: 'https://github.com/visgl/react-map-gl/tree/master/examples/get-started'
              }
            ]
          },
          {
            title: 'Other vis.gl Libraries',
            items: [
              {
                label: 'deck.gl',
                href: 'https://deck.gl'
              },
              {
                label: 'luma.gl',
                href: 'https://luma.gl'
              },
              {
                label: 'loaders.gl',
                href: 'https://loaders.gl'
              },
              {
                label: 'kepler.gl',
                href: 'https://kepler.gl'
              }
            ]
          },
          {
            title: 'More',
            items: [
              {
                label: 'Open Visualization',
                href: 'https://www.openvisualization.org/#'
              },
              {
                label: 'vis.gl blog on Medium',
                href: 'https://medium.com/vis-gl'
              },
              {
                label: 'GitHub',
                href: 'https://github.com/visgl/react-map-gl'
              }
            ]
          }
        ],
        copyright: '<p>Copyright <a href="https://openjsf.org">OpenJS Foundation</a> and vis.gl contributors. All rights reserved. The <a href="https://openjsf.org">OpenJS Foundation</a> has registered trademarks and uses trademarks.  For a list of trademarks of the <a href="https://openjsf.org">OpenJS Foundation</a>, please see our <a href="https://trademark-policy.openjsf.org">Trademark Policy</a> and <a href="https://trademark-list.openjsf.org">Trademark List</a>.  Trademarks and logos not indicated on the <a href="https://trademark-list.openjsf.org">list of OpenJS Foundation trademarks</a> are trademarks&trade; or registered&reg; trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.</p><p><a href="https://openjsf.org">The OpenJS Foundation</a> | <a href="https://terms-of-use.openjsf.org">Terms of Use</a> | <a href="https://privacy-policy.openjsf.org">Privacy Policy</a> | <a href="https://bylaws.openjsf.org">Bylaws</a> | <a href="https://code-of-conduct.openjsf.org">Code of Conduct</a> | <a href="https://trademark-policy.openjsf.org">Trademark Policy</a> | <a href="https://trademark-list.openjsf.org">Trademark List</a> | <a href="https://www.linuxfoundation.org/cookies">Cookie Policy</a></p>'
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
};

module.exports = config;
