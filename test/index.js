require('tap-browser-color')();

var document = require('global/document');
var test = require('tape');
var MapGL = require('../dist/index');
var React = require('react');
var ReactDOM = require('react-dom');
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
    var reactContainer = document.createElement('div');
    document.body.appendChild(reactContainer);
    ReactDOM.render(map, reactContainer);
    t.ok(true);
    t.end();
  });
});
/* eslint-enable func-names */
