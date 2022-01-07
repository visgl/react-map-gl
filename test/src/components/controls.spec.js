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

test('Controls', t => {
  const renderer = ReactTestRenderer.create(<Map />);
  renderer.update(
    <Map>
      <AttributionControl />
    </Map>
  );
  t.ok(renderer.root, 'Rendered <AttributionControl />');
  renderer.update(
    <Map>
      <FullscreenControl />
    </Map>
  );
  t.ok(renderer.root, 'Rendered <FullscreenControl />');
  renderer.update(
    <Map>
      <GeolocateControl />
    </Map>
  );
  t.ok(renderer.root, 'Rendered <GeolocateControl />');
  renderer.update(
    <Map>
      <NavigationControl />
    </Map>
  );
  t.ok(renderer.root, 'Rendered <NavigationControl />');
  renderer.update(
    <Map>
      <ScaleControl />
    </Map>
  );
  t.ok(renderer.root, 'Rendered <ScaleControl />');

  renderer.unmount();

  t.end();
});
