import {Map, Source, Layer} from 'react-map-gl/mapbox-legacy';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import test from 'tape-promise/tape';

import {sleep, waitForMapLoad} from '../utils/test-utils';

test('Source/Layer', async t => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  const mapStyle = {version: 8, sources: {}, layers: []};
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

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
      <Source id="my-data" type="geojson" data={geoJSON}>
        <Layer id="my-layer" {...pointLayer} />
      </Source>
    </Map>
  );
  await waitForMapLoad(mapRef);
  await sleep(1);
  const layer = mapRef.current.getLayer('my-layer');
  t.ok(layer, 'Layer is added');

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
      <Source id="my-data" type="geojson" data={geoJSON}>
        <Layer id="my-layer" {...pointLayer2} />
      </Source>
    </Map>
  );
  await sleep(1);
  t.is(layer.visibility, 'none', 'Layer is updated');

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v1')} mapStyle={mapStyle}>
      <Source id="my-data" type="geojson" data={geoJSON}>
        <Layer id="my-layer" {...pointLayer2} />
      </Source>
    </Map>
  );
  await sleep(50);
  t.ok(mapRef.current.getLayer('my-layer'), 'Layer is added after style change');

  root.render(<Map ref={mapRef} mapLib={import('mapbox-gl-v1')} mapStyle={mapStyle} />);
  await sleep(1);
  t.notOk(mapRef.current.getSource('my-data'), 'Source is removed');
  t.notOk(mapRef.current.getLayer('my-layer'), 'Layer is removed');

  root.unmount();

  t.end();
});
