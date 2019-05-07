import {Marker} from 'react-map-gl';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import WebMercatorViewport from 'viewport-mercator-project';
import sinon from 'sinon';
import test from 'tape-catch';

import {_MapContext as MapContext} from 'react-map-gl';

const mockStaticContext = {
  viewport: new WebMercatorViewport({
    width: 800,
    height: 600,
    longitude: -122.58,
    latitude: 37.74,
    zoom: 14
  })
};
const mockInteractiveContext = Object.assign({}, mockStaticContext, {
  eventManager: {
    on: sinon.spy(),
    off: sinon.spy()
  }
});

test('Marker#renders children', t => {
  t.ok(Marker, 'Marker is defined');

  const marker = React.createElement(
    Marker,
    {
      latitude: 37,
      longitude: -122
    },
    React.createElement('div', {className: 'test-marker'}, ['hello'])
  );
  const staticUsage = React.createElement(MapContext.Provider, {value: mockStaticContext}, marker);
  const interactiveUsage = React.createElement(
    MapContext.Provider,
    {value: mockInteractiveContext},
    marker
  );

  const result = ReactTestRenderer.create(staticUsage);
  let resultRoot = result.root;

  t.ok(resultRoot.findByProps({className: 'mapboxgl-marker '}));
  t.equal(resultRoot.findByProps({className: 'test-marker'}).children[0], 'hello');

  result.update(interactiveUsage);
  resultRoot = result.root;

  t.ok(resultRoot.findByProps({className: 'mapboxgl-marker '}));

  result.unmount();

  t.end();
});
