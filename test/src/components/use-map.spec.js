import {Map, MapProvider, useMap} from 'react-map-gl';
import * as React from 'react';
import {create, act} from 'react-test-renderer';
import test from 'tape-promise/tape';

test('useMap', t => {
  let app;
  let maps;

  function TestControl() {
    maps = useMap();
    return null;
  }

  act(() => {
    app = create(
      <MapProvider>
        <Map id="mapA" />
        <Map id="mapB" />
        <TestControl />
      </MapProvider>
    );
  });

  t.ok(maps.mapA, 'Context has mapA');
  t.ok(maps.mapB, 'Context has mapB');

  act(() => {
    app = create(
      <MapProvider>
        <Map id="mapA" />
        <TestControl />
      </MapProvider>
    );
  });

  t.ok(maps.mapA, 'Context has mapA');
  t.notOk(maps.mapB, 'mapB is removed');

  act(() => {
    app = create(
      <MapProvider>
        <TestControl />
      </MapProvider>
    );
  });

  t.notOk(maps.mapA, 'mapA is removed');

  app.unmount();

  t.end();
});
