import {Map, Marker} from 'react-map-gl';
import * as React from 'react';
import {create, act} from 'react-test-renderer';
import test from 'tape-promise/tape';

import {createPortalMock, waitForMapLoad} from '../utils/test-utils';

test('Marker', async t => {
  const restoreMock = createPortalMock();
  const mapRef = {current: null};

  let map;
  act(() => {
    map = create(
      <Map ref={mapRef}>
        <Marker longitude={-122} latitude={38} />
      </Map>
    );
  });

  await waitForMapLoad(mapRef);

  const marker = mapRef.current.getMap()._markers[0];
  t.ok(marker, 'Marker is created');

  const offset = marker.getOffset();
  const draggable = marker.isDraggable();
  const rotation = marker.getRotation();
  const pitchAlignment = marker.getPitchAlignment();
  const rotationAlignment = marker.getRotationAlignment();

  act(() => {
    map.update(
      <Map ref={mapRef}>
        <Marker longitude={-122} latitude={38} offset={[0, 0]} />
      </Map>
    );
  });

  t.is(offset, marker.getOffset(), 'offset did not change deeply');

  let callbackType = '';
  act(() => {
    map.update(
      <Map ref={mapRef}>
        <Marker
          longitude={-122}
          latitude={38}
          offset={[0, 1]}
          rotation={30}
          draggable
          pitchAlignment="viewport"
          rotationAlignment="viewport"
          onDragStart={() => (callbackType = 'dragstart')}
          onDrag={() => (callbackType = 'drag')}
          onDragEnd={() => (callbackType = 'dragend')}
        />
      </Map>
    );
  });

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

  act(() => {
    map.update(<Map ref={mapRef} />);
  });

  t.is(mapRef.current.getMap()._markers.length, 0, 'marker is removed');

  act(() => {
    map.update(
      <Map ref={mapRef}>
        <Marker longitude={-100} latitude={40}>
          <div id="marker-content" />
        </Marker>
      </Map>
    );
  });

  t.ok(map.root.findByProps({id: 'marker-content'}), 'content is rendered');

  map.unmount();

  restoreMock();

  t.end();
});
