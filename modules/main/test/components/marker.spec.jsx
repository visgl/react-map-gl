import {Map, Marker} from 'react-map-gl/mapbox-legacy';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import test from 'tape-promise/tape';

import {sleep, waitForMapLoad} from '../utils/test-utils';

test('Marker', async t => {
  const rootContainer = document.createElement('div');
  const root = createRoot(rootContainer);
  const markerRef = {current: null};
  const mapRef = {current: null};

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
      <Marker ref={markerRef} longitude={-122} latitude={38} />
    </Map>
  );

  await waitForMapLoad(mapRef);
  await sleep(1);

  t.ok(rootContainer.querySelector('.mapboxgl-marker'), 'Marker is attached to DOM');
  t.ok(markerRef.current, 'Marker is created');

  const marker = markerRef.current;
  const offset = marker.getOffset();
  const draggable = marker.isDraggable();
  const rotation = marker.getRotation();
  const pitchAlignment = marker.getPitchAlignment();
  const rotationAlignment = marker.getRotationAlignment();

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
      <Marker ref={markerRef} longitude={-122} latitude={38} offset={[0, 0]} />
    </Map>
  );

  t.is(offset, marker.getOffset(), 'offset did not change deeply');

  let callbackType = '';
  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
      <Marker
        ref={markerRef}
        longitude={-122}
        latitude={38}
        offset={[0, 1]}
        rotation={30}
        draggable
        pitchAlignment="map"
        rotationAlignment="map"
        onDragStart={() => (callbackType = 'dragstart')}
        onDrag={() => (callbackType = 'drag')}
        onDragEnd={() => (callbackType = 'dragend')}
      />
    </Map>
  );
  await sleep(1);

  t.not(offset, marker.getOffset(), 'offset is updated');
  t.not(draggable, marker.isDraggable(), 'draggable is updated');
  t.not(rotation, marker.getRotation(), 'rotation is updated');
  t.not(pitchAlignment, marker.getPitchAlignment(), 'pitchAlignment is updated');
  t.not(rotationAlignment, marker.getRotationAlignment(), 'rotationAlignment is updated');

  marker.fire('dragstart');
  t.is(callbackType, 'dragstart', 'onDragStart called');
  marker.fire('drag');
  t.is(callbackType, 'drag', 'onDrag called');
  marker.fire('dragend');
  t.is(callbackType, 'dragend', 'onDragEnd called');

  root.render(<Map ref={mapRef} mapLib={import('mapbox-gl-v1')} />);
  await sleep(1);

  t.notOk(markerRef.current, 'marker is removed');

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
      <Marker ref={markerRef} longitude={-100} latitude={40}>
        <div id="marker-content" />
      </Marker>
    </Map>
  );
  await sleep(1);

  t.ok(rootContainer.querySelector('#marker-content'), 'content is rendered');

  root.unmount();

  t.end();
});
