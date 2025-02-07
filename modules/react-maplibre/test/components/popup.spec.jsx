/* global document */
import test from 'tape-promise/tape';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {Map, Popup} from '@vis.gl/react-maplibre';
import {sleep, waitForMapLoad} from '../utils/test-utils';

test('Popup', async t => {
  const rootContainer = document.createElement('div');
  const root = createRoot(rootContainer);
  const mapRef = {current: null};
  const popupRef = {current: null};

  root.render(
    <Map ref={mapRef}>
      <Popup ref={popupRef} longitude={-122} latitude={38} offset={[0, 10]}>
        You are here
      </Popup>
    </Map>
  );
  await waitForMapLoad(mapRef);
  await sleep(1);

  t.ok(rootContainer.querySelector('.maplibregl-popup'), 'Popup is attached to DOM');
  t.ok(popupRef.current, 'Popup is created');

  const popup = popupRef.current;
  const {anchor, offset, maxWidth} = popup.options;

  root.render(
    <Map ref={mapRef}>
      <Popup ref={popupRef} longitude={-122} latitude={38} offset={[0, 10]}>
        <div id="popup-content">You are here</div>
      </Popup>
    </Map>
  );
  await sleep(1);

  t.is(offset, popup.options.offset, 'offset did not change deeply');
  t.ok(rootContainer.querySelector('#popup-content'), 'content is rendered');

  root.render(
    <Map ref={mapRef}>
      <Popup
        ref={popupRef}
        longitude={-122}
        latitude={38}
        offset={{top: [0, 0], left: [10, 0]}}
        anchor="top"
        maxWidth="100px"
      >
        <div id="popup-content">You are here</div>
      </Popup>
    </Map>
  );
  await sleep(1);

  t.not(offset, popup.options.offset, 'offset is updated');
  t.not(anchor, popup.options.anchor, 'anchor is updated');
  t.not(maxWidth, popup.options.maxWidth, 'maxWidth is updated');

  root.render(
    <Map ref={mapRef}>
      <Popup ref={popupRef} longitude={-122} latitude={38} className="classA">
        <div id="popup-content">You are here</div>
      </Popup>
    </Map>
  );
  await sleep(1);
  t.ok(popup._container.classList.contains('classA'), 'className is updated');

  root.unmount();
  t.end();
});
