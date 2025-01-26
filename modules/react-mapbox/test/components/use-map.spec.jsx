import {Map, MapProvider, useMap} from '@vis.gl/react-mapbox';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import test from 'tape-promise/tape';
import {sleep, waitForMapLoad} from '../utils/test-utils';
import {MapboxAccessToken} from '../utils/token';

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

  t.ok(maps.mapA, 'Context has mapA');
  t.ok(maps.mapB, 'Context has mapB');

  root.render(
    <MapProvider>
      <Map id="mapA" mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken} />
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
