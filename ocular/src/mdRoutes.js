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
  //       children: []
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
          },
        ]
      },
    ]
  }
];
