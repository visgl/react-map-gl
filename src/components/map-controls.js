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

// MapControls uses non-react event manager to register events
import EventManager from '../utils/event-manager';
import MapState from '../utils/map-state';

import config from '../config';

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
    // Register event handlers on the canvas using the EventManager helper class
    //
    // Note that mouse move and click are handled directly by static-map
    // Corresponding to hover and click on map
    // onMouseMove={this._onMouseMove}
    // onMouseClick={this._onMouseClick}

    this._eventManager = new EventManager(this.refs.canvas, {
      onMouseDown: this._onMouseDown,
      onMouseDrag: this._onMouseDrag,
      onMouseUp: this._onMouseUp,
      onTouchRotate: this._onTouchRotate,
      onWheel: this._onWheel,
      onWheelEnd: this._onWheelEnd,
      mapTouchToMouse: true
    });
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

  _onTouchRotate(opts) {
    this._onMouseRotate(opts);
  }

  _onMouseDown({pos}) {
    const newMapState = this.props.mapState.panStart({pos}).rotateStart({pos});
    this._updateViewport(newMapState, {isDragging: true});
  }

  _onMouseDrag({pos, startPos, modifier}) {
    if (!this.props.onChangeViewport) {
      return;
    }

    if (modifier) {
      this._onMouseRotate({pos, startPos});
    } else {
      this._onMousePan({pos});
    }
  }

  _onMousePan({pos}) {
    const newMapState = this.props.mapState.pan({pos});
    this._updateViewport(newMapState);
  }

  _onMouseRotate({pos, startPos}) {
    if (!this.props.onChangeViewport || !this.props.perspectiveEnabled) {
      return;
    }

    const xDelta = pos[0] - startPos[0];
    const yDelta = pos[1] - startPos[1];

    const xDeltaScale = xDelta / this.props.width;
    let yDeltaScale = 0;

    if (yDelta > 0) {
      if (Math.abs(this.props.height - startPos[1]) > PITCH_MOUSE_THRESHOLD) {
        // Move from 0 to -1 as we drag upwards
        yDeltaScale = yDelta / (startPos[1] - this.props.height) * PITCH_ACCEL;
      }
    } else if (yDelta < 0) {
      if (startPos[1] > PITCH_MOUSE_THRESHOLD) {
        // Move from 0 to 1 as we drag upwards
        yDeltaScale = 1 - pos[1] / startPos[1];
      }
    }

    const newMapState = this.props.mapState.rotate({xDeltaScale, yDeltaScale});
    this._updateViewport(newMapState);
  }

  _onMouseUp() {
    const newMapState = this.props.mapState.panEnd().rotateEnd();
    this._updateViewport(newMapState, {isDragging: false});
  }

  _onWheel({pos, delta}) {
    let scale = 2 / (1 + Math.exp(-Math.abs(delta * ZOOM_ACCEL)));
    if (delta < 0 && scale !== 0) {
      scale = 1 / scale;
    }

    const newMapState = this.props.mapState.zoom({pos, scale});
    this._updateViewport(newMapState, {isDragging: true});
  }

  _onWheelEnd() {
    const newMapState = this.props.mapState.zoomEnd();
    this._updateViewport(newMapState, {isDragging: false});
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
