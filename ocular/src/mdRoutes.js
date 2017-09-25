/* eslint-disable max-len */
import README from '../../docs/README.md';
import whatsNew from '../../docs/whats-new.md';
import upgradeGuide from '../../docs/upgrade-guide.md';
import installation from '../../docs/get-started/README.md';
import mapboxTokens from '../../docs/get-started/mapbox-tokens.md';
import usingWithRedux from '../../docs/get-started/using-with-redux.md';
import canvasOverlay from '../../docs/overlays/canvas-overlay.md';
import htmlOverlay from '../../docs/overlays/html-overlay.md';
import interactiveMap from '../../docs/components/interactive-map.md';
import marker from '../../docs/components/marker.md';
import navigationControl from '../../docs/components/navigation-control.md';
import popup from '../../docs/components/popup.md';
import staticMap from '../../docs/components/static-map.md';
import svgOverlay from '../../docs/overlays/svg-overlay.md';
// import cumstomMapControls from 'docs/advanced/custom-map-controls.md';
/* eslint-enable max-len */


// Modules
import MarkerExample from '../../examples/main/views/marker';
import NotInteractiveExample from '../../examples/main/views/not-interactive';
import CustomOverlayExample from '../../examples/main/views/custom-overlay';
import RouteOverlayExample from '../../examples/main/views/route-overlay';
import StyleDiffingExample from '../../examples/main/views/style-diffing';
import ClickExample from '../../examples/main/views/click';
// Standalone
import Filter from '../../examples/filter/src/app';
import Controls from '../../examples/controls/src/app';
import GeoJson from '../../examples/geojson/src/app';
import GeoJsonAnimation from '../../examples/geojson-animation/src/app';
import Interaction from '../../examples/interaction/src/app';
import Layers from '../../examples/layers/src/app';
import ViewportAnimation from '../../examples/viewport-animation/src/app';

export default [
  {
    name: 'Examples',
    path: '/examples',
    data: [
      // {
      //   name: 'Overview',
      //   markdown: overview
      // },
      {
        name: 'Showcases',
        children: [
          {
            path: 'layersExample',
            name: 'Dynamic Styling',
            component: Layers
          },
          {
            path: 'controlsExample',
            name: 'Markers & Popups',
            component: Controls
          },
          {
            path: 'geojsonExample',
            name: 'GeoJSON',
            component: GeoJson
          },
          {
            path: 'geojsonAnimationExample',
            name: 'GeoJSON Animation',
            component: GeoJsonAnimation
          },
          {
            path: 'interactionExample',
            name: 'Limit Map Interaction',
            component: Interaction
          },
          {
            path: 'viewportAnimationExample',
            name: 'Camera Transition',
            component: ViewportAnimation
          },
          {
            path: 'filter',
            name: 'Highlight By Filter',
            component: Filter
          }
        ]
      },
      {
        name: 'Basic Examples',
        children: [
          {
            path: 'markerExample',
            name: 'Marker Example',
            component: MarkerExample
          },
          {
            path: 'notInteractive',
            name: 'Not Interactive',
            component: NotInteractiveExample
          },
          {
            path: 'customOverlay',
            name: 'Custom Overlay',
            component: CustomOverlayExample
          },
          {
            path: 'routeOverlay',
            name: 'Route Overlay',
            component: RouteOverlayExample
          },
          {
            path: 'styleDiffing',
            name: 'Style Diffing',
            component: StyleDiffingExample
          },
          {
            path: 'clickExample',
            name: 'Click',
            component: ClickExample
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
            markdown: README
          },
          {
            name: 'What\'s New',
            markdown: whatsNew
          },
          {
            name: 'Upgrade Guide',
            markdown: upgradeGuide
          }
        ]
      },
      {
        name: 'Getting Started',
        children: [
          {
            name: 'Get Started',
            markdown: installation
          },
          {
            name: 'About Mapbox Tokens',
            markdown: mapboxTokens
          },
          {
            name: 'Using with Redux',
            markdown: usingWithRedux
          }
        ]
      },
      {
        name: 'API Reference',
        children: [
          // NOTE: Keep this ordered Alphabetically
          {
            name: 'CanvasOverlay',
            markdown: canvasOverlay
          },
          {
            name: 'HTMLOverlay',
            markdown: htmlOverlay
          },
          {
            name: 'Interactive Map',
            markdown: interactiveMap
          },
          {
            name: 'Marker',
            markdown: marker
          },
          {
            name: 'Navigation Control',
            markdown: navigationControl
          },
          {
            name: 'Popup',
            markdown: popup
          },
          {
            name: 'Static Map',
            markdown: staticMap
          },
          {
            name: 'SVGOverlay',
            markdown: svgOverlay
          }
        ]
      }
    ]
  }
];
