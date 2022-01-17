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
  const [viewState, setViewState] = useState(null);

  const onMove = useCallback(evt => setViewState(evt.viewState), []);

  const ctrl = useControl(() => new OverlayControl(), {
    onAdd: (map: MapboxMap) => {
      setViewState({});
      map.on('move', onMove);
    },
    onRemove: (map: MapboxMap) => {
      map.off('move', onMove);
    }
  }) as OverlayControl;

  return (
    viewState && createPortal(cloneElement(props.children, {map: ctrl.getMap()}), ctrl.getElement())
  );
}

export default React.memo(CustomOverlay);
