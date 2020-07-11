import test from 'tape-catch';
import {MapContext, MapProvider} from 'react-map-gl';
import * as React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import WebMercatorViewport from 'viewport-mercator-project';

const testCase = (
  <MapProvider>
    <MapContext.Consumer>
      {({viewport, map}) => (
        <>
          <div className="viewport">viewport: {JSON.stringify(viewport)}</div>
          <div className="map">map: {JSON.stringify(map)}</div>
        </>
      )}
    </MapContext.Consumer>
  </MapProvider>
);

test.only('MapProvider - Provides a default viewport', t => {
  const DEFUALT_VIEWPORT = {latitude: -37, longitude: 144, zoom: 15};
  const result = ReactTestRenderer.create(
    <MapProvider defaultViewport={new WebMercatorViewport(DEFUALT_VIEWPORT)}>
      {testCase}
    </MapProvider>
  );

  const resultRoot = result.root;

  /** Assert the viewport is coming through the context consumer. */
  t.ok(
    resultRoot.findByProps('className', 'viewport').children[0],
    `viewport: ${JSON.stringify(DEFUALT_VIEWPORT)}`
  );
});
