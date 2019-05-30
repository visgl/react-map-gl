import {standaloneExamples} from '../../../examples/main/constants/toc';
import ExamplesComponent from '../components/examples';
import PagesComponent from '../components/page';

function getDocUrl(filename) {
  return `docs/${filename}`;
}

// mapping from file path in source to generated page url
export const markdownFiles = {};

function generatePath(tree, parentPath = '', depth = 0) {
  if (Array.isArray(tree)) {
    tree.forEach(branch => generatePath(branch, parentPath, depth));
    return tree;
  }

  tree.depth = depth;
  if (tree.name) {
    tree.path = tree.name
      .match(/(GeoJson|3D|API|HTML|SVG|[A-Z]?[a-z'0-9\.]+|\d+)/g)
      .join('-')
      .toLowerCase()
      .replace(/[^\w-]/g, '');
  }
  if (tree.children) {
    generatePath(tree.children, `${parentPath}/${tree.path}`, depth + 1);
  }
  if (typeof tree.content === 'string') {
    const i = tree.content.indexOf('docs/');
    if (i >= 0) {
      markdownFiles[tree.content.slice(i)] = `${parentPath}/${tree.path}`;
    }
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
          name: 'State Management',
          content: getDocUrl('get-started/state-management.md')
        },
        {
          name: 'Adding Custom Data',
          content: getDocUrl('get-started/adding-custom-data.md')
        }
      ]
    },
    {
      name: 'Advanced',
      children: [
        {
          name: 'Custom Components',
          content: getDocUrl('advanced/custom-components.md')
        },
        {
          name: 'Custom Map Controller',
          content: getDocUrl('advanced/custom-map-controller.md')
        },
        {
          name: 'Custom Overlays',
          content: getDocUrl('overlays/custom-overlays.md')
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
          name: 'FlyToInterpolator',
          content: getDocUrl('components/fly-to-interpolator.md')
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
          name: 'LinearInterpolator',
          content: getDocUrl('components/linear-interpolator.md')
        },
        {
          name: 'Marker',
          content: getDocUrl('components/marker.md')
        },
        {
          name: 'MapController',
          content: getDocUrl('components/map-controller.md')
        },
        {
          name: 'NavigationControl',
          content: getDocUrl('components/navigation-control.md')
        },
        {
          name: 'FullscreenControl',
          content: getDocUrl('components/fullscreen-control.md')
        },
        {
          name: 'GeolocateControl',
          content: getDocUrl('components/geolocate-control.md')
        },
        {
          name: 'PointerEvent',
          content: getDocUrl('components/pointer-event.md')
        },
        {
          name: 'Popup',
          content: getDocUrl('components/popup.md')
        },
        {
          name: 'StaticMap',
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
