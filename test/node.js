// Enables ES2015 import/export in Node.js
require('reify');

// Registers an alias for this module
const path = require('path');
const moduleAlias = require('module-alias');

moduleAlias.addAlias('react-map-gl', path.resolve('./src'));

// Run the tests
require('./index');
