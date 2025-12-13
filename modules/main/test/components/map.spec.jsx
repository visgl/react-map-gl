/* global setTimeout */
import {Map} from 'react-map-gl/mapbox-legacy';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import test from 'tape-promise/tape';

import {sleep, waitForMapLoad} from '../utils/test-utils';

test('Map', async t => {
  t.ok(Map, 'Map is defined');

  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  let onloadCalled = 0;
  const onLoad = () => onloadCalled++;

  root.render(
    <Map
      ref={mapRef}
      mapLib={import('mapbox-gl-v1')}
      initialViewState={{longitude: -100, latitude: 40, zoom: 4}}
      onLoad={onLoad}
    />
  );

  await waitForMapLoad(mapRef);

  t.ok(mapRef.current, 'Map is created');
  t.is(mapRef.current.getCenter().lng, -100, 'longitude is set');
  t.is(mapRef.current.getCenter().lat, 40, 'latitude is set');
  t.is(mapRef.current.getZoom(), 4, 'zoom is set');

  root.render(
    <Map
      ref={mapRef}
      mapLib={import('mapbox-gl-v1')}
      longitude={-122}
      latitude={38}
      zoom={14}
      onLoad={onLoad}
    />
  );
  await sleep(1);

  t.is(mapRef.current.getCenter().lng, -122, 'longitude is updated');
  t.is(mapRef.current.getCenter().lat, 38, 'latitude is updated');
  t.is(mapRef.current.getZoom(), 14, 'zoom is updated');

  t.is(onloadCalled, 1, 'onLoad is called');

  root.unmount();

  t.end();
});

test('Map#uncontrolled', t => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  function onLoad() {
    mapRef.current.easeTo({center: [-122, 38], zoom: 14, duration: 100});
  }
  let lastCenter;
  function onRender() {
    const center = mapRef.current.getCenter();
    if (lastCenter) {
      t.ok(lastCenter.lng > center.lng && lastCenter.lat > center.lat, `animated to ${center}`);
    }
    lastCenter = center;
  }
  function onMoveEnd() {
    root.unmount();
    t.end();
  }

  root.render(
    <Map
      ref={mapRef}
      mapLib={import('mapbox-gl-v1')}
      initialViewState={{longitude: -100, latitude: 40, zoom: 4}}
      onLoad={onLoad}
      onRender={onRender}
      onMoveEnd={onMoveEnd}
    />
  );
});

test('Map#controlled#no-update', t => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  function onLoad() {
    mapRef.current.easeTo({center: [-122, 38], zoom: 14, duration: 100});
  }
  function onRender() {
    const center = mapRef.current.getCenter();
    t.ok(center.lng === -100 && center.lat === 40, `map center should match props: ${center}`);
  }
  function onMoveEnd() {
    root.unmount();
    t.end();
  }

  root.render(
    <Map
      ref={mapRef}
      mapLib={import('mapbox-gl-v1')}
      longitude={-100}
      latitude={40}
      zoom={4}
      onLoad={onLoad}
      onMoveEnd={onMoveEnd}
      onRender={onRender}
    />
  );
});

test('Map#controlled#mirror-back', t => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  function onLoad() {
    mapRef.current.easeTo({center: [-122, 38], zoom: 14, duration: 100});
  }
  function onRender(vs) {
    const center = mapRef.current.getCenter();
    t.ok(
      vs.longitude === center.lng && vs.latitude === center.lat,
      `map center should match state: ${center}`
    );
  }
  function onMoveEnd() {
    root.unmount();
    t.end();
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
        mapLib={import('mapbox-gl-v1')}
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

test('Map#controlled#delayed-update', t => {
  const root = createRoot(document.createElement('div'));
  const mapRef = {current: null};

  function onLoad() {
    mapRef.current.easeTo({center: [-122, 38], zoom: 14, duration: 100});
  }
  function onRender(vs) {
    const center = mapRef.current.getCenter();
    t.ok(
      vs.longitude === center.lng && vs.latitude === center.lat,
      `map center should match state: ${center}`
    );
  }
  function onMoveEnd() {
    root.unmount();
    t.end();
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
        mapLib={import('mapbox-gl-v1')}
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
