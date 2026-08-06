import {
  Map,
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl
} from 'react-map-gl/mapbox-legacy';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';
import {expect, test} from 'vitest';
import {waitForMapLoad} from '../utils/test-utils';

test('Controls', async () => {
  const rootContainer = document.createElement('div');
  const root = createRoot(rootContainer);
  const mapRef = {current: null};

  await act(() =>
    root.render(
      <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
        <AttributionControl />
      </Map>
    )
  );
  await waitForMapLoad(mapRef);
  expect(
    rootContainer.querySelector('.mapboxgl-ctrl-attrib'),
    'Rendered <AttributionControl />'
  ).toBeTruthy();

  await act(() =>
    root.render(
      <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
        <FullscreenControl />
      </Map>
    )
  );
  expect(
    rootContainer.querySelector('.mapboxgl-ctrl-fullscreen'),
    'Rendered <FullscreenControl />'
  ).toBeTruthy();

  const geolocateControlRef = {current: null};
  await act(() =>
    root.render(
      <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
        <GeolocateControl ref={geolocateControlRef} />
      </Map>
    )
  );
  expect(
    rootContainer.querySelector('.mapboxgl-ctrl-geolocate'),
    'Rendered <GeolocateControl />'
  ).toBeTruthy();
  expect(geolocateControlRef.current, 'GeolocateControl created').toBeTruthy();

  await act(() =>
    root.render(
      <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
        <NavigationControl />
      </Map>
    )
  );
  expect(
    rootContainer.querySelector('.mapboxgl-ctrl-zoom-in'),
    'Rendered <NavigationControl />'
  ).toBeTruthy();

  await act(() =>
    root.render(
      <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
        <ScaleControl />
      </Map>
    )
  );
  expect(
    rootContainer.querySelector('.mapboxgl-ctrl-scale'),
    'Rendered <ScaleControl />'
  ).toBeTruthy();

  await act(() => root.unmount());
});
