export const makeUrl = url =>
  `https://raw.githubusercontent.com/uber-web/probe.gl/master/${url}`;

export default [
  {
    name: 'Examples',
    path: '/examples',
    data: [
      {
        name: 'Showcases',
        children: [
          {
            path: 'layersExample',
            name: 'Dynamic Styling',
            component: require('../../examples/layers/src/app').default

          },
          {
            path: 'controlsExample',
            name: 'Markers & Popups',
            component: require('../../examples/controls/src/app').default
          },
          {
            path: 'geojsonExample',
            name: 'GeoJSON',
            component: require('../../examples/geojson/src/app').default
          },
          {
            path: 'geojsonAnimationExample',
            name: 'GeoJSON Animation',
            component: require('../../examples/geojson-animation/src/app').default
          },
          {
            path: 'interactionExample',
            name: 'Limit Map Interaction',
            component: require('../../examples/interaction/src/app').default
          },
          {
            path: 'viewportAnimationExample',
            name: 'Camera Transition',
            component: require('../../examples/viewport-animation/src/app').default
          },
          {
            path: 'filter',
            name: 'Highlight By Filter',
            component: require('../../examples/filter/src/app').default
          }
        ]
      },
      {
        name: 'Basic Examples',
        children: [
          {
            path: 'markerExample',
            name: 'Marker Example',
            component: require('../../examples/main/views/marker')
          },
          {
            path: 'notInteractive',
            name: 'Not Interactive',
            component: require('../../examples/main/views/not-interactive')
          },
          {
            path: 'customOverlay',
            name: 'Custom Overlay',
            component: require('../../examples/main/views/custom-overlay')
          },
          {
            path: 'routeOverlay',
            name: 'Route Overlay',
            component: require('../../examples/main/views/route-overlay')

          },
          {
            path: 'styleDiffing',
            name: 'Style Diffing',
            component: require('../../examples/main/views/style-diffing')
          },
          {
            path: 'clickExample',
            name: 'Click',
            component: require('../../examples/main/views/click')
          }
        ]
      }
    ]
  },
  {
    name: 'Documentation',
    path: '/docs',
    data: [
      {
        name: 'Introduction',
        children: [
          {
            name: 'Introduction',
            markdownUrl: makeUrl('docs/README.md')
          },
          {
            name: 'What\'s New',
            markdownUrl: makeUrl('docs/whats-new.md')
          },
          {
            name: 'Upgrade Guide',
            markdownUrl: makeUrl('docs/upgrade-guide.md')
          }
        ]
      },
      {
        name: 'Getting Started',
        children: [
          {
            name: 'Get Started',
            markdownUrl: makeUrl('docs/get-started/get-started.md')
          },
          {
            name: 'About Mapbox Tokens',
            markdownUrl: makeUrl('docs/get-started/mapbox-tokens.md')
          },
          {
            name: 'Adding Custom Data',
            markdownUrl: makeUrl('docs/get-started/adding-custom-data.md')
          },
          {
            name: 'State Management',
            markdownUrl: makeUrl('docs/get-started/state-management.md')
          }
        ]
      },
      {
        name: 'API Reference',
        children: [
          // NOTE: Keep this ordered Alphabetically
          {
            name: 'CanvasOverlay',
            markdownUrl: makeUrl('docs/overlays/canvas-overlay.md')
          },
          {
            name: 'HTMLOverlay',
            markdownUrl: makeUrl('docs/overlays/html-overlay.md')
          },
          {
            name: 'Interactive Map',
            markdownUrl: makeUrl('docs/components/interactive-map.md')
          },
          {
            name: 'Marker',
            markdownUrl: makeUrl('docs/components/marker.md')
          },
          {
            name: 'Navigation Control',
            markdownUrl: makeUrl('docs/components/navigation-control.md')
          },
          {
            name: 'Popup',
            markdownUrl: makeUrl('docs/components/popup.md')
          },
          {
            name: 'Static Map',
            markdownUrl: makeUrl('docs/components/static-map.md')
          },
          {
            name: 'SVGOverlay',
            markdownUrl: makeUrl('docs/overlays/svg-overlay.md')
          }
        ]
      }
    ]
  }
];
