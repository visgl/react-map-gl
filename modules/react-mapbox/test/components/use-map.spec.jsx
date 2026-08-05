import {Map, MapProvider, useMap} from '@vis.gl/react-mapbox';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {expect, test} from 'vitest';
import {sleep, waitForMapLoad} from '../utils/test-utils';
import {MapboxAccessToken} from '../utils/token';

test('useMap', async () => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  let maps = null;
  function TestControl() {
    maps = useMap();
    return null;
  }

  root.render(
    <MapProvider>
      <Map id="mapA" mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken} />
      <Map
        id="mapB"
        ref={mapRef}
        mapLib={import('mapbox-gl-v3')}
        mapboxAccessToken={MapboxAccessToken}
      />
      <TestControl />
    </MapProvider>
  );

  await waitForMapLoad(mapRef);

  expect(maps.mapA, 'Context has mapA').toBeTruthy();
  expect(maps.mapB, 'Context has mapB').toBeTruthy();

  root.render(
    <MapProvider>
      <Map id="mapA" mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken} />
      <TestControl />
    </MapProvider>
  );
  await sleep(50);
  expect(maps.mapA, 'Context has mapA').toBeTruthy();
  expect(maps.mapB, 'mapB is removed').toBeFalsy();

  root.render(
    <MapProvider>
      <TestControl />
    </MapProvider>
  );
  await sleep(50);
  expect(maps.mapA, 'mapA is removed').toBeFalsy();

  root.unmount();
});
