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
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import autobind from '../utils/autobind';

import MapState from '../utils/map-state';
import config from '../config';

import EventManager from '../utils/event-manager/event-manager';

// EVENT HANDLING PARAMETERS
const PITCH_MOUSE_THRESHOLD = 5;
const PITCH_ACCEL = 1.2;
const ZOOM_ACCEL = 0.01;

const propTypes = {
  mapState: PropTypes.instanceOf(MapState).isRequired,

  /** Enables perspective control event handling */
  perspectiveEnabled: PropTypes.bool,
  /**
    * `onChangeViewport` callback is fired when the user interacted with the
    * map. The object passed to the callback contains `latitude`,
    * `longitude` and `zoom` and additional state information.
    */
  onChangeViewport: PropTypes.func,

  /**
    * Is the component currently being dragged. This is used to show/hide the
    * drag cursor. Also used as an optimization in some overlays by preventing
    * rendering while dragging.
    */
  isHovering: PropTypes.bool,
  isDragging: PropTypes.bool
};

const defaultProps = {
  perspectiveEnabled: false,
  onChangeViewport: null
};

export default class MapControls extends PureComponent {
  /**
   * @classdesc
   * A component that monitors events and updates mercator style viewport parameters
   * It can be used with our without a mapbox map
   * (e.g. it could pan over a static map image)
   */
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentDidMount() {
    // Register event handlers
    const {canvas} = this.refs;

    this._eventManager = new EventManager(canvas)
      .on({
        panstart: this._onPanStart,
        pan: this._onPan,
        panend: this._onPanEnd,
        pinchstart: this._onPinchStart,
        pinch: this._onPinch,
        pinchend: this._onPinchEnd,
        doubletap: this._onDoubleTap,
        wheel: this._onWheel
      });
  }

  componentWillUnmount() {
    if (this._eventManager) {
      // Must destroy because hammer adds event listeners to window
      this._eventManager.destroy();
    }
  }

  /* Event utils */
  // Event object: http://hammerjs.github.io/api/#event-object
  _getCenter(event) {
    const {center, target} = event;
    const rect = target.getBoundingClientRect();
    return [
      center.x - rect.left - target.clientLeft,
      center.y - rect.top - target.clientTop
    ];
  }

  _isFunctionKeyPressed(event) {
    const {srcEvent} = event;
    return Boolean(srcEvent.metaKey || srcEvent.altKey ||
      srcEvent.ctrlKey || srcEvent.shiftKey);
  }

  // Calculate a cursor style to show that we are in "dragging state"
  _getCursor() {
    const isInteractive =
      this.props.onChangeViewport ||
      this.props.onClickFeature ||
      this.props.onHoverFeatures;

    if (!isInteractive) {
      return 'inherit';
    }
    if (this.props.isDragging) {
      return config.CURSOR.GRABBING;
    }
    if (this.props.isHovering) {
      return config.CURSOR.POINTER;
    }
    return config.CURSOR.GRAB;
  }

  _updateViewport(mapState, extraState = {}) {
    if (!this.props.onChangeViewport) {
      return false;
    }

    const {isDragging} = this.props;
    return this.props.onChangeViewport(Object.assign(
      {isDragging},
      mapState.getViewportProps(),
      extraState
    ));
  }

  _onPanStart(event) {
    const pos = this._getCenter(event);
    const newMapState = this.props.mapState.panStart({pos}).rotateStart({pos});
    this._updateViewport(newMapState, {isDragging: true});
  }

  _onPan(event) {
    return this._isFunctionKeyPressed(event) ? this._onRotateMap(event) : this._onPanMap(event);
  }

  _onPanEnd(event) {
    const newMapState = this.props.mapState.panEnd().rotateEnd();
    this._updateViewport(newMapState, {isDragging: false});
  }

  _onPanMap(event) {
    const pos = this._getCenter(event);
    const newMapState = this.props.mapState.pan({pos});
    this._updateViewport(newMapState);
  }

  _onRotateMap(event) {
    if (!this.props.perspectiveEnabled) {
      return;
    }

    const {deltaX, deltaY} = event;
    const [, centerY] = this._getCenter(event);
    const startY = centerY - deltaY;

    const deltaScaleX = deltaX / this.props.width;
    let deltaScaleY = 0;

    if (deltaY > 0) {
      if (Math.abs(this.props.height - startY) > PITCH_MOUSE_THRESHOLD) {
        // Move from 0 to -1 as we drag upwards
        deltaScaleY = deltaY / (startY - this.props.height) * PITCH_ACCEL;
      }
    } else if (deltaY < 0) {
      if (startY > PITCH_MOUSE_THRESHOLD) {
        // Move from 0 to 1 as we drag upwards
        deltaScaleY = 1 - centerY / startY;
      }
    }
    deltaScaleY = Math.min(1, Math.max(-1, deltaScaleY));

    const newMapState = this.props.mapState.rotate({deltaScaleX, deltaScaleY});
    this._updateViewport(newMapState);
  }

  _onWheel(event) {
    const pos = this._getCenter(event);
    const {delta} = event;

    // Map wheel delta to relative scale
    let scale = 2 / (1 + Math.exp(-Math.abs(delta * ZOOM_ACCEL)));
    if (delta < 0 && scale !== 0) {
      scale = 1 / scale;
    }

    const newMapState = this.props.mapState.zoom({pos, scale});
    this._updateViewport(newMapState);
  }

  _onPinchStart(event) {
    const pos = this._getCenter(event);
    const newMapState = this.props.mapState.zoomStart({pos});
    this._updateViewport(newMapState, {isDragging: true});
  }

  _onPinch(event) {
    const pos = this._getCenter(event);
    const {scale} = event;
    const newMapState = this.props.mapState.zoom({pos, scale});
    this._updateViewport(newMapState);
  }

  _onPinchEnd(event) {
    const newMapState = this.props.mapState.zoomEnd();
    this._updateViewport(newMapState, {isDragging: false});
  }

  _onDoubleTap(event) {
    const pos = this._getCenter(event);
    const isZoomOut = this._isFunctionKeyPressed(event);

    const newMapState = this.props.mapState.zoom({pos, scale: isZoomOut ? 0.5 : 2});
    this._updateViewport(newMapState);
  }

  render() {
    const {className, width, height, style} = this.props;

    const mapEventLayerStyle = Object.assign({}, style, {
      width,
      height,
      position: 'relative',
      cursor: this._getCursor()
    });

    return React.createElement('div', {
      ref: 'canvas',
      style: mapEventLayerStyle,
      className
    }, this.props.children);
  }
}

MapControls.displayName = 'MapControls';
MapControls.propTypes = propTypes;
MapControls.defaultProps = defaultProps;
