import {Map, Popup} from 'react-map-gl/mapbox-legacy';
import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {act} from 'react-dom/test-utils';
import {expect, test} from 'vitest';
import {waitForMapLoad} from '../utils/test-utils';

test('Popup', async () => {
  const rootContainer = document.createElement('div');
  const root = createRoot(rootContainer);
  const mapRef = {current: null};
  const popupRef = {current: null};

  await act(() =>
    root.render(
      <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
        <Popup ref={popupRef} longitude={-122} latitude={38} offset={[0, 10]}>
          You are here
        </Popup>
      </Map>
    )
  );
  await waitForMapLoad(mapRef);

  expect(rootContainer.querySelector('.mapboxgl-popup'), 'Popup is attached to DOM').toBeTruthy();
  expect(popupRef.current, 'Popup is created').toBeTruthy();

  const popup = popupRef.current;
  const {anchor, offset, maxWidth} = popup.options;

  await act(() =>
    root.render(
      <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
        <Popup ref={popupRef} longitude={-122} latitude={38} offset={[0, 10]}>
          <div id="popup-content">You are here</div>
        </Popup>
      </Map>
    )
  );

  expect(offset, 'offset did not change deeply').toBe(popup.options.offset);
  expect(rootContainer.querySelector('#popup-content'), 'content is rendered').toBeTruthy();

  await act(() =>
    root.render(
      <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
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
    )
  );

  expect(offset, 'offset is updated').not.toBe(popup.options.offset);
  expect(anchor, 'anchor is updated').not.toBe(popup.options.anchor);
  expect(maxWidth, 'maxWidth is updated').not.toBe(popup.options.maxWidth);

  await act(() =>
    root.render(
      <Map ref={mapRef} mapLib={import('mapbox-gl-v1')}>
        <Popup ref={popupRef} longitude={-122} latitude={38} className="classA">
          <div id="popup-content">You are here</div>
        </Popup>
      </Map>
    )
  );

  expect(popup.options.className, 'className is updated').toBe('classA');

  await act(() => root.unmount());
});
