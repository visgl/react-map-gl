import {Map, Marker} from 'react-map-gl/mapbox-legacy';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {expect, test} from 'vitest';

import {sleep, waitForMapLoad} from '../utils/test-utils';

test('Marker', async () => {
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

  expect(rootContainer.querySelector('.mapboxgl-marker'), 'Marker is attached to DOM').toBeTruthy();
  expect(markerRef.current, 'Marker is created').toBeTruthy();

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

  expect(offset, 'offset did not change deeply').toBe(marker.getOffset());

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

  expect(offset, 'offset is updated').not.toBe(marker.getOffset());
  expect(draggable, 'draggable is updated').not.toBe(marker.isDraggable());
  expect(rotation, 'rotation is updated').not.toBe(marker.getRotation());
  expect(pitchAlignment, 'pitchAlignment is updated').not.toBe(marker.getPitchAlignment());
  expect(rotationAlignment, 'rotationAlignment is updated').not.toBe(marker.getRotationAlignment());

  marker.fire('dragstart');
  expect(callbackType, 'onDragStart called').toBe('dragstart');
  marker.fire('drag');
  expect(callbackType, 'onDrag called').toBe('drag');
  marker.fire('dragend');
  expect(callbackType, 'onDragEnd called').toBe('dragend');

  root.render(<Map ref={mapRef} mapLib={import('mapbox-gl-v1')} />);
  await sleep(1);

  expect(markerRef.current, 'marker is removed').toBeFalsy();

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
      <Marker ref={markerRef} longitude={-100} latitude={40}>
        <div id="marker-content" />
      </Marker>
    </Map>
  );
  await sleep(1);

  expect(rootContainer.querySelector('#marker-content'), 'content is rendered').toBeTruthy();

  root.unmount();
});
