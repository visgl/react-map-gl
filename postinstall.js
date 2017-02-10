/* eslint-disable */
/**
 * NOTE: This is meant to be temporary, until we can figure out a good solution
 * for living in a mapbox-gl flow types world.
 */
var flowRemoveTypes = require('flow-remove-types');
var fs = require('fs');
var glob = require('glob');

var MAPBOX_PATHS = [
  '../mapbox-gl',
  'node_modules/mapbox-gl'
];

function processPathAccess(path, err) {
  // Bail if path access errored out. This means the path does not exist
  if (err) {
    return;
  }
  // Otherwise run flow remove types on files
  glob(path + '/js/**/*.js', {}, function globCallback(err, fileNames) {
    for (var i = 0; i < fileNames.length; i++) {
      var fileName = fileNames[i];
      // This doesn't have to be synchronous(?)
      var fileInput = fs.readFileSync(fileName, 'utf8');
      fs.writeFileSync(fileName, flowRemoveTypes(fileInput).toString());
    }
  });
}

MAPBOX_PATHS.forEach(function eachPath(path) {
  fs.access(path, processPathAccess.bind(null, path));
});
/* eslint-enable */
