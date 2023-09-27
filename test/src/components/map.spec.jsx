/* global setTimeout */
import {Map} from 'react-map-gl';
import * as React from 'react';
import {create, act} from 'react-test-renderer';
import test from 'tape-promise/tape';

import {sleep, waitForMapLoad} from '../utils/test-utils';
import mapboxMock from '../utils/mapbox-gl-mock';

test('Map', async t => {
  t.ok(Map, 'Map is defined');
  const mapRef = {current: null};

  let onloadCalled = 0;
  const onLoad = () => onloadCalled++;

  let map;
  act(() => {
    map = create(
      <Map
        ref={mapRef}
        mapLib={mapboxMock}
        initialViewState={{longitude: -100, latitude: 40, zoom: 4}}
        onLoad={onLoad}
      />
    );
  });

  await waitForMapLoad(mapRef);

  t.ok(map.root, 'Rendered <Map />');
  t.is(mapRef.current.getCenter().lng, -100, 'longitude is set');
  t.is(mapRef.current.getCenter().lat, 40, 'latitude is set');
  t.is(mapRef.current.getZoom(), 4, 'zoom is set');

  act(() => {
    map.update(
      <Map
        ref={mapRef}
        mapLib={mapboxMock}
        longitude={-122}
        latitude={38}
        zoom={14}
        onLoad={onLoad}
      />
    );
  });

  t.is(mapRef.current.getCenter().lng, -122, 'longitude is updated');
  t.is(mapRef.current.getCenter().lat, 38, 'latitude is updated');
  t.is(mapRef.current.getZoom(), 14, 'zoom is updated');

  await sleep(1);
  t.is(onloadCalled, 1, 'onLoad is called');

  map.unmount();

  t.end();
});

test('Map#uncontrolled', async t => {
  t.plan(5);

  const lastLat = 40;
  function onRender(e) {
    const {lat} = e.target.getCenter();
    t.ok(lastLat > lat, 'animating');
  }

  act(() => {
    create(
      <Map
        mapLib={mapboxMock}
        initialViewState={{longitude: -100, latitude: 40, zoom: 4}}
        onLoad={e => {
          e.target.easeTo({center: [-122, 38], zoom: 14});
        }}
        onRender={onRender}
      />
    );
  });
});

test('Map#controlled#no-update', async t => {
  t.plan(5);

  const mapRef = {current: null};
  function onRender(e) {
    const {lat} = mapRef.current.getCenter();
    t.is(lat, 40, `latitude should match props: ${lat}`);
  }

  act(() => {
    create(
      <Map
        ref={mapRef}
        mapLib={mapboxMock}
        longitude={-100}
        latitude={40}
        zoom={4}
        onLoad={e => {
          e.target.easeTo({center: [-122, 38], zoom: 14});
        }}
        onRender={onRender}
      />
    );
  });
});

test('Map#controlled#mirror-back', async t => {
  t.plan(6);

  const mapRef = {current: null};
  function onRender(viewState) {
    const {lat} = mapRef.current.getCenter();
    t.is(lat, viewState.latitude, `latitude should match state: ${lat}`);
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
        mapLib={mapboxMock}
        {...viewState}
        onLoad={e => {
          e.target.easeTo({center: [-122, 38], zoom: 14});
        }}
        onMove={e => setViewState(e.viewState)}
        onRender={onRender.bind(null, viewState)}
      />
    );
  }

  act(() => {
    create(<App />);
  });
});

test('Map#controlled#delayed-update', async t => {
  t.plan(7);

  const mapRef = {current: null};
  function onRender(viewState) {
    const {lat} = mapRef.current.getCenter();
    t.is(lat, viewState.latitude, `latitude should match state: ${lat}`);
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
        mapLib={mapboxMock}
        {...viewState}
        onLoad={e => {
          e.target.easeTo({center: [-122, 38], zoom: 14});
        }}
        onMove={e => setTimeout(() => setViewState(e.viewState))}
        onRender={onRender.bind(null, viewState)}
      />
    );
  }

  act(() => {
    create(<App />);
  });
});
