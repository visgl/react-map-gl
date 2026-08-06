/* global document */
import {expect, test} from 'vitest';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';
import {Map, Marker} from '@vis.gl/react-maplibre';
import {waitForMapLoad} from '../utils/test-utils';

test('Marker', async () => {
  const rootContainer = document.createElement('div');
  const root = createRoot(rootContainer);
  const markerRef = {current: null};
  const mapRef = {current: null};

  await act(() =>
    root.render(
      <Map ref={mapRef}>
        <Marker ref={markerRef} longitude={-122} latitude={38} offset={[0, 0]} />
      </Map>
    )
  );

  await waitForMapLoad(mapRef);

  expect(
    rootContainer.querySelector('.maplibregl-marker'),
    'Marker is attached to DOM'
  ).toBeTruthy();
  expect(markerRef.current, 'Marker is created').toBeTruthy();

  const marker = markerRef.current;
  const offset = marker.getOffset();
  const draggable = marker.isDraggable();
  const rotation = marker.getRotation();
  const pitchAlignment = marker.getPitchAlignment();
  const rotationAlignment = marker.getRotationAlignment();

  await act(() =>
    root.render(
      <Map ref={mapRef}>
        <Marker ref={markerRef} longitude={-122} latitude={38} offset={[0, 0]} />
      </Map>
    )
  );

  expect(offset, 'offset did not change deeply').toBe(marker.getOffset());

  let callbackType = '';
  await act(() =>
    root.render(
      <Map ref={mapRef}>
        <Marker
          ref={markerRef}
          longitude={-122}
          latitude={38}
          offset={[0, 1]}
          rotation={30}
          draggable
          className="classA"
          pitchAlignment="viewport"
          rotationAlignment="viewport"
          onDragStart={() => (callbackType = 'dragstart')}
          onDrag={() => (callbackType = 'drag')}
          onDragEnd={() => (callbackType = 'dragend')}
        />
      </Map>
    )
  );

  expect(offset, 'offset is updated').not.toBe(marker.getOffset());
  expect(draggable, 'draggable is updated').not.toBe(marker.isDraggable());
  expect(rotation, 'rotation is updated').not.toBe(marker.getRotation());
  expect(pitchAlignment, 'pitchAlignment is updated').not.toBe(marker.getPitchAlignment());
  expect(rotationAlignment, 'rotationAlignment is updated').not.toBe(marker.getRotationAlignment());
  expect(marker._element.classList.contains('classA'), 'className is updated').toBeTruthy();

  marker.fire('dragstart');
  expect(callbackType, 'onDragStart called').toBe('dragstart');
  marker.fire('drag');
  expect(callbackType, 'onDrag called').toBe('drag');
  marker.fire('dragend');
  expect(callbackType, 'onDragEnd called').toBe('dragend');

  await act(() => root.render(<Map ref={mapRef} />));

  expect(markerRef.current, 'marker is removed').toBeFalsy();

  await act(() =>
    root.render(
      <Map ref={mapRef}>
        <Marker ref={markerRef} longitude={-100} latitude={40}>
          <div id="marker-content" />
        </Marker>
      </Map>
    )
  );

  expect(rootContainer.querySelector('#marker-content'), 'content is rendered').toBeTruthy();

  await act(() => root.unmount());
});
