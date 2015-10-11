'use strict';

var Immutable = require('immutable');

module.exports = Immutable.Map({
  version: 8,
  name: 'Testing OSM raster source',
  sources: {
    'raster-osm-source': {
      type: 'raster',
      tileSize: 256,
      scheme: 'xyz',
      tilejson: '2.0.0',
      tiles: ['http://tile.openstreetmap.org/{z}/{x}/{y}.png']
    }
  },
  layers: [
    {
      id: 'raster-osm',
      type: 'raster',
      source: 'raster-osm-source',
      'source-layer': 'rastor_osm_full',
      paint: {
        'raster-opacity': 1
      }
    }
  ]
});
