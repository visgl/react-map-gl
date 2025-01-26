import {Map, MapProvider, useMap} from 'react-map-gl/mapbox-legacy';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import test from 'tape-promise/tape';
import {sleep, waitForMapLoad} from '../utils/test-utils';

test('useMap', async t => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  let maps = null;
  function TestControl() {
    maps = useMap();
    return null;
  }

  root.render(
    <MapProvider>
      <Map id="mapA" mapLib={import('mapbox-gl-v1')} />
      <Map id="mapB" ref={mapRef} mapLib={import('mapbox-gl-v1')} />
      <TestControl />
    </MapProvider>
  );

  await waitForMapLoad(mapRef);

  t.ok(maps.mapA, 'Context has mapA');
  t.ok(maps.mapB, 'Context has mapB');

  root.render(
    <MapProvider>
      <Map id="mapA" mapLib={import('mapbox-gl-v1')} />
      <TestControl />
    </MapProvider>
  );
  await sleep(50);
  t.ok(maps.mapA, 'Context has mapA');
  t.notOk(maps.mapB, 'mapB is removed');

  root.render(
    <MapProvider>
      <TestControl />
    </MapProvider>
  );
  await sleep(50);
  t.notOk(maps.mapA, 'mapA is removed');

  root.unmount();

  t.end();
});
