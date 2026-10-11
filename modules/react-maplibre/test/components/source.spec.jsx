/* global document */
import {expect, test} from 'vitest';
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

test('Source/geojson cluster options', async () => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  const mapStyle = {version: 8, sources: {}, layers: []};
  const geoJSON = {
    type: 'FeatureCollection',
    features: [{type: 'Feature', geometry: {type: 'Point', coordinates: [0, 0]}, properties: {}}]
  };

  await act(() =>
    root.render(
      <Map ref={mapRef} mapStyle={mapStyle}>
        <Source id="my-data" type="geojson" data={geoJSON} cluster={false} />
      </Map>
    )
  );
  await waitForMapLoad(mapRef);

  const source = mapRef.current.getSource('my-data');
  expect(source, 'Source is added').toBeTruthy();

  const setClusterOptionsCalls = [];
  const setDataCalls = [];
  const setClusterOptions = source.setClusterOptions.bind(source);
  const setData = source.setData.bind(source);
  source.setClusterOptions = options => {
    setClusterOptionsCalls.push(options);
    return setClusterOptions(options);
  };
  source.setData = data => {
    setDataCalls.push(data);
    return setData(data);
  };

  await act(() =>
    root.render(
      <Map ref={mapRef} mapStyle={mapStyle}>
        <Source id="my-data" type="geojson" data={geoJSON} cluster clusterRadius={30} />
      </Map>
    )
  );
  expect(setClusterOptionsCalls, 'Cluster options are updated').toEqual([
    {cluster: true, clusterMaxZoom: 17, clusterRadius: 30}
  ]);
  expect(setDataCalls, 'Data is not reset when only cluster options change').toEqual([]);

  const geoJSON2 = {
    type: 'FeatureCollection',
    features: [{type: 'Feature', geometry: {type: 'Point', coordinates: [1, 1]}, properties: {}}]
  };
  await act(() =>
    root.render(
      <Map ref={mapRef} mapStyle={mapStyle}>
        <Source id="my-data" type="geojson" data={geoJSON2} cluster clusterRadius={30} />
      </Map>
    )
  );
  expect(setClusterOptionsCalls.length, 'Cluster options are not updated again').toBe(1);
  expect(setDataCalls, 'Data is updated').toEqual([geoJSON2]);

  await act(() => root.unmount());
});

async function renderClusterSource(initialProps) {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  const mapStyle = {version: 8, sources: {}, layers: []};
  const geoJSON = {
    type: 'FeatureCollection',
    features: [{type: 'Feature', geometry: {type: 'Point', coordinates: [0, 0]}, properties: {}}]
  };
  const render = props =>
    act(() =>
      root.render(
        <Map ref={mapRef} mapStyle={mapStyle}>
          <Source id="my-data" type="geojson" data={geoJSON} {...props} />
        </Map>
      )
    );

  await render(initialProps);
  await waitForMapLoad(mapRef);

  const source = mapRef.current.getSource('my-data');
  expect(source, 'Source is added').toBeTruthy();

  const setClusterOptionsCalls = [];
  const setDataCalls = [];
  const setClusterOptions = source.setClusterOptions.bind(source);
  const setData = source.setData.bind(source);
  source.setClusterOptions = options => {
    setClusterOptionsCalls.push(options);
    return setClusterOptions(options);
  };
  source.setData = data => {
    setDataCalls.push(data);
    return setData(data);
  };

  return {root, render, setClusterOptionsCalls, setDataCalls};
}

test('Source/geojson removing cluster turns clustering off', async () => {
  const {root, render, setClusterOptionsCalls, setDataCalls} = await renderClusterSource({
    cluster: true
  });

  await render({});
  expect(setClusterOptionsCalls.length, 'Cluster options are updated').toBe(1);
  expect(setClusterOptionsCalls[0].cluster, 'Clustering is turned off').toBe(false);
  expect(setDataCalls, 'Data is not reset').toEqual([]);

  await act(() => root.unmount());
});

test('Source/geojson removing a cluster option resets it', async () => {
  const {root, render, setClusterOptionsCalls} = await renderClusterSource({
    cluster: true,
    clusterRadius: 30
  });

  await render({cluster: true});
  expect(setClusterOptionsCalls, 'Cluster radius is reset to the default').toEqual([
    {cluster: true, clusterMaxZoom: 17, clusterRadius: 50}
  ]);

  await act(() => root.unmount());
});

test('Source/geojson removing an unrelated prop does not update cluster options', async () => {
  const {root, render, setClusterOptionsCalls, setDataCalls} = await renderClusterSource({
    cluster: true,
    attribution: 'test'
  });

  await render({cluster: true});
  expect(setClusterOptionsCalls, 'Cluster options are not updated').toEqual([]);
  expect(setDataCalls, 'Data is not reset').toEqual([]);

  await act(() => root.unmount());
});
