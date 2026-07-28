const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://visgl.github.io/react-map-gl';
const BUILD_DIR = path.join(__dirname, '../build');
const REPO_ROOT = path.join(__dirname, '../..');
const EXAMPLES_TOC = path.join(__dirname, '../src/examples/table-of-contents.json');

function getExampleIdsByStack(toc) {
  const stacks = {mapbox: [], maplibre: []};

  for (const entry of toc) {
    if (entry.type !== 'category') {
      continue;
    }
    const label = entry.label.toLowerCase();
    if (label === 'mapbox') {
      stacks.mapbox = entry.items;
    } else if (label === 'maplibre') {
      stacks.maplibre = entry.items;
    }
  }

  return stacks;
}

function readTitle(exampleId) {
  const mdxPath = path.join(__dirname, '../src/examples', `${exampleId}.mdx`);
  if (fs.existsSync(mdxPath)) {
    const firstLine = fs.readFileSync(mdxPath, 'utf8').split('\n')[0];
    const match = firstLine.match(/^#\s+(.+)$/);
    if (match) {
      return match[1].trim();
    }
  }

  const readmePath = path.join(REPO_ROOT, 'examples', exampleId, 'README.md');
  if (fs.existsSync(readmePath)) {
    const firstLine = fs.readFileSync(readmePath, 'utf8').split('\n')[0];
    const match = firstLine.match(/^#\s+Example:\s*(.+)$/);
    if (match) {
      return match[1].trim();
    }
  }

  const slug = exampleId.split('/').pop();
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function readBlurb(exampleId) {
  const readmePath = path.join(REPO_ROOT, 'examples', exampleId, 'README.md');
  if (!fs.existsSync(readmePath)) {
    return null;
  }

  const content = fs.readFileSync(readmePath, 'utf8');
  const showcaseMatch = content.match(/This example showcases how to ([^\n.]+(?:\.[^\n.]+)*)\./i);
  if (showcaseMatch) {
    return showcaseMatch[1].trim().replace(/\.$/, '');
  }

  return null;
}

function readReadmeIntro(exampleId) {
  const readmePath = path.join(REPO_ROOT, 'examples', exampleId, 'README.md');
  if (!fs.existsSync(readmePath)) {
    return null;
  }

  const lines = fs.readFileSync(readmePath, 'utf8').split('\n');
  const intro = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('## Usage')) {
      break;
    }
    if (line) {
      intro.push(line);
    }
  }

  return intro.join('\n').trim() || null;
}

function buildExampleLinks(exampleIds) {
  return exampleIds.map(exampleId => {
    const title = readTitle(exampleId);
    const blurb = readBlurb(exampleId);
    const url = `${SITE_URL}/examples/${exampleId}`;
    const description = blurb ? `: ${blurb}` : '';
    return `- [${title}](${url})${description}`;
  });
}

function buildExampleSections(exampleIds) {
  const sections = [];

  for (const exampleId of exampleIds) {
    const title = readTitle(exampleId);
    const url = `${SITE_URL}/examples/${exampleId}`;
    const intro = readReadmeIntro(exampleId);
    const blurb = readBlurb(exampleId);

    sections.push(`### ${title}\n\n[View example](${url})`);
    if (intro) {
      sections.push(`\n${intro}`);
    } else if (blurb) {
      sections.push(`\nThis example showcases how to ${blurb}.`);
    }
    sections.push('');
  }

  return sections.join('\n');
}

function appendSection(filePath, section) {
  if (!fs.existsSync(filePath)) {
    console.warn(`Skipping ${path.basename(filePath)} — file not found`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8').trimEnd();
  fs.writeFileSync(filePath, `${content}\n\n${section}\n`);
}

function fixDocUrls(content) {
  return content
    .replace(
      /https:\/\/visgl\.github\.io\/docs\/\.\.\/docs\/README\.md/g,
      `${SITE_URL}/docs`
    )
    .replace(
      /https:\/\/visgl\.github\.io\/react-map-gl\/docs\/get-started\/get-started\.md/g,
      `${SITE_URL}/docs/get-started.md`
    );
}

function fixUrlsInLlmsFiles() {
  const llmsFiles = fs
    .readdirSync(BUILD_DIR)
    .filter(name => name.startsWith('llms') && name.endsWith('.txt'))
    .map(name => path.join(BUILD_DIR, name));

  for (const filePath of llmsFiles) {
    const fixed = fixDocUrls(fs.readFileSync(filePath, 'utf8'));
    fs.writeFileSync(filePath, fixed);
  }
}

function main() {
  const toc = JSON.parse(fs.readFileSync(EXAMPLES_TOC, 'utf8'));
  const stacks = getExampleIdsByStack(toc);

  for (const [stack, exampleIds] of Object.entries(stacks)) {
    if (exampleIds.length === 0) {
      continue;
    }

    const linksSection = `## Examples\n\n${buildExampleLinks(exampleIds).join('\n')}`;
    appendSection(path.join(BUILD_DIR, `llms-${stack}.txt`), linksSection);

    const fullSection = `## Examples\n\n${buildExampleSections(exampleIds)}`;
    appendSection(path.join(BUILD_DIR, `llms-${stack}-full.txt`), fullSection);

    console.log(`Appended ${exampleIds.length} ${stack} examples to llms-${stack}.txt`);
  }

  fixUrlsInLlmsFiles();
  console.log('Fixed doc URLs in generated llms files');
}

main();
