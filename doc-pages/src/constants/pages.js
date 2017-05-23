function getDocUrl(filename) {
  return `../../docs/${filename}`;
}
// function getCodeUrl(pathname) {
//   return `https://github.com/uber/deck.gl/tree/master/${pathname}`;
// }

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
          name: 'What\'s New',
          content: getDocUrl('whats-new.md')
        },
        {
          name: 'Upgrade From V3',
          content: getDocUrl('upgrade-guide.md')
        }
      ]
    }
  ])
};

export const Pages = [
  docPages
];
