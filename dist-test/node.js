// Enables ES2015 import/export in Node.js
require('reify');

// Registers an alias for this module
var path = require('path');
var moduleAlias = require('module-alias');
moduleAlias.addAlias('react-map-gl', path.resolve('./dist'));

// Run the tests
require('./index');
