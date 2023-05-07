import {
  Map,
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl
} from 'react-map-gl';
import * as React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import test from 'tape-promise/tape';
import mapboxMock from '../utils/mapbox-gl-mock';

test('Controls', t => {
  const renderer = ReactTestRenderer.create(<Map />);
  renderer.update(
    <Map mapLib={mapboxMock}>
      <AttributionControl />
    </Map>
  );
  t.ok(renderer.root, 'Rendered <AttributionControl />');
  renderer.update(
    <Map mapLib={mapboxMock}>
      <FullscreenControl />
    </Map>
  );
  t.ok(renderer.root, 'Rendered <FullscreenControl />');
  renderer.update(
    <Map mapLib={mapboxMock}>
      <GeolocateControl />
    </Map>
  );
  t.ok(renderer.root, 'Rendered <GeolocateControl />');
  renderer.update(
    <Map mapLib={mapboxMock}>
      <NavigationControl />
    </Map>
  );
  t.ok(renderer.root, 'Rendered <NavigationControl />');
  renderer.update(
    <Map mapLib={mapboxMock}>
      <ScaleControl />
    </Map>
  );
  t.ok(renderer.root, 'Rendered <ScaleControl />');

  renderer.unmount();

  t.end();
});
