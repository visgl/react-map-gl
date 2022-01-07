import {Map, Source} from 'react-map-gl';
import * as React from 'react';
import {create, act} from 'react-test-renderer';
import test from 'tape-promise/tape';

import {sleep} from '../utils/test-utils';

test('Source/Layer', async t => {
  const mapRef = {current: null};

  const mapStyle = {};
  const geoJSON = {
    type: 'Point',
    coordinates: [0, 0]
  };
  const geoJSON2 = {
    type: 'Point',
    coordinates: [1, 1]
  };

  let map;
  act(() => {
    map = create(
      <Map ref={mapRef}>
        <Source id="my-data" type="geojson" data={geoJSON} />
      </Map>
    );
  });
  await sleep(5);
  t.ok(mapRef.current.getSource('my-data'), 'Source is added');

  act(() =>
    map.update(
      <Map ref={mapRef} mapStyle={mapStyle}>
        <Source id="my-data" type="geojson" data={geoJSON2} />
      </Map>
    )
  );
  await sleep(5);
  t.ok(mapRef.current.getSource('my-data'), 'Source is added after style change');

  act(() =>
    map.update(
      <Map ref={mapRef} mapStyle={mapStyle}>
        <Source id="my-data" type="geojson" data={geoJSON2} />
      </Map>
    )
  );
  t.is(mapRef.current.getSource('my-data').getData(), geoJSON2, 'Source is updated');

  act(() => map.update(<Map ref={mapRef} mapStyle={mapStyle} />));
  await sleep(5);
  t.notOk(mapRef.current.getSource('my-data'), 'Source is removed');

  map.unmount();

  t.end();
});
