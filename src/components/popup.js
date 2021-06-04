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
import {useRef, useState, useEffect, useCallback} from 'react';
import * as PropTypes from 'prop-types';
import useMapControl, {mapControlDefaultProps, mapControlPropTypes} from './use-map-control';

import {getDynamicPosition, ANCHOR_POSITION} from '../utils/dynamic-position';
import {getTerrainElevation} from '../utils/terrain';
import {crispPercentage, crispPixel} from '../utils/crisp-pixel';

const propTypes = Object.assign({}, mapControlPropTypes, {
  // Custom className
  className: PropTypes.string,
  // Longitude of the anchor point
  longitude: PropTypes.number.isRequired,
  // Latitude of the anchor point
  latitude: PropTypes.number.isRequired,
  // Altitude of the anchor point
  altitude: PropTypes.number,
  // Offset from the left
  offsetLeft: PropTypes.number,
  // Offset from the top
  offsetTop: PropTypes.number,
  // Size of the tip
  tipSize: PropTypes.number,
  // Whether to show close button
  closeButton: PropTypes.bool,
  // Whether to close on click
  closeOnClick: PropTypes.bool,
  // The popup's location relative to the coordinate
  anchor: PropTypes.oneOf(Object.keys(ANCHOR_POSITION)),
  // Whether the popup anchor should be auto-adjusted to fit within the container
  dynamicPosition: PropTypes.bool,
  // Whether popups should be sorted by depth. Useful when using multiple popups with tilted map.
  sortByDepth: PropTypes.bool,
  // Callback when component is closed
  onClose: PropTypes.func
});

const defaultProps = Object.assign({}, mapControlDefaultProps, {
  className: '',
  offsetLeft: 0,
  offsetTop: 0,
  tipSize: 10,
  anchor: 'bottom',
  dynamicPosition: true,
  sortByDepth: false,
  closeButton: true,
  closeOnClick: true,
  onClose: () => {}
});

function getPosition(props, viewport, el, [x, y]) {
  const {anchor, dynamicPosition, tipSize} = props;

  if (el) {
    return dynamicPosition
      ? getDynamicPosition({
          x,
          y,
          anchor,
          padding: tipSize,
          width: viewport.width,
          height: viewport.height,
          selfWidth: el.clientWidth,
          selfHeight: el.clientHeight
        })
      : anchor;
  }

  return anchor;
}

function getContainerStyle(props, viewport, el, [x, y, z], positionType) {
  const {offsetLeft, offsetTop, sortByDepth} = props;
  const anchorPosition = ANCHOR_POSITION[positionType];
  const left = x + offsetLeft;
  const top = y + offsetTop;

  const xPercentage = crispPercentage(el, -anchorPosition.x * 100);
  const yPercentage = crispPercentage(el, -anchorPosition.y * 100, 'y');
  const style = {
    position: 'absolute',
    transform: `
      translate(${xPercentage}%, ${yPercentage}%)
      translate(${crispPixel(left)}px, ${crispPixel(top)}px)
    `,
    display: undefined,
    zIndex: undefined
  };

  if (!sortByDepth) {
    return style;
  }
  if (z > 1 || z < -1 || x < 0 || x > viewport.width || y < 0 || y > viewport.height) {
    // clipped
    style.display = 'none';
  } else {
    // use z-index to rearrange components
    style.zIndex = Math.floor(((1 - z) / 2) * 100000);
  }

  return style;
}

function onClick(evt, {props, context}) {
  if (props.closeOnClick || evt.target.className === 'mapboxgl-popup-close-button') {
    props.onClose();

    if (context.eventManager) {
      // Using with InteractiveMap
      // After we call `onClose` on `anyclick`, this component will be unmounted
      // at which point we unregister the event listeners and stop blocking propagation.
      // Then after a short delay a `click` event will fire
      // Attach a one-time event listener here to prevent it from triggering `onClick` of the base map
      context.eventManager.once('click', e => e.stopPropagation(), evt.target);
    }
  }
}

/*
 * PureComponent doesn't update when context changes.
 * The only way is to implement our own shouldComponentUpdate here. Considering
 * the parent component (StaticMap or InteractiveMap) is pure, and map re-render
 * is almost always triggered by a viewport change, we almost definitely need to
 * recalculate the popup's position when the parent re-renders.
 */
function Popup(props) {
  const contentRef = useRef(null);
  const thisRef = useMapControl({...props, onClick});
  const {context, containerRef} = thisRef;
  const [, setLoaded] = useState(false);

  useEffect(() => {
    // Container just got a size, re-calculate position
    setLoaded(true);
  }, [contentRef.current]);

  const {viewport, map} = context;
  const {className, longitude, latitude, tipSize, closeButton, children} = props;

  let {altitude} = props;
  if (altitude === undefined) {
    altitude = getTerrainElevation(map, {longitude, latitude});
  }

  const position = viewport.project([longitude, latitude, altitude]);

  const positionType = getPosition(props, viewport, contentRef.current, position);
  const containerStyle = getContainerStyle(
    props,
    viewport,
    containerRef.current,
    position,
    positionType
  );

  // If eventManager does not exist (using with static map), listen to React event
  const onReactClick = useCallback(e => !context.eventManager && onClick(e, thisRef), [
    context.eventManager
  ]);

  return (
    <div
      className={`mapboxgl-popup mapboxgl-popup-anchor-${positionType} ${className}`}
      // @ts-ignore
      style={containerStyle}
      ref={containerRef}
    >
      <div key="tip" className="mapboxgl-popup-tip" style={{borderWidth: tipSize}} />
      <div key="content" ref={contentRef} className="mapboxgl-popup-content" onClick={onReactClick}>
        {closeButton && (
          <button key="close-button" className="mapboxgl-popup-close-button" type="button">
            ×
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

Popup.propTypes = propTypes;
Popup.defaultProps = defaultProps;

export default React.memo(Popup);
