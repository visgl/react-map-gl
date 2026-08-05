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
import {expect, test} from 'vitest';
import {sleep, waitForMapLoad} from '../utils/test-utils';

test('Controls', async () => {
  const rootContainer = document.createElement('div');
  const root = createRoot(rootContainer);
  const mapRef = {current: null};

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
      <AttributionControl />
    </Map>
  );
  await waitForMapLoad(mapRef);
  await sleep(1);
  expect(
    rootContainer.querySelector('.mapboxgl-ctrl-attrib'),
    'Rendered <AttributionControl />'
  ).toBeTruthy();

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
      <FullscreenControl />
    </Map>
  );
  await sleep(1);
  expect(
    rootContainer.querySelector('.mapboxgl-ctrl-fullscreen'),
    'Rendered <FullscreenControl />'
  ).toBeTruthy();

  const geolocateControlRef = {current: null};
  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
      <GeolocateControl ref={geolocateControlRef} />
    </Map>
  );
  await sleep(1);
  expect(
    rootContainer.querySelector('.mapboxgl-ctrl-geolocate'),
    'Rendered <GeolocateControl />'
  ).toBeTruthy();
  expect(geolocateControlRef.current, 'GeolocateControl created').toBeTruthy();

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
      <NavigationControl />
    </Map>
  );
  await sleep(1);
  expect(
    rootContainer.querySelector('.mapboxgl-ctrl-zoom-in'),
    'Rendered <NavigationControl />'
  ).toBeTruthy();

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
      <ScaleControl />
    </Map>
  );
  await sleep(1);
  expect(
    rootContainer.querySelector('.mapboxgl-ctrl-scale'),
    'Rendered <ScaleControl />'
  ).toBeTruthy();

  root.unmount();
});
