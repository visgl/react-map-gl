/* global document */
import {expect, test, vi} from 'vitest';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';
import {Map, Source} from '@vis.gl/react-maplibre';
import {waitForMapLoad, waitForMapStyleLoad, actUntil} from '../utils/test-utils';

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
      <Map ref={mapRef}>
        <Source id="my-data" type="geojson" data={geoJSON} />
      </Map>
    )
  );
  await waitForMapLoad(mapRef);
  expect(mapRef.current.getSource('my-data'), 'Source is added').toBeTruthy();

  const styleLoaded = waitForMapStyleLoad(mapRef);
  await act(() =>
    root.render(
      <Map ref={mapRef} mapStyle={mapStyle}>
        <Source id="my-data" type="geojson" data={geoJSON} />
      </Map>
    )
  );
  await actUntil(resolveTest => styleLoaded.then(resolveTest));
  expect(mapRef.current.getSource('my-data'), 'Source is added after style change').toBeTruthy();

  await act(() =>
    root.render(
      <Map ref={mapRef} mapStyle={mapStyle}>
        <Source id="my-data" type="geojson" data={geoJSON2} />
      </Map>
    )
  );
  const sourceData = await mapRef.current.getSource('my-data')?.getData();
  expect(sourceData, 'Source is updated').toEqual(geoJSON2);

  await act(() => root.render(<Map ref={mapRef} mapStyle={mapStyle} />));
  expect(mapRef.current.getSource('my-data'), 'Source is removed').toBeFalsy();

  await act(() => root.unmount());
});

test('Source/geojson keeps data set imperatively when another prop changes', async () => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  const mapStyle = {version: 8, sources: {}, layers: []};
  const emptyData = {type: 'FeatureCollection', features: []};
  const pushedData = {
    type: 'FeatureCollection',
    features: [{type: 'Feature', geometry: {type: 'Point', coordinates: [0, 0]}, properties: {}}]
  };

  await act(() =>
    root.render(
      <Map ref={mapRef} mapStyle={mapStyle}>
        <Source id="my-data" type="geojson" data={emptyData} tolerance={0.375} />
      </Map>
    )
  );
  await waitForMapLoad(mapRef);
  const source = mapRef.current.getSource('my-data');
  expect(source, 'Source is added').toBeTruthy();
  source.setData(pushedData);

  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  await act(() =>
    root.render(
      <Map ref={mapRef} mapStyle={mapStyle}>
        <Source id="my-data" type="geojson" data={emptyData} tolerance={1} />
      </Map>
    )
  );
  expect(await source.getData(), 'Data set with setData is kept').toEqual(pushedData);
  expect(warn, 'Option that cannot be applied is reported').toHaveBeenCalledWith(
    'Unable to update <Source> prop: tolerance'
  );
  warn.mockRestore();

  await act(() => root.unmount());
});
