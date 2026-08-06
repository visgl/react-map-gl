/* global document */
import {expect, test} from 'vitest';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';
import {Map, MapProvider, useMap} from '@vis.gl/react-maplibre';
import {waitForMapLoad} from '../utils/test-utils';

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
        <Map id="mapA" />
        <Map id="mapB" ref={mapRef} />
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
        <Map id="mapA" />
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
