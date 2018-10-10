import {Marker} from 'react-map-gl';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import WebMercatorViewport from 'viewport-mercator-project';
import sinon from 'sinon';
import test from 'tape-catch';

import {StaticContext} from 'react-map-gl/components/static-map';
import {InteractiveContext} from 'react-map-gl/components/interactive-map';

const mockStaticContext = {
  viewport: new WebMercatorViewport({
    width: 800,
    height: 600,
    longitude: -122.58,
    latitude: 37.74,
    zoom: 14
  })
};
const mockInteractiveContext = {
  eventManager: {
    on: sinon.spy(),
    off: sinon.spy()
  }
};

test('Marker#renders children', t => {
  t.ok(Marker, 'Marker is defined');

  const staticUsage = React.createElement(StaticContext.Provider,
    {value: mockStaticContext},
    React.createElement(
      Marker,
      {
        latitude: 37,
        longitude: -122
      },
      React.createElement('div', {className: 'test-marker'}, ['hello'])
    )
  );
  const interactiveUsage = React.createElement(InteractiveContext.Provider,
    {value: mockInteractiveContext},
    [staticUsage]
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
