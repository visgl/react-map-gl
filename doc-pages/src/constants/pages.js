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
    tree.path = tree.name.match(/(GeoJson|3D|API|([A-Z]|^)[a-z'0-9]+|\d+)/g)
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

const docPages = {
  title: 'Documentation',
  paths: generatePath([
    {
      name: 'Overview',
      children: [
        {
          name: 'Get Started',
          content: getDocUrl('get-started/README.md')
        },
        {
          name: 'What\'s New',
          content: getDocUrl('get-started/whats-new.md')
        },
        {
          name: 'Upgrade Guide',
          content: getDocUrl('get-started/upgrade-guide.md')
        },
      ]
    },
    {
      name: 'Components',
      children: [
        {
          name: 'Static Map',
          content: getDocUrl('components/static-map.md')
        },
        {
          name: 'Interactive Map',
          content: getDocUrl('components/interactive-map.md')
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
          name: 'Marker',
          content: getDocUrl('components/marker.md')
        },
      ]
    },
    {
      name: 'Util Functions',
      children: [
        {
          name: 'Fit Bounds',
          content: getDocUrl('utils/fit-bounds.md')
        },
      ],
    },
    {
      name: 'Advanced',
      children: [
        {
          name: 'Custom Map Controls',
          content: getDocUrl('advanced/custom-map-controls.md')
        },
      ]
    },
  ])
};

export const Pages = [
  docPages
];
