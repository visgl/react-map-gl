/* global document */
import {expect, test} from 'vitest';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';
import {
  Map,
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl
} from '@vis.gl/react-maplibre';
import {waitForMapLoad} from '../utils/test-utils';

test('Controls', async () => {
  const rootContainer = document.createElement('div');
  const root = createRoot(rootContainer);
  const mapRef = {current: null};

  await act(() =>
    root.render(
      <Map ref={mapRef}>
        <AttributionControl />
      </Map>
    )
  );
  await waitForMapLoad(mapRef);
  expect(
    rootContainer.querySelector('.maplibregl-ctrl-attrib'),
    'Rendered <AttributionControl />'
  ).toBeTruthy();

  await act(() =>
    root.render(
      <Map ref={mapRef}>
        <FullscreenControl />
      </Map>
    )
  );
  expect(
    rootContainer.querySelector('.maplibregl-ctrl-fullscreen'),
    'Rendered <FullscreenControl />'
  ).toBeTruthy();

  const geolocateControlRef = {current: null};
  await act(() =>
    root.render(
      <Map ref={mapRef}>
        <GeolocateControl ref={geolocateControlRef} />
      </Map>
    )
  );
  expect(
    rootContainer.querySelector('.maplibregl-ctrl-geolocate'),
    'Rendered <GeolocateControl />'
  ).toBeTruthy();
  expect(geolocateControlRef.current, 'GeolocateControl created').toBeTruthy();

  await act(() =>
    root.render(
      <Map ref={mapRef}>
        <NavigationControl />
      </Map>
    )
  );
  expect(
    rootContainer.querySelector('.maplibregl-ctrl-zoom-in'),
    'Rendered <NavigationControl />'
  ).toBeTruthy();

  await act(() =>
    root.render(
      <Map ref={mapRef}>
        <ScaleControl />
      </Map>
    )
  );
  expect(
    rootContainer.querySelector('.maplibregl-ctrl-scale'),
    'Rendered <ScaleControl />'
  ).toBeTruthy();

  await act(() => root.unmount());
});
