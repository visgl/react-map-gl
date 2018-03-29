// Launch script for various Node test configurations

// Enables ES2015 import/export in Node.js
require('reify');

require('../aliases');

/* global process */
const path = require('path');
const moduleAlias = require('module-alias');

const {BrowserTestDriver} = require('probe.gl/test-utils');

const mode = process.argv.length >= 3 ? process.argv[2] : 'default';
console.log(`Running ${mode} tests...`); // eslint-disable-line

switch (mode) {
case 'test':
  require('./src/index'); // Run the tests
  break;

case 'test-dist':
  // Load deck.gl itself from the dist folder
  moduleAlias.addAlias('deck.gl', path.resolve('./dist'));
  require('./src/index'); // Run the tests
  break;

case 'test-browser':
  new BrowserTestDriver().run({
    process: 'webpack-dev-server',
    parameters: ['--env.test-browser'],
    exposeFunction: 'testDone'
  });
  break;

default:
  console.error(`Unknown test mode ${mode}`); // eslint-disable-line
}
