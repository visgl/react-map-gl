/* global document */
import {expect, test} from 'vitest';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';
import {Map, Source, Layer} from '@vis.gl/react-maplibre';
import {waitForMapLoad, waitForMapStyleLoad, actUntil} from '../utils/test-utils';

test('Source/Layer', async () => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  const mapStyle = {version: 8, sources: {}, layers: []};
  const geoJSON = {
    type: 'Point',
    coordinates: [0, 0]
  };
  const pointLayer = {
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  };
  const pointLayer2 = {
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#000000'
    },
    layout: {
      visibility: 'none'
    }
  };

  await act(() =>
    root.render(
      <Map ref={mapRef}>
        <Source id="my-data" type="geojson" data={geoJSON}>
          <Layer id="my-layer" {...pointLayer} />
        </Source>
      </Map>
    )
  );
  await waitForMapLoad(mapRef);
  const layer = mapRef.current.getLayer('my-layer');
  expect(layer, 'Layer is added').toBeTruthy();

  await act(() =>
    root.render(
      <Map ref={mapRef}>
        <Source id="my-data" type="geojson" data={geoJSON}>
          <Layer id="my-layer" {...pointLayer2} />
        </Source>
      </Map>
    )
  );
  expect(layer.visibility, 'Layer is updated').toBe('none');

  const styleLoaded = waitForMapStyleLoad(mapRef);
  await act(() =>
    root.render(
      <Map ref={mapRef} mapStyle={mapStyle}>
        <Source id="my-data" type="geojson" data={geoJSON}>
          <Layer id="my-layer" {...pointLayer2} />
        </Source>
      </Map>
    )
  );
  await actUntil(resolveTest => styleLoaded.then(resolveTest));
  expect(mapRef.current.getLayer('my-layer'), 'Layer is added after style change').toBeTruthy();

  await act(() => root.render(<Map ref={mapRef} mapStyle={mapStyle} />));
  expect(mapRef.current.getSource('my-data'), 'Source is removed').toBeFalsy();
  expect(mapRef.current.getLayer('my-layer'), 'Layer is removed').toBeFalsy();

  await act(() => root.unmount());
});
