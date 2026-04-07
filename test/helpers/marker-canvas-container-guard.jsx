/* global document, window, setTimeout */
import * as React from 'react';
import {createRoot} from 'react-dom/client';

class MockMarker {
  constructor(options = {}) {
    this._element = options.element || document.createElement('div');
    this._lngLat = {lng: 0, lat: 0};
    this._offset = null;
    this._draggable = false;
    this._rotation = 0;
    this._rotationAlignment = 'auto';
    this._pitchAlignment = 'auto';
    this._popup = null;
    this._listeners = {};
  }

  addTo(map) {
    this.remove();
    this._map = map;
    map.getCanvasContainer().appendChild(this._element);
    return this;
  }

  remove() {
    this._map = null;
    return this;
  }

  setLngLat([lng, lat]) {
    this._lngLat = {lng, lat};
    return this;
  }

  getLngLat() {
    return this._lngLat;
  }

  getElement() {
    return this._element;
  }

  on(type, handler) {
    this._listeners[type] = handler;
    return this;
  }

  getOffset() {
    return this._offset;
  }

  setOffset(offset) {
    this._offset = offset;
    return this;
  }

  isDraggable() {
    return this._draggable;
  }

  setDraggable(draggable) {
    this._draggable = draggable;
    return this;
  }

  getRotation() {
    return this._rotation;
  }

  setRotation(rotation) {
    this._rotation = rotation;
    return this;
  }

  getRotationAlignment() {
    return this._rotationAlignment;
  }

  setRotationAlignment(rotationAlignment) {
    this._rotationAlignment = rotationAlignment;
    return this;
  }

  getPitchAlignment() {
    return this._pitchAlignment;
  }

  setPitchAlignment(pitchAlignment) {
    this._pitchAlignment = pitchAlignment;
    return this;
  }

  getPopup() {
    return this._popup;
  }

  setPopup(popup) {
    this._popup = popup;
    return this;
  }

  toggleClassName(className) {
    this._element.classList.toggle(className);
    return this;
  }
}

export async function testMissingCanvasContainer(t, {MapContext, Marker}) {
  const root = createRoot(document.createElement('div'));
  const errors = [];
  const originalError = window.onerror;

  const mapValue = {
    map: {
      getMap: () => ({
        getCanvasContainer: () => undefined
      })
    },
    mapLib: {
      Marker: MockMarker
    }
  };

  window.onerror = event => {
    errors.push(event?.error || event);
    return true;
  };

  root.render(
    <MapContext.Provider value={mapValue}>
      <Marker longitude={-122} latitude={38}>
        <div />
      </Marker>
    </MapContext.Provider>
  );

  await new Promise(resolve => setTimeout(resolve, 0));

  window.onerror = originalError;
  root.unmount();

  t.deepEqual(errors, [], 'no addTo error is thrown');
}
