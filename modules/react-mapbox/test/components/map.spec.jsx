/* global setTimeout */
import {Map, Marker, useControl} from '@vis.gl/react-mapbox';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';
import {expect, test} from 'vitest';

import {sleep, waitForMapLoad, actUntil} from '../utils/test-utils';
import {MapboxAccessToken} from '../utils/token';
import Mapbox from '../../src/mapbox/mapbox';

function TestControl({onRemove}) {
  useControl(
    () => ({
      onAdd: () => document.createElement('div'),
      onRemove: () => {}
    }),
    onRemove
  );
  return null;
}

test('Map', async () => {
  expect(Map, 'Map is defined').toBeTruthy();

  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  let onloadCalled = 0;
  const onLoad = () => onloadCalled++;

  await act(() =>
    root.render(
      <Map
        ref={mapRef}
        mapLib={import('mapbox-gl-v3')}
        mapboxAccessToken={MapboxAccessToken}
        initialViewState={{longitude: -100, latitude: 40, zoom: 4}}
        onLoad={onLoad}
      />
    )
  );

  await waitForMapLoad(mapRef);

  expect(mapRef.current, 'Map is created').toBeTruthy();
  expect(mapRef.current.getCenter().lng, 'longitude is set').toBe(-100);
  expect(mapRef.current.getCenter().lat, 'latitude is set').toBe(40);
  expect(mapRef.current.getZoom(), 'zoom is set').toBe(4);

  await act(() =>
    root.render(
      <Map
        ref={mapRef}
        mapLib={import('mapbox-gl-v3')}
        longitude={-122}
        latitude={38}
        zoom={14}
        onLoad={onLoad}
      />
    )
  );

  expect(mapRef.current.getCenter().lng, 'longitude is updated').toBe(-122);
  expect(mapRef.current.getCenter().lat, 'latitude is updated').toBe(38);
  expect(mapRef.current.getZoom(), 'zoom is updated').toBe(14);

  expect(onloadCalled, 'onLoad is called').toBe(1);

  await act(() => root.unmount());
});

test('Map recreates its instance when an Activity becomes visible again', async () => {
  const rootContainer = document.createElement('div');
  const root = createRoot(rootContainer);
  const mapRef = {current: null};

  const render = mode =>
    act(() =>
      root.render(
        <React.Activity mode={mode}>
          <Map
            ref={mapRef}
            mapLib={import('mapbox-gl-v3')}
            mapboxAccessToken={MapboxAccessToken}
            initialViewState={{longitude: -100, latitude: 40, zoom: 4}}
          >
            <Marker longitude={-100} latitude={40} />
            <TestControl
              onRemove={({map}) => expect(map, 'Map is available during cleanup').toBeTruthy()}
            />
          </Map>
        </React.Activity>
      )
    );

  await render('visible');
  await waitForMapLoad(mapRef);
  const firstMap = mapRef.current.getMap();

  await render('hidden');
  await render('visible');
  await waitForMapLoad(mapRef);

  expect(mapRef.current.getMap(), 'Map instance is recreated').not.toBe(firstMap);
  expect(rootContainer.querySelector('.mapboxgl-marker'), 'Marker is reattached').toBeTruthy();

  await act(() => root.unmount());
  while (Mapbox.savedMaps.length > 0) {
    Mapbox.savedMaps.pop().destroy();
  }
});

test('Map reconnects its children when an Activity reuses a map', async () => {
  const rootContainer = document.createElement('div');
  const root = createRoot(rootContainer);
  const mapRef = {current: null};

  const render = mode =>
    act(() =>
      root.render(
        <React.Activity mode={mode}>
          <Map
            ref={mapRef}
            mapLib={import('mapbox-gl-v3')}
            mapboxAccessToken={MapboxAccessToken}
            initialViewState={{longitude: -100, latitude: 40, zoom: 4}}
            reuseMaps
          >
            <Marker longitude={-100} latitude={40} />
          </Map>
        </React.Activity>
      )
    );

  await render('visible');
  await waitForMapLoad(mapRef);
  const firstMap = mapRef.current.getMap();

  await render('hidden');
  await render('visible');
  await waitForMapLoad(mapRef);

  expect(mapRef.current.getMap(), 'Map instance is reused').toBe(firstMap);
  expect(rootContainer.querySelector('.mapboxgl-marker'), 'Marker is reattached').toBeTruthy();

  await act(() => root.unmount());
});

test('Map#invalid token', async () => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  let errorMessage = null;
  const onError = ({error}) => {
    errorMessage = error.message;
  };

  await act(() =>
    root.render(
      <Map
        ref={mapRef}
        mapLib={import('mapbox-gl-v3')}
        initialViewState={{longitude: -100, latitude: 40, zoom: 4}}
        onError={onError}
      />
    )
  );

  await waitForMapLoad(mapRef);

  expect(errorMessage?.includes('access token'), 'Throws on missing access token').toBeTruthy();

  await act(() => root.unmount());
});

test('Map#uncontrolled', async () => {
  await actUntil(resolveTest => {
    const root = createRoot(document.createElement('div'));
    const mapRef = {current: null};

    function onLoad() {
      mapRef.current.easeTo({center: [-122, 38], zoom: 14, duration: 100});
    }
    let lastCenter;
    function onRender() {
      if (!mapRef.current) return;
      const center = mapRef.current.getCenter();
      if (lastCenter) {
        expect(
          lastCenter.lng >= center.lng && lastCenter.lat >= center.lat,
          `animated to ${center}`
        ).toBeTruthy();
      }
      lastCenter = center;
    }
    function onMoveEnd() {
      root.unmount();
      resolveTest();
    }

    root.render(
      <Map
        ref={mapRef}
        mapLib={import('mapbox-gl-v3')}
        mapboxAccessToken={MapboxAccessToken}
        initialViewState={{longitude: -100, latitude: 40, zoom: 4}}
        onLoad={onLoad}
        onRender={onRender}
        onMoveEnd={onMoveEnd}
      />
    );
  });
});

test('Map#controlled#no-update', async () => {
  await actUntil(resolveTest => {
    const root = createRoot(document.createElement('div'));
    const mapRef = {current: null};

    function onLoad() {
      mapRef.current.easeTo({center: [-122, 38], zoom: 14, duration: 100});
    }
    function onRender() {
      if (!mapRef.current) return;
      const center = mapRef.current.getCenter();
      expect(
        center.lng === -100 && center.lat === 40,
        `map center should match props: ${center}`
      ).toBeTruthy();
    }
    function onMoveEnd() {
      root.unmount();
      resolveTest();
    }

    root.render(
      <Map
        ref={mapRef}
        mapLib={import('mapbox-gl-v3')}
        mapboxAccessToken={MapboxAccessToken}
        longitude={-100}
        latitude={40}
        zoom={4}
        onLoad={onLoad}
        onMoveEnd={onMoveEnd}
        onRender={onRender}
      />
    );
  });
});

test('Map#uncontrolled#delayedSettingsUpdate', async () => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};
  let resolveSettingsUpdated;
  const settingsUpdated = new Promise(resolve => {
    resolveSettingsUpdated = resolve;
  });

  function App() {
    const [settings, setSettings] = React.useState({
      maxPitch: 85
    });

    async function onLoad() {
      await sleep(1);
      setSettings({maxPitch: 60});
      resolveSettingsUpdated();
    }

    return (
      <Map
        ref={mapRef}
        mapLib={import('mapbox-gl-v3')}
        mapboxAccessToken={MapboxAccessToken}
        initialViewState={{longitude: -100, latitude: 40, zoom: 4}}
        {...settings}
        onLoad={onLoad}
      />
    );
  }

  await act(() => root.render(<App />));

  await waitForMapLoad(mapRef);
  await actUntil(resolveTest => settingsUpdated.then(resolveTest));

  expect(mapRef.current.getMaxPitch(), 'maxPitch is updated').toBe(60);

  await act(() => root.unmount());
});

test('Map#controlled#mirror-back', async () => {
  await actUntil(resolveTest => {
    const root = createRoot(document.createElement('div'));
    const mapRef = {current: null};

    function onLoad() {
      mapRef.current.easeTo({center: [-122, 38], zoom: 14, duration: 100});
    }
    function onRender(vs) {
      if (!mapRef.current) return;
      const center = mapRef.current.getCenter();
      expect(
        vs.longitude === center.lng && vs.latitude === center.lat,
        `map center should match state: ${center}`
      ).toBeTruthy();
    }
    function onMoveEnd() {
      root.unmount();
      resolveTest();
    }

    function App() {
      const [viewState, setViewState] = React.useState({
        longitude: -100,
        latitude: 40,
        zoom: 4
      });

      return (
        <Map
          ref={mapRef}
          mapLib={import('mapbox-gl-v3')}
          mapboxAccessToken={MapboxAccessToken}
          {...viewState}
          onLoad={onLoad}
          onMove={e => setViewState(e.viewState)}
          onRender={onRender.bind(null, viewState)}
          onMoveEnd={onMoveEnd}
        />
      );
    }

    root.render(<App />);
  });
});

test('Map#controlled#delayed-update', async () => {
  await actUntil(resolveTest => {
    const root = createRoot(document.createElement('div'));
    const mapRef = {current: null};

    function onLoad() {
      mapRef.current.easeTo({center: [-122, 38], zoom: 14, duration: 100});
    }
    function onRender(vs) {
      if (!mapRef.current) return;
      const center = mapRef.current.getCenter();
      expect(
        vs.longitude === center.lng && vs.latitude === center.lat,
        `map center should match state: ${center}`
      ).toBeTruthy();
    }
    function onMoveEnd() {
      root.unmount();
      resolveTest();
    }

    function App() {
      const [viewState, setViewState] = React.useState({
        longitude: -100,
        latitude: 40,
        zoom: 4
      });

      return (
        <Map
          ref={mapRef}
          mapLib={import('mapbox-gl-v3')}
          mapboxAccessToken={MapboxAccessToken}
          {...viewState}
          onLoad={onLoad}
          onMove={e => setTimeout(() => setViewState(e.viewState))}
          onRender={onRender.bind(null, viewState)}
          onMoveEnd={onMoveEnd}
        />
      );
    }

    root.render(<App />);
  });
});
