// Enables ES2015 import/export in Node.js
require('reify');

// Registers an alias for this module
const path = require('path');
const moduleAlias = require('module-alias');

// Needed for `npm run test`, whereas `npm run test-browser` alias is declared in webpack.config.js
moduleAlias.addAlias('react-map-gl', path.resolve('./src'));

// Run the tests
require('./index');
