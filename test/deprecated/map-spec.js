import MapGL from 'react-map-gl';

import React from 'react';
import ReactDOM from 'react-dom';
import document from 'global/document';
import test from 'tape-catch';

const mapboxApiAccessToken = process.env.MapboxAccessToken || process.env.MAPBOX_ACCESS_TOKEN; // eslint-disable-line

const defaultProps = {
  width: 500,
  height: 500,
  longitude: -122,
  latitude: 37,
  zoom: 14,
  mapboxApiAccessToken
};

test('MapGL can mount', t => {
  t.ok(MapGL);
  const reactContainer = document.createElement('div');
  document.body.appendChild(reactContainer);
  ReactDOM.render(<MapGL {...defaultProps} />, reactContainer);
  t.ok(true);
  t.end();
});

test('MapGL call onLoad when provided', t => {
  const reactContainer = document.createElement('div');
  document.body.appendChild(reactContainer);

  function onLoad(...args) {
    t.equal(args.length, 0, 'onLoad does not expose the map object.');
    t.end();
  }

  const props = {...defaultProps, onLoad};
  ReactDOM.render(<MapGL {...props} />, reactContainer);

  if (!MapGL.supported()) {
    t.end();
  }

});
