import {Map, Source, Layer} from '@vis.gl/react-mapbox';
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

  await act(() =>
    root.render(
      <Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken}>
        <Source id="my-data" type="geojson" data={geoJSON}>
          <Layer id="my-layer" {...pointLayer} />
        </Source>
      </Map>
    )
  );
  await waitForMapLoad(mapRef);
  expect(mapRef.current.getLayer('my-layer'), 'Layer is added').toBeTruthy();

  await act(() =>
    root.render(
      <Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken}>
        <Source id="my-data" type="geojson" data={geoJSON}>
          <Layer id="my-layer" {...pointLayer2} />
        </Source>
      </Map>
    )
  );
  expect(mapRef.current.getLayer('my-layer').layout.visibility, 'Layer is updated').toBe('none');

  const styleLoaded = waitForMapStyleLoad(mapRef);
  await act(() =>
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
    )
  );
  await actUntil(resolveTest => styleLoaded.then(resolveTest));
  expect(mapRef.current.getLayer('my-layer'), 'Layer is added after style change').toBeTruthy();

  await act(() =>
    root.render(<Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapStyle={mapStyle} />)
  );
  expect(mapRef.current.getSource('my-data'), 'Source is removed').toBeFalsy();
  expect(mapRef.current.getLayer('my-layer'), 'Layer is removed').toBeFalsy();

  await act(() => root.unmount());
});

test('Source/Layer do not re-render on unrelated style changes', async () => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};
  let renderCount = 0;
  const onRender = () => renderCount++;

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

  await act(() =>
    root.render(
      <Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken}>
        <React.Profiler id="layers" onRender={onRender}>
          <Source id="my-data" type="geojson" data={geoJSON}>
            <Layer id="my-layer" {...pointLayer} />
          </Source>
        </React.Profiler>
      </Map>
    )
  );
  await waitForMapLoad(mapRef);
  const map = mapRef.current.getMap();

  renderCount = 0;
  map.addImage('my-image', {width: 1, height: 1, data: new Uint8Array(4)});
  map.setPaintProperty('my-layer', 'circle-color', '#ff0000');
  await actUntil(resolveTest => map.once('idle', () => setTimeout(resolveTest, 0)));
  expect(renderCount, 'Source and Layer are not rendered again').toBe(0);

  map.removeLayer('my-layer');
  await actUntil(resolveTest => {
    const onStyleData = () => {
      if (map.getLayer('my-layer')) {
        map.off('styledata', onStyleData);
        resolveTest();
      }
    };
    map.on('styledata', onStyleData);
  });
  expect(map.getLayer('my-layer'), 'Missing layer is added again').toBeTruthy();

  await act(() => root.unmount());
});

test('Source renders its children when the style already has its source', async () => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  const geoJSON = {
    type: 'Point',
    coordinates: [0, 0]
  };
  const mapStyle = {
    version: 8,
    sources: {'my-data': {type: 'geojson', data: geoJSON}},
    layers: []
  };
  const pointLayer = {
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  };

  await act(() =>
    root.render(
      <Map
        ref={mapRef}
        mapLib={import('mapbox-gl-v3')}
        mapboxAccessToken={MapboxAccessToken}
        mapStyle={mapStyle}
      >
        <Source id="my-data" type="geojson" data={geoJSON}>
          <Layer id="my-layer" {...pointLayer} />
        </Source>
      </Map>
    )
  );
  await waitForMapLoad(mapRef);
  await actUntil(resolveTest => setTimeout(resolveTest, 0));
  expect(mapRef.current.getLayer('my-layer'), 'Layer is added').toBeTruthy();

  await act(() => root.unmount());
});
