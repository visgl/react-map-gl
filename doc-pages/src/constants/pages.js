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
      name: 'Get Started',
      children: [
        {
          name: 'Introduction',
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
        {
          name: 'Interactivity',
          content: getDocUrl('get-started/interactivity.md')
        },
      ]
    },
    {
      name: 'Controls',
      children: [
        {
          name: 'Static Map',
          content: getDocUrl('controls/static-map.md')
        },
        {
          name: 'Interactive Map',
          content: getDocUrl('controls/interactive-map.md')
        },
        {
          name: 'Navigation Control',
          content: getDocUrl('controls/navigation-control.md')
        },
        {
          name: 'Popup',
          content: getDocUrl('controls/Popup.md')
        },
        {
          name: 'Marker',
          content: getDocUrl('controls/Marker.md')
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
      ]
    },
  ])
};

console.log(docPages);

export const Pages = [
  docPages
];
