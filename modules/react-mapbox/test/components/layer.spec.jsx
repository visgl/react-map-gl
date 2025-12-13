import {Map, Source, Layer} from '@vis.gl/react-mapbox';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import test from 'tape-promise/tape';

import {sleep, waitForMapLoad} from '../utils/test-utils';
import {MapboxAccessToken} from '../utils/token';

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
    <Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken}>
      <Source id="my-data" type="geojson" data={geoJSON}>
        <Layer id="my-layer" {...pointLayer} />
      </Source>
    </Map>
  );
  await waitForMapLoad(mapRef);
  await sleep(1);
  t.ok(mapRef.current.getLayer('my-layer'), 'Layer is added');

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken}>
      <Source id="my-data" type="geojson" data={geoJSON}>
        <Layer id="my-layer" {...pointLayer2} />
      </Source>
    </Map>
  );
  await sleep(1);
  t.is(mapRef.current.getLayer('my-layer').layout.visibility, 'none', 'Layer is updated');

  root.render(
    <Map
      ref={mapRef}
      mapLib={import('mapbox-gl-v3')}
      mapStyle={mapStyle}
      mapboxAccessToken={MapboxAccessToken}
    >
      <Source id="my-data" type="geojson" data={geoJSON}>
        <Layer id="my-layer" {...pointLayer2} />
      </Source>
    </Map>
  );
  await sleep(50);
  t.ok(mapRef.current.getLayer('my-layer'), 'Layer is added after style change');

  root.render(<Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapStyle={mapStyle} />);
  await sleep(1);
  t.notOk(mapRef.current.getSource('my-data'), 'Source is removed');
  t.notOk(mapRef.current.getLayer('my-layer'), 'Layer is removed');

  root.unmount();

  t.end();
});
