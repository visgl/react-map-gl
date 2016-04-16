'use strict';

var document = require('global/document');
var test = require('prova');
var MapGL = require('../src/index');
var React = require('react');
var r = require('r-dom');
var process = require('global/process');
/* eslint-disable no-process-env */
// This will get converted to a string by envify
var mapboxApiAccessToken = process.env.MapboxAccessToken;
/* eslint-enable no-process-env */

/* eslint-disable func-names, no-shadow */
test('MapGL', function(t) {
  t.test('Exists', function(t) {
    t.ok(MapGL);
    var map = r(MapGL, {
      width: 500,
      height: 500,
      longitude: -122,
      latitude: 37,
      zoom: 14,
      mapboxApiAccessToken: mapboxApiAccessToken
    });
    React.render(map, document.body);
    t.ok(true);
    t.end();
  });
});

test('Changes contain bounds', function(t) {
  var map = r(MapGL, {
    width: 500,
    height: 500,
    longitude: -122,
    latitude: 37,
    zoom: 14,
    mapboxApiAccessToken: mapboxApiAccessToken,
    onChangeViewport: function onChange(changes) {
      t.equal(typeof changes.bounds, 'object');
      t.equal(typeof changes.bounds._sw.lat, 'number');
      t.end();
    }
  });
  var mapComponent = React.render(map, document.body);
  mapComponent._onChangeViewport();
});
/* eslint-enable func-names */
