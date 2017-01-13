// Enables ES2015 import/export in Node.js
require('reify');

// Registers an alias for this module
const path = require('path');
const moduleAlias = require('module-alias');

// Load from dist: Components use JSX so we still need a minimal transpile to run tests
moduleAlias.addAlias('react-map-gl', path.resolve('./dist'));

// Run the tests
require('./index');
