import {Map, Popup} from 'react-map-gl';
import * as React from 'react';
import {create, act} from 'react-test-renderer';
import test from 'tape-promise/tape';

import {createPortalMock, waitForMapLoad} from '../utils/test-utils';

test('Popup', async t => {
  const restoreMock = createPortalMock();
  const mapRef = {current: null};

  let map;
  act(() => {
    map = create(
      <Map ref={mapRef}>
        <Popup longitude={-122} latitude={38} offset={[0, 10]}>
          You are here
        </Popup>
      </Map>
    );
  });

  await waitForMapLoad(mapRef);

  const popup = mapRef.current.getMap()._markers[0];
  t.ok(popup, 'Popup is created');

  const {anchor, offset, maxWidth} = popup.options;

  act(() => {
    map.update(
      <Map ref={mapRef}>
        <Popup longitude={-122} latitude={38} offset={[0, 10]}>
          You are here
        </Popup>
      </Map>
    );
  });

  t.is(offset, popup.options.offset, 'offset did not change deeply');

  act(() => {
    map.update(
      <Map ref={mapRef}>
        <Popup
          longitude={-122}
          latitude={38}
          offset={{top: [0, 0], left: [10, 0]}}
          anchor="top"
          maxWidth="100px"
        >
          You are here
        </Popup>
      </Map>
    );
  });

  t.not(offset, popup.options.offset, 'offset is updated');
  t.not(anchor, popup.options.anchor, 'anchor is updated');
  t.not(maxWidth, popup.options.maxWidth, 'maxWidth is updated');

  act(() => {
    map.update(
      <Map ref={mapRef}>
        <Popup longitude={-122} latitude={38} className="classA">
          You are here
        </Popup>
      </Map>
    );
  });

  t.is(popup.options.className, 'classA', 'className is updated');

  restoreMock();

  t.end();
});
