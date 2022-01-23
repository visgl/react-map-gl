/* global document */
import * as React from 'react';
import {useState, useCallback, cloneElement} from 'react';
import {useControl} from 'react-map-gl';
import {createPortal} from 'react-dom';

import type {MapboxMap, IControl} from 'react-map-gl';

// Based on template in https://docs.mapbox.com/mapbox-gl-js/api/markers/#icontrol
class OverlayControl implements IControl {
  _map: MapboxMap;
  _container: HTMLElement;

  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
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
  const [, setViewState] = useState({});

  const onMove = useCallback(evt => setViewState(evt.viewState), []);

  const ctrl = useControl(
    ({map}) => {
      map.on('move', onMove);
      const overlay = new OverlayControl();
      map.addControl(overlay);
      return overlay;
    },
    ({map}) => {
      map.off('move', onMove);
    }
  ) as OverlayControl;

  return createPortal(cloneElement(props.children, {map: ctrl.getMap()}), ctrl.getElement());
}

export default React.memo(CustomOverlay);
