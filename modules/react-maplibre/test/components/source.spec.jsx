/* global document */
import test from 'tape-promise/tape';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {Map, Source} from '@vis.gl/react-maplibre';
import {sleep, waitForMapLoad} from '../utils/test-utils';

test('Source/Layer', async t => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  const mapStyle = {version: 8, sources: {}, layers: []};
  const geoJSON = {
    type: 'Point',
    coordinates: [0, 0]
  };
  const geoJSON2 = {
    type: 'Point',
    coordinates: [1, 1]
  };

  root.render(
    <Map ref={mapRef}>
      <Source id="my-data" type="geojson" data={geoJSON} />
    </Map>
  );
  await waitForMapLoad(mapRef);
  await sleep(1);
  t.ok(mapRef.current.getSource('my-data'), 'Source is added');

  root.render(
    <Map ref={mapRef} mapStyle={mapStyle}>
      <Source id="my-data" type="geojson" data={geoJSON} />
    </Map>
  );
  await sleep(50);
  t.ok(mapRef.current.getSource('my-data'), 'Source is added after style change');

  root.render(
    <Map ref={mapRef} mapStyle={mapStyle}>
      <Source id="my-data" type="geojson" data={geoJSON2} />
    </Map>
  );
  await sleep(1);
  const sourceData = await mapRef.current.getSource('my-data')?.getData();
  t.deepEqual(sourceData, geoJSON2, 'Source is updated');

  root.render(<Map ref={mapRef} mapStyle={mapStyle} />);
  await sleep(1);
  t.notOk(mapRef.current.getSource('my-data'), 'Source is removed');

  root.unmount();

  t.end();
});
