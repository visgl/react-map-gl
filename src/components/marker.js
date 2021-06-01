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
import {useMemo} from 'react';
import * as PropTypes from 'prop-types';
import useDraggableControl, {
  draggableControlDefaultProps,
  draggableControlPropTypes
} from './draggable-control';
import {crispPixel} from '../utils/crisp-pixel';
import {getTerrainElevation} from '../utils/terrain';

const propTypes = Object.assign({}, draggableControlPropTypes, {
  // Custom className
  className: PropTypes.string,
  // Longitude of the anchor point
  longitude: PropTypes.number.isRequired,
  // Latitude of the anchor point
  latitude: PropTypes.number.isRequired
});

const defaultProps = Object.assign({}, draggableControlDefaultProps, {
  className: ''
});

function getPosition({props, state, context}) {
  const {longitude, latitude, offsetLeft, offsetTop} = props;
  const {dragPos, dragOffset} = state;
  const {viewport, map} = context;

  // If dragging, just return the current drag position
  if (dragPos && dragOffset) {
    return [dragPos[0] + dragOffset[0], dragPos[1] + dragOffset[1]];
  }

  const altitude = getTerrainElevation(map, {longitude, latitude});

  // Otherwise return the projected lat/lng with offset
  let [x, y] = viewport.project([longitude, latitude, altitude]);
  x += offsetLeft;
  y += offsetTop;
  return [x, y];
}

/*
 * PureComponent doesn't update when context changes.
 * The only way is to implement our own shouldComponentUpdate here. Considering
 * the parent component (StaticMap or InteractiveMap) is pure, and map re-render
 * is almost always triggered by a viewport change, we almost definitely need to
 * recalculate the marker's position when the parent re-renders.
 */
function Marker(props) {
  const thisRef = useDraggableControl(props);
  const {state, containerRef} = thisRef;

  const {children, className, draggable} = props;
  const {dragPos} = state;

  const [x, y] = getPosition(thisRef);
  const transform = `translate(${crispPixel(x)}px, ${crispPixel(y)}px)`;
  const cursor = draggable ? (dragPos ? 'grabbing' : 'grab') : 'auto';

  // Perf: avoid rerendering if only the viewport changed
  const control = useMemo(() => {
    const containerStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      transform,
      cursor
    };

    return (
      <div
        className={`mapboxgl-marker ${className}`}
        ref={thisRef.containerRef}
        // @ts-ignore
        style={containerStyle}
      >
        {children}
      </div>
    );
  }, [children, className]);

  const container = containerRef.current;
  if (container) {
    container.style.transform = transform;
    container.style.cursor = cursor;
  }

  return control;
}

Marker.defaultProps = defaultProps;
Marker.propTypes = propTypes;

export default React.memo(Marker);
