/* global document */
import {expect, test} from 'vitest';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {Map, Source, Layer} from '@vis.gl/react-maplibre';
import {sleep, waitForMapLoad} from '../utils/test-utils';

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

  root.render(
    <Map ref={mapRef}>
      <Source id="my-data" type="geojson" data={geoJSON}>
        <Layer id="my-layer" {...pointLayer} />
      </Source>
    </Map>
  );
  await waitForMapLoad(mapRef);
  await sleep(1);
  const layer = mapRef.current.getLayer('my-layer');
  expect(layer, 'Layer is added').toBeTruthy();

  root.render(
    <Map ref={mapRef}>
      <Source id="my-data" type="geojson" data={geoJSON}>
        <Layer id="my-layer" {...pointLayer2} />
      </Source>
    </Map>
  );
  await sleep(1);
  expect(layer.visibility, 'Layer is updated').toBe('none');

  root.render(
    <Map ref={mapRef} mapStyle={mapStyle}>
      <Source id="my-data" type="geojson" data={geoJSON}>
        <Layer id="my-layer" {...pointLayer2} />
      </Source>
    </Map>
  );
  await sleep(50);
  expect(mapRef.current.getLayer('my-layer'), 'Layer is added after style change').toBeTruthy();

  root.render(<Map ref={mapRef} mapStyle={mapStyle} />);
  await sleep(1);
  expect(mapRef.current.getSource('my-data'), 'Source is removed').toBeFalsy();
  expect(mapRef.current.getLayer('my-layer'), 'Layer is removed').toBeFalsy();

  root.unmount();
});
