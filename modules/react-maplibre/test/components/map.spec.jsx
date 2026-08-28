/* global setTimeout, document */
import {expect, test} from 'vitest';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';
import {Map} from '@vis.gl/react-maplibre';
import Maplibre from '../../src/maplibre/maplibre';
import {waitForMapLoad, actUntil} from '../utils/test-utils';

function getCameraConstraints(map) {
  return {
    minZoom: map.getMinZoom(),
    maxZoom: map.getMaxZoom(),
    minPitch: map.getMinPitch(),
    maxPitch: map.getMaxPitch()
  };
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
    root.render(<Map ref={mapRef} longitude={-122} latitude={38} zoom={14} onLoad={onLoad} />)
  );

  expect(mapRef.current.getCenter().lng, 'longitude is updated').toBe(-122);
  expect(mapRef.current.getCenter().lat, 'latitude is updated').toBe(38);
  expect(mapRef.current.getZoom(), 'zoom is updated').toBe(14);

  expect(onloadCalled, 'onLoad is called').toBe(1);

  await act(() => root.unmount());
});

test('Map resets camera constraints to MapLibre defaults', async () => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  await act(() => root.render(<Map ref={mapRef} />));
  await waitForMapLoad(mapRef);

  const defaults = getCameraConstraints(mapRef.current);

  await act(() =>
    root.render(<Map ref={mapRef} minZoom={2} maxZoom={10} minPitch={5} maxPitch={40} />)
  );

  expect(getCameraConstraints(mapRef.current)).toEqual({
    minZoom: 2,
    maxZoom: 10,
    minPitch: 5,
    maxPitch: 40
  });

  await act(() =>
    root.render(<Map ref={mapRef} minZoom={null} maxZoom={null} minPitch={null} maxPitch={null} />)
  );

  expect(getCameraConstraints(mapRef.current)).toEqual(defaults);

  await act(() =>
    root.render(<Map ref={mapRef} minZoom={3} maxZoom={11} minPitch={6} maxPitch={41} />)
  );
  await act(() =>
    root.render(
      <Map
        ref={mapRef}
        minZoom={undefined}
        maxZoom={undefined}
        minPitch={undefined}
        maxPitch={undefined}
      />
    )
  );

  expect(getCameraConstraints(mapRef.current)).toEqual(defaults);

  await act(() =>
    root.render(<Map ref={mapRef} minZoom={4} maxZoom={12} minPitch={7} maxPitch={42} />)
  );
  await act(() => root.render(<Map ref={mapRef} />));

  expect(getCameraConstraints(mapRef.current)).toEqual(defaults);

  await act(() => root.unmount());

  for (const resetValue of [null, undefined]) {
    const initialRoot = createRoot(document.createElement('div'));
    const initialMapRef = {current: null};
    await act(() =>
      initialRoot.render(
        <Map
          ref={initialMapRef}
          minZoom={resetValue}
          maxZoom={resetValue}
          minPitch={resetValue}
          maxPitch={resetValue}
        />
      )
    );
    await waitForMapLoad(initialMapRef);
    expect(getCameraConstraints(initialMapRef.current)).toEqual(defaults);
    await act(() => initialRoot.unmount());
  }
});

test('Map resets camera constraints when reusing a map', async () => {
  const firstRoot = createRoot(document.createElement('div'));
  const firstMapRef = {current: null};

  await act(() => firstRoot.render(<Map ref={firstMapRef} reuseMaps />));
  await waitForMapLoad(firstMapRef);

  const defaults = getCameraConstraints(firstMapRef.current);

  await act(() =>
    firstRoot.render(
      <Map ref={firstMapRef} reuseMaps minZoom={2} maxZoom={10} minPitch={5} maxPitch={40} />
    )
  );
  await act(() => firstRoot.unmount());

  const secondRoot = createRoot(document.createElement('div'));
  const secondMapRef = {current: null};
  await act(() => secondRoot.render(<Map ref={secondMapRef} reuseMaps />));
  await waitForMapLoad(secondMapRef);

  expect(getCameraConstraints(secondMapRef.current)).toEqual(defaults);

  await act(() => secondRoot.unmount());
  while (Maplibre.savedMaps.length > 0) {
    Maplibre.savedMaps.pop().destroy();
  }
});

test('Map#uncontrolled', async () => {
  await actUntil(resolveTest => {
    const root = createRoot(document.createElement('div'));

    function onLoad(e) {
      e.target.easeTo({center: [-122, 38], zoom: 14, duration: 100});
    }
    let lastCenter;
    function onRender(e) {
      const center = e.target.getCenter();
      if (lastCenter) {
        expect(
          lastCenter.lng > center.lng && lastCenter.lat > center.lat,
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

    function onLoad(e) {
      e.target.easeTo({center: [-122, 38], zoom: 14, duration: 100});
    }
    function onRender(e) {
      const center = e.target.getCenter();
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

test('Map#controlled#mirror-back', async () => {
  await actUntil(resolveTest => {
    const root = createRoot(document.createElement('div'));

    function onLoad(e) {
      e.target.easeTo({center: [-122, 38], zoom: 14, duration: 100});
    }
    function onRender(vs, e) {
      const center = e.target.getCenter();
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

    function onLoad(e) {
      e.target.easeTo({center: [-122, 38], zoom: 14, duration: 100});
    }
    function onRender(vs, e) {
      const center = e.target.getCenter();
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
