import {
  Map,
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl
} from '@vis.gl/react-mapbox';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import test from 'tape-promise/tape';
import {sleep, waitForMapLoad} from '../utils/test-utils';
import {MapboxAccessToken} from '../utils/token';

test('Controls', async t => {
  const rootContainer = document.createElement('div');
  const root = createRoot(rootContainer);
  const mapRef = {current: null};

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken}>
      <AttributionControl />
    </Map>
  );
  await waitForMapLoad(mapRef);
  await sleep(1);
  t.ok(rootContainer.querySelector('.mapboxgl-ctrl-attrib'), 'Rendered <AttributionControl />');

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken}>
      <FullscreenControl />
    </Map>
  );
  await sleep(1);
  t.ok(rootContainer.querySelector('.mapboxgl-ctrl-fullscreen'), 'Rendered <FullscreenControl />');

  const geolocateControlRef = {current: null};
  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken}>
      <GeolocateControl ref={geolocateControlRef} />
    </Map>
  );
  await sleep(1);
  t.ok(rootContainer.querySelector('.mapboxgl-ctrl-geolocate'), 'Rendered <GeolocateControl />');
  t.ok(geolocateControlRef.current, 'GeolocateControl created');

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken}>
      <NavigationControl />
    </Map>
  );
  await sleep(1);
  t.ok(rootContainer.querySelector('.mapboxgl-ctrl-zoom-in'), 'Rendered <NavigationControl />');

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken}>
      <ScaleControl />
    </Map>
  );
  await sleep(1);
  t.ok(rootContainer.querySelector('.mapboxgl-ctrl-scale'), 'Rendered <ScaleControl />');

  root.unmount();

  t.end();
});
