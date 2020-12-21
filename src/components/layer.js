// Copyright (c) 2015 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
import {useContext, useEffect, useMemo, useState, useRef} from 'react';
import * as PropTypes from 'prop-types';
import MapContext from './map-context';
import assert from '../utils/assert';
import deepEqual from '../utils/deep-equal';

const LAYER_TYPES = [
  'fill',
  'line',
  'symbol',
  'circle',
  'fill-extrusion',
  'raster',
  'background',
  'heatmap',
  'hillshade',
  'sky'
];

const propTypes = {
  type: PropTypes.oneOf(LAYER_TYPES).isRequired,
  id: PropTypes.string,
  source: PropTypes.string,
  beforeId: PropTypes.string
};

/* eslint-disable complexity, max-statements */
function diffLayerStyles(map, id, props, prevProps) {
  const {layout = {}, paint = {}, filter, minzoom, maxzoom, beforeId, ...otherProps} = props;

  if (beforeId !== prevProps.beforeId) {
    map.moveLayer(id, beforeId);
  }
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
  for (const key in otherProps) {
    if (!deepEqual(otherProps[key], prevProps[key])) {
      map.setLayerProperty(id, key, otherProps[key]);
    }
  }
}

function createLayer(map, id, props) {
  if (map.style && map.style._loaded) {
    const options = {...props, id};
    delete options.beforeId;

    map.addLayer(options, props.beforeId);
  }
}

function updateLayer(map, id, props, prevProps) {
  assert(props.id === prevProps.id, 'layer id changed');
  assert(props.type === prevProps.type, 'layer type changed');

  try {
    diffLayerStyles(map, id, props, prevProps);
  } catch (error) {
    console.warn(error); // eslint-disable-line
  }
}
/* eslint-enable complexity, max-statements */

let layerCounter = 0;

function Layer(props) {
  const context = useContext(MapContext);
  const propsRef = useRef({id: props.id, type: props.type});
  const [, setStyleLoaded] = useState(0);

  const id = useMemo(() => props.id || `jsx-layer-${layerCounter++}`, []);
  const {map} = context;

  useEffect(() => {
    if (map) {
      const forceUpdate = () => setStyleLoaded(version => version + 1);
      map.on('styledata', forceUpdate);

      return () => {
        map.off('styledata', forceUpdate);
        if (map.style && map.style._loaded) {
          map.removeLayer(id);
        }
      };
    }
    return undefined;
  }, [map]);

  const layer = map && map.style && map.getLayer(id);
  if (layer) {
    updateLayer(map, id, props, propsRef.current);
  } else {
    createLayer(map, id, props);
  }

  // Store last rendered props
  propsRef.current = props;

  return null;
}

Layer.propTypes = propTypes;

export default Layer;
