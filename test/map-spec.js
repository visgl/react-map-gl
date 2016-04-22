import document from 'global/document';
/* global process */
import React from 'react';
import ReactDOM from 'react-dom';
import test from 'tape-catch';
import MapGL from '../src';

/* eslint-disable no-process-env */
// This will get converted to a string by envify
const mapboxApiAccessToken = process.env.MapboxAccessToken;
/* eslint-enable no-process-env */

/* eslint-disable func-names, no-shadow */
test('MapGL', function(t) {
  t.test('Exists', function(t) {
    t.ok(MapGL);
    const map = (
      <MapGL
        width={ 500 }
        height={ 500 }
        longitude={ -122 }
        latitude={ 37 }
        zoom={ 14 }
        mapboxApiAccessToken={ mapboxApiAccessToken }/>
    );
    const reactContainer = document.createElement('div');
    document.body.appendChild(reactContainer);
    ReactDOM.render(map, reactContainer);
    t.ok(true);
    t.end();
  });
});
/* eslint-enable func-names */
