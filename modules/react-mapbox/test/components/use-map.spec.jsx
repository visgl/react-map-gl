import {Map, MapProvider, useMap} from '@vis.gl/react-mapbox';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';
import {expect, test} from 'vitest';
import {waitForMapLoad} from '../utils/test-utils';
import {MapboxAccessToken} from '../utils/token';

test('useMap', async () => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  let maps = null;
  function TestControl() {
    maps = useMap();
    return null;
  }

  await act(() =>
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
    )
  );

  await waitForMapLoad(mapRef);

  expect(maps.mapA, 'Context has mapA').toBeTruthy();
  expect(maps.mapB, 'Context has mapB').toBeTruthy();

  await act(() =>
    root.render(
      <MapProvider>
        <Map id="mapA" mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken} />
        <TestControl />
      </MapProvider>
    )
  );
  expect(maps.mapA, 'Context has mapA').toBeTruthy();
  expect(maps.mapB, 'mapB is removed').toBeFalsy();

  await act(() =>
    root.render(
      <MapProvider>
        <TestControl />
      </MapProvider>
    )
  );
  expect(maps.mapA, 'mapA is removed').toBeFalsy();

  await act(() => root.unmount());
});
