'use strict';

var document = require('global/document');
var MapGL = require('../src/index');
var test = require('tape-catch');
var React = require('react');
var r = require('r-dom');
var process = require('global/process');
/* eslint-disable no-process-env */
// This will get converted to a string by envify
var mapboxApiAccessToken = process.env.MapboxAccessToken;
/* eslint-enable no-process-env */

/* eslint-disable func-names, no-shadow */
test('Exists', function(t) {
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
/* eslint-enable func-names */
