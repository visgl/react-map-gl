import {standaloneExamples} from '../../../examples/main/constants/toc';
import ExamplesComponent from '../components/examples';
import PagesComponent from '../components/page';

function getDocUrl(filename) {
  return `docs/${filename}`;
}

// mapping from file path in source to generated page url
export const markdownFiles = {};

function generatePath(tree, parentPath = '') {
  if (Array.isArray(tree)) {
    tree.forEach(branch => generatePath(branch, parentPath));
  }
  if (tree.name) {
    tree.path = tree.name.match(/(GeoJSON|3D|API|([A-Z]|^)[a-z'0-9]+|\d+)/g)
        .join('-')
        .toLowerCase()
        .replace(/[^\w-]/g, '');
  }
  if (tree.children) {
    generatePath(tree.children, `${parentPath}/${tree.path}`);
  }
  if (typeof tree.content === 'string') {
    markdownFiles[tree.content] = `${parentPath}/${tree.path}`;
  }
  return tree;
}

const examplePages = {
  title: 'Examples',
  pageComponent: ExamplesComponent,
  paths: generatePath(standaloneExamples)
};

const docPages = {
  title: 'Documentation',
  pageComponent: PagesComponent,
  paths: generatePath([
    {
      name: 'Introduction',
      children: [
        {
          name: 'Introduction',
          content: getDocUrl('README.md')
        },
        {
          name: 'What\'s New',
          content: getDocUrl('whats-new.md')
        },
        {
          name: 'Upgrade Guide',
          content: getDocUrl('upgrade-guide.md')
        }
      ]
    },
    {
      name: 'Getting Started',
      children: [
        {
          name: 'Get Started',
          content: getDocUrl('get-started/get-started.md')
        },
        {
          name: 'About Mapbox Tokens',
          content: getDocUrl('get-started/mapbox-tokens.md')
        },
        {
          name: 'Using with Redux',
          content: getDocUrl('get-started/using-with-redux.md')
        },
      ]
    },
    {
      name: 'Advanced',
      children: [
        {
          name: 'Custom Map Controls',
          content: getDocUrl('advanced/custom-map-controls.md')
        },
        {
          name: 'Viewport Transition',
          content: getDocUrl('advanced/viewport-transition.md')
        }
      ]
    },
    {
      name: 'API Reference',
      children: [
        // NOTE: Keep this ordered Alphabetically
        {
          name: 'CanvasOverlay',
          content: getDocUrl('overlays/canvas-overlay.md')
        },
        {
          name: 'HTMLOverlay',
          content: getDocUrl('overlays/html-overlay.md')
        },
        {
          name: 'Interactive Map',
          content: getDocUrl('components/interactive-map.md')
        },
        {
          name: 'Marker',
          content: getDocUrl('components/marker.md')
        },
        {
          name: 'Navigation Control',
          content: getDocUrl('components/navigation-control.md')
        },
        {
          name: 'Popup',
          content: getDocUrl('components/popup.md')
        },
        {
          name: 'Static Map',
          content: getDocUrl('components/static-map.md')
        },
        {
          name: 'SVGOverlay',
          content: getDocUrl('overlays/svg-overlay.md')
        },
      ]
    }
  ])
};

export const Pages = [
  examplePages,
  docPages
];
