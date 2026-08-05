import {Map, Popup} from '@vis.gl/react-mapbox';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {expect, test} from 'vitest';
import {sleep, waitForMapLoad} from '../utils/test-utils';
import {MapboxAccessToken} from '../utils/token';

test('Popup', async () => {
  const rootContainer = document.createElement('div');
  const root = createRoot(rootContainer);
  const mapRef = {current: null};
  const popupRef = {current: null};

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken}>
      <Popup ref={popupRef} longitude={-122} latitude={38} offset={[0, 10]}>
        You are here
      </Popup>
    </Map>
  );
  await waitForMapLoad(mapRef);
  await sleep(1);

  expect(rootContainer.querySelector('.mapboxgl-popup'), 'Popup is attached to DOM').toBeTruthy();
  expect(popupRef.current, 'Popup is created').toBeTruthy();

  const popup = popupRef.current;
  const {anchor, offset, maxWidth} = popup.options;

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken}>
      <Popup ref={popupRef} longitude={-122} latitude={38} offset={[0, 10]}>
        <div id="popup-content">You are here</div>
      </Popup>
    </Map>
  );
  await sleep(1);

  expect(offset, 'offset did not change deeply').toBe(popup.options.offset);
  expect(rootContainer.querySelector('#popup-content'), 'content is rendered').toBeTruthy();

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken}>
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

  expect(offset, 'offset is updated').not.toBe(popup.options.offset);
  expect(anchor, 'anchor is updated').not.toBe(popup.options.anchor);
  expect(maxWidth, 'maxWidth is updated').not.toBe(popup.options.maxWidth);

  root.render(
    <Map ref={mapRef} mapLib={import('mapbox-gl-v3')} mapboxAccessToken={MapboxAccessToken}>
      <Popup ref={popupRef} longitude={-122} latitude={38} className="classA">
        <div id="popup-content">You are here</div>
      </Popup>
    </Map>
  );
  await sleep(1);
  expect(popup._container.classList.contains('classA'), 'className is updated').toBeTruthy();

  root.unmount();
});
