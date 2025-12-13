import * as React from 'react';
import {useState, cloneElement} from 'react';
import {useControl} from 'react-map-gl/maplibre';
import {createPortal} from 'react-dom';

import type {IControl, MapInstance} from 'react-map-gl/maplibre';

class OverlayControl implements IControl {
  _map: MapInstance = null;
  _container: HTMLElement;
  _redraw: () => void;

  constructor(redraw: () => void) {
    this._redraw = redraw;
  }

  onAdd(map) {
    this._map = map;
    map.on('move', this._redraw);
    /* global document */
    this._container = document.createElement('div');
    this._redraw();
    return this._container;
  }

  onRemove() {
    this._container.remove();
    this._map.off('move', this._redraw);
    this._map = null;
  }

  getMap() {
    return this._map;
  }

  getElement() {
    return this._container;
  }
}

/**
 * A custom control that rerenders arbitrary React content whenever the camera changes
 */
function CustomOverlay(props: {children: React.ReactElement}) {
  const [, setVersion] = useState(0);

  const ctrl = useControl<OverlayControl>(() => {
    const forceUpdate = () => setVersion(v => v + 1);
    return new OverlayControl(forceUpdate);
  });

  const map = ctrl.getMap();

  return map && createPortal(cloneElement(props.children, {map}), ctrl.getElement());
}

export default React.memo(CustomOverlay);
