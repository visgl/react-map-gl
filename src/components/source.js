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
import * as React from 'react';
import {useContext, useEffect, useMemo, useState, useRef} from 'react';
import {cloneElement} from 'react';
import * as PropTypes from 'prop-types';
import MapContext from './map-context';
import assert from '../utils/assert';
import deepEqual from '../utils/deep-equal';

const propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string
};

let sourceCounter = 0;

function createSource(map, id, props) {
  if (map.style && map.style._loaded) {
    const options = {...props};
    delete options.id;
    delete options.children;
    map.addSource(id, options);
    return map.getSource(id);
  }
  return null;
}

/* eslint-disable complexity */
function updateSource(source, props, prevProps) {
  assert(props.id === prevProps.id, 'source id changed');
  assert(props.type === prevProps.type, 'source type changed');

  let changedKey = '';
  let changedKeyCount = 0;

  for (const key in props) {
    if (key !== 'children' && key !== 'id' && !deepEqual(prevProps[key], props[key])) {
      changedKey = key;
      changedKeyCount++;
    }
  }

  if (!changedKeyCount) {
    return;
  }

  const {type} = props;
  if (type === 'geojson') {
    source.setData(props.data);
  } else if (type === 'image') {
    source.updateImage({url: props.url, coordinates: props.coordinates});
  } else if (
    (type === 'canvas' || type === 'video') &&
    changedKeyCount === 1 &&
    changedKey === 'coordinates'
  ) {
    source.setCoordinates(props.coordinates);
  } else if (type === 'vector' && source.setUrl) {
    // Added in 1.12.0:
    // vectorTileSource.setTiles
    // vectorTileSource.setUrl
    switch (changedKey) {
      case 'url':
        source.setUrl(props.url);
        break;
      case 'tiles':
        source.setTiles(props.tiles);
        break;
      default:
    }
  } else {
    // eslint-disable-next-line
    console.warn(`Unable to update <Source> prop: ${changedKey}`);
  }
}
/* eslint-enable complexity */

function Source(props) {
  const context = useContext(MapContext);
  const propsRef = useRef({id: props.id, type: props.type});
  const [, setStyleLoaded] = useState(0);

  const id = useMemo(() => props.id || `jsx-source-${sourceCounter++}`, []);
  const {map} = context;

  useEffect(() => {
    if (map) {
      const forceUpdate = () => setStyleLoaded(version => version + 1);
      map.on('styledata', forceUpdate);

      return () => {
        map.off('styledata', forceUpdate);
        /* global requestAnimationFrame */
        // Do not remove source immediately because the
        // dependent <Layer>s' componentWillUnmount() might not have been called
        // Removing source before dependent layers will throw error
        // TODO - find a more robust solution
        requestAnimationFrame(() => {
          if (map.style && map.style._loaded && map.getSource(id)) {
            map.removeSource(id);
          }
        });
      };
    }
    return undefined;
  }, [map, id]);

  let source = map && map.style && map.getSource(id);
  if (source) {
    updateSource(source, props, propsRef.current);
  } else {
    source = createSource(map, id, props);
  }
  propsRef.current = props;

  return (
    (source &&
      React.Children.map(
        props.children,
        child =>
          child &&
          cloneElement(child, {
            source: id
          })
      )) ||
    null
  );
}

Source.propTypes = propTypes;
export default Source;
