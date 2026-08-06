import {Map, Source} from '@vis.gl/react-mapbox';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';
import {expect, test} from 'vitest';
import {waitForMapLoad, waitForMapStyleLoad, actUntil} from '../utils/test-utils';
import {MapboxAccessToken} from '../utils/token';

test('Source/Layer', async () => {
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

  await act(() =>
    root.render(
      <Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken}>
        <Source id="my-data" type="geojson" data={geoJSON} />
      </Map>
    )
  );
  await waitForMapLoad(mapRef);
  expect(mapRef.current.getSource('my-data'), 'Source is added').toBeTruthy();

  const styleLoaded = waitForMapStyleLoad(mapRef);
  await act(() =>
    root.render(
      <Map
        ref={mapRef}
        mapLib={import('mapbox-gl-v3')}
        mapStyle={mapStyle}
        mapboxAccessToken={MapboxAccessToken}
      >
        <Source id="my-data" type="geojson" data={geoJSON} />
      </Map>
    )
  );
  await actUntil(resolveTest => styleLoaded.then(resolveTest));
  expect(mapRef.current.getSource('my-data'), 'Source is added after style change').toBeTruthy();

  await act(() =>
    root.render(
      <Map
        ref={mapRef}
        mapLib={import('mapbox-gl-v3')}
        mapStyle={mapStyle}
        mapboxAccessToken={MapboxAccessToken}
      >
        <Source id="my-data" type="geojson" data={geoJSON2} />
      </Map>
    )
  );
  const sourceData = await mapRef.current.getSource('my-data')?._data;
  expect(sourceData, 'Source is updated').toEqual(geoJSON2);

  await act(() =>
    root.render(
      <Map
        ref={mapRef}
        mapLib={import('mapbox-gl-v3')}
        mapStyle={mapStyle}
        mapboxAccessToken={MapboxAccessToken}
      />
    )
  );
  expect(mapRef.current.getSource('my-data'), 'Source is removed').toBeFalsy();

  await act(() => root.unmount());
});
