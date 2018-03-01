function makeUrl(url) {
  return `https://raw.githubusercontent.com/uber-web/probe.gl/master/${url}`;
}

export default [
  // {
  //   name: 'Examples',
  //   path: '/examples',
  //   data: [
  //     // {
  //     //   name: 'Overview',
  //     //   markdown: overview
  //     // },
  //     {
  //       name: 'Showcases',
  //       children: [
  //         {
  //           path: 'layersExample',
  //           name: 'Dynamic Styling',
  //           component: require('../../examples/layers/src/app')

  //         },
  //         {
  //           path: 'controlsExample',
  //           name: 'Markers & Popups',
  //           component: require('../../examples/controls/src/app')
  //         },
  //         {
  //           path: 'geojsonExample',
  //           name: 'GeoJSON',
  //           component: require('../../examples/geojson/src/app')
  //         },
  //         {
  //           path: 'geojsonAnimationExample',
  //           name: 'GeoJSON Animation',
  //           component: require('../../examples/geojson-animation/src/app')
  //         },
  //         {
  //           path: 'interactionExample',
  //           name: 'Limit Map Interaction',
  //           component: require('../../examples/interaction/src/app')
  //         },
  //         {
  //           path: 'viewportAnimationExample',
  //           name: 'Camera Transition',
  //           component: require('../../examples/viewport-animation/src/app')
  //         },
  //         {
  //           path: 'filter',
  //           name: 'Highlight By Filter',
  //           component: require('../../examples/filter/src/app')
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Basic Examples',
  //       children: [
  //         {
  //           path: 'markerExample',
  //           name: 'Marker Example',
  //           component: require('../../examples/main/views/marker')
  //         },
  //         {
  //           path: 'notInteractive',
  //           name: 'Not Interactive',
  //           component: require('../../examples/main/views/not-interactive')
  //         },
  //         {
  //           path: 'customOverlay',
  //           name: 'Custom Overlay',
  //           component: require('../../examples/main/views/custom-overlay')
  //         },
  //         {
  //           path: 'routeOverlay',
  //           name: 'Route Overlay',
  //           component: require('../../examples/main/views/route-overlay')

  //         },
  //         {
  //           path: 'styleDiffing',
  //           name: 'Style Diffing',
  //           component: require('../../examples/main/views/style-diffing')
  //         },
  //         {
  //           path: 'clickExample',
  //           name: 'Click',
  //           component: require('../../examples/main/views/click')
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    name: 'Documentation',
    path: '/docs',
    data: [
      {
        name: 'Introduction',
        children: [
          {
            name: 'Introduction',
            markdown: require('../../docs/README.md')
          },
          {
            name: 'What\'s New',
            markdown: require('../../docs/whats-new.md')
          },
          {
            name: 'Upgrade Guide',
            markdown: require('../../docs/upgrade-guide.md')
          }
        ]
      },
      {
        name: 'Getting Started',
        children: [
          {
            name: 'Get Started',
            markdown: require('../../docs/get-started/get-started.md')
          },
          {
            name: 'About Mapbox Tokens',
            markdown: require('../../docs/get-started/mapbox-tokens.md')
          },
          {
            name: 'Adding Custom Data',
            markdown: require('../../docs/get-started/adding-custom-data.md')
          },
          {
            name: 'State Management',
            markdown: require('../../docs/get-started/state-management.md')
          }
        ]
      },
      {
        name: 'API Reference',
        children: [
          // NOTE: Keep this ordered Alphabetically
          {
            name: 'CanvasOverlay',
            markdown: require('../../docs/overlays/canvas-overlay.md')
          },
          {
            name: 'HTMLOverlay',
            markdown: require('../../docs/overlays/html-overlay.md')
          },
          {
            name: 'Interactive Map',
            markdown: require('../../docs/components/interactive-map.md')
          },
          {
            name: 'Marker',
            markdown: require('../../docs/components/marker.md')
          },
          {
            name: 'Navigation Control',
            markdown: require('../../docs/components/navigation-control.md')
          },
          {
            name: 'Popup',
            markdown: require('../../docs/components/popup.md')
          },
          {
            name: 'Static Map',
            markdown: require('../../docs/components/static-map.md')
          },
          {
            name: 'SVGOverlay',
            markdown: require('../../docs/overlays/svg-overlay.md')
          }
        ]
      }
    ]
  }
];
