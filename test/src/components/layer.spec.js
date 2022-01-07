import {Map, Source, Layer} from 'react-map-gl';
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
  const pointLayer = {
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  };
  const pointLayer2 = {
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#000000'
    },
    layout: {
      visibility: 'none'
    }
  };

  let map;
  act(() => {
    map = create(
      <Map ref={mapRef}>
        <Source id="my-data" type="geojson" data={geoJSON}>
          <Layer id="my-layer" {...pointLayer} />
        </Source>
      </Map>
    );
  });
  await sleep(5);
  t.ok(mapRef.current.getLayer('my-layer'), 'Layer is added');

  act(() =>
    map.update(
      <Map ref={mapRef}>
        <Source id="my-data" type="geojson" data={geoJSON}>
          <Layer id="my-layer" {...pointLayer2} />
        </Source>
      </Map>
    )
  );
  t.is(mapRef.current.getLayer('my-layer').paint['circle-color'], '#000000', 'Layer is updated');
  t.is(mapRef.current.getLayer('my-layer').layout.visibility, 'none', 'Layer is updated');

  act(() =>
    map.update(
      <Map ref={mapRef} mapStyle={mapStyle}>
        <Source id="my-data" type="geojson" data={geoJSON}>
          <Layer id="my-layer" {...pointLayer2} />
        </Source>
      </Map>
    )
  );
  await sleep(5);
  t.ok(mapRef.current.getLayer('my-layer'), 'Layer is added after style change');

  act(() => map.update(<Map ref={mapRef} mapStyle={mapStyle} />));
  await sleep(5);
  t.notOk(mapRef.current.getSource('my-data'), 'Source is removed');
  t.notOk(mapRef.current.getLayer('my-layer'), 'Layer is removed');

  map.unmount();

  t.end();
});
