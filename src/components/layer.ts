import {useContext, useEffect, useMemo, useState, useRef} from 'react';
import {MapContext} from './map';
import assert from '../utils/assert';
import {deepEqual} from '../utils/deep-equal';

import type {MapboxMap, AnyLayer} from '../types';

export type DeprecatedLayerProps = AnyLayer & {
  id?: string;
  /** If set, the layer will be inserted before the specified layer */
  beforeId?: string;
};

export type LayerProps =
  | {
      layer: AnyLayer;
      beforeId?: string;
    }
  | DeprecatedLayerProps;

/* eslint-disable complexity, max-statements */
function updateLayer(map: MapboxMap, id: string, props: AnyLayer, prevProps: AnyLayer) {
  assert(props.id === prevProps.id, 'layer id changed');
  assert(props.type === prevProps.type, 'layer type changed');

  if (props.type === 'custom' || prevProps.type === 'custom') {
    return;
  }

  const {layout = {}, paint = {}, filter, minzoom, maxzoom} = props;

  if (layout !== prevProps.layout) {
    const prevLayout = prevProps.layout || {};
    for (const key in layout) {
      if (!deepEqual(layout[key], prevLayout[key])) {
        map.setLayoutProperty(id, key, layout[key]);
      }
    }
    for (const key in prevLayout) {
      if (!layout.hasOwnProperty(key)) {
        map.setLayoutProperty(id, key, undefined);
      }
    }
  }
  if (paint !== prevProps.paint) {
    const prevPaint = prevProps.paint || {};
    for (const key in paint) {
      if (!deepEqual(paint[key], prevPaint[key])) {
        map.setPaintProperty(id, key, paint[key]);
      }
    }
    for (const key in prevPaint) {
      if (!paint.hasOwnProperty(key)) {
        map.setPaintProperty(id, key, undefined);
      }
    }
  }
  if (!deepEqual(filter, prevProps.filter)) {
    map.setFilter(id, filter);
  }
  if (minzoom !== prevProps.minzoom || maxzoom !== prevProps.maxzoom) {
    map.setLayerZoomRange(id, minzoom, maxzoom);
  }
}

function isMapStyleLoaded(map: MapboxMap) {
  // @ts-ignore
  return map.style && map.style._loaded;
}

function createLayer(map: MapboxMap, id: string, layerProps: LayerProps, beforeId: string) {
  // @ts-ignore
  if (isMapStyleLoaded(map) && (!('source' in layerProps) || map.getSource(layerProps.source))) {
    // @ts-ignore
    map.addLayer(layerProps, beforeId);
  }
}

/* eslint-enable complexity, max-statements */

let layerCounter = 0;

function Layer(props: LayerProps & {layer?: AnyLayer}) {
  const map: MapboxMap = useContext(MapContext).map.getMap();

  const layerProps = useMemo(() => {
    if (props.layer) {
      return props.layer;
    }
    const res = {...props};
    delete res.beforeId;
    return res as DeprecatedLayerProps;
  }, [props.layer, props]);

  const layerPropsRef = useRef(layerProps);
  const [, setStyleLoaded] = useState(0);
  const beforeId = props.beforeId;

  const id = useMemo(() => layerProps.id || `jsx-layer-${layerCounter++}`, []);

  useEffect(() => {
    if (map) {
      const forceUpdate = () => setStyleLoaded(version => version + 1);
      map.on('styledata', forceUpdate);
      forceUpdate();

      return () => {
        map.off('styledata', forceUpdate);
        // @ts-ignore
        if (map.style && map.style._loaded && map.getLayer(id)) {
          map.removeLayer(id);
        }
      };
    }
    return undefined;
  }, [map]);

  // @ts-ignore
  const layer = map && map.style && map.getLayer(id);
  if (layer) {
    try {
      updateLayer(map, id, layerProps, layerPropsRef.current);
    } catch (error) {
      console.warn(error); // eslint-disable-line
    }
  } else {
    createLayer(map, id, layerProps, beforeId);
  }

  useEffect(() => {
    if (beforeId && isMapStyleLoaded(map)) {
      map.moveLayer(id, beforeId);
    }
  }, [beforeId]);

  // Store last rendered props
  layerPropsRef.current = layerProps;

  return null;
}

export default Layer;
