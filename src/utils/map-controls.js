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

// EVENT HANDLING PARAMETERS
const PITCH_MOUSE_THRESHOLD = 5;
const PITCH_ACCEL = 1.2;
const ZOOM_ACCEL = 0.01;

const SUBSCRIBED_EVENTS = [
  'panstart',
  'pan',
  'panend',
  'pinchstart',
  'pinch',
  'pinchend',
  'doubletap',
  'wheel'
];

export default class MapControls {
  /**
   * @classdesc
   * A class that handles events and updates mercator style viewport parameters
   */
  constructor() {
    this.events = SUBSCRIBED_EVENTS;
  }

  /**
   * Update the state of the control
   * @param {MapState} state.mapState - current map state
   * @param {Function} state.onChangeViewport - callback
   */
  setState({mapState, onChangeViewport, isDragging, perspectiveEnabled}) {
    this.mapState = mapState;
    this.onChangeViewport = onChangeViewport;
    this.isDragging = isDragging;
    this.perspectiveEnabled = perspectiveEnabled;
  }

  /**
   * Callback for events
   * @param {hammer.Event} event
   */
  handle(event) {
    switch (event.type) {
    case 'panstart':
      return this._onPanStart(event);
    case 'pan':
      return this._onPan(event);
    case 'panend':
      return this._onPanEnd(event);
    case 'pinchstart':
      return this._onPinchStart(event);
    case 'pinch':
      return this._onPinch(event);
    case 'pinchend':
      return this._onPinchEnd(event);
    case 'doubletap':
      return this._onDoubleTap(event);
    case 'wheel':
      return this._onWheel(event);
    default:
      return false;
    }
  }

  /* Event utils */
  // Event object: http://hammerjs.github.io/api/#event-object
  getCenter(event) {
    const {center, target} = event;
    const rect = target.getBoundingClientRect();
    return [
      center.x - rect.left - target.clientLeft,
      center.y - rect.top - target.clientTop
    ];
  }

  isFunctionKeyPressed(event) {
    const {srcEvent} = event;
    return Boolean(srcEvent.metaKey || srcEvent.altKey ||
      srcEvent.ctrlKey || srcEvent.shiftKey);
  }

  /* Callback util */
  // formats map state and invokes callback function
  updateViewport(mapState, extraState = {}) {
    if (!this.onChangeViewport) {
      return false;
    }

    return this.onChangeViewport(Object.assign(
      {isDragging: this.isDragging},
      mapState.getViewportProps(),
      extraState
    ));
  }

  /* Event handlers */
  // Default handler for the `panstart` event.
  _onPanStart(event) {
    const pos = this.getCenter(event);
    const newMapState = this.mapState.panStart({pos}).rotateStart({pos});
    return this.updateViewport(newMapState, {isDragging: true});
  }

  // Default handler for the `pan` event.
  _onPan(event) {
    return this.isFunctionKeyPressed(event) ? this._onPanRotate(event) : this._onPanMove(event);
  }

  // Default handler for the `panend` event.
  _onPanEnd(event) {
    const newMapState = this.mapState.panEnd().rotateEnd();
    return this.updateViewport(newMapState, {isDragging: false});
  }

  // Default handler for panning to move.
  // Called by `_onPan` when panning without function key pressed.
  _onPanMove(event) {
    const pos = this.getCenter(event);
    const newMapState = this.mapState.pan({pos});
    return this.updateViewport(newMapState);
  }

  // Default handler for panning to rotate.
  // Called by `_onPan` when panning with function key pressed.
  _onPanRotate(event) {
    if (!this.perspectiveEnabled) {
      return false;
    }

    const {deltaX, deltaY} = event;
    const [, centerY] = this.getCenter(event);
    const startY = centerY - deltaY;
    const {width, height} = this.mapState.getViewportProps();

    const deltaScaleX = deltaX / width;
    let deltaScaleY = 0;

    if (deltaY > 0) {
      if (Math.abs(height - startY) > PITCH_MOUSE_THRESHOLD) {
        // Move from 0 to -1 as we drag upwards
        deltaScaleY = deltaY / (startY - height) * PITCH_ACCEL;
      }
    } else if (deltaY < 0) {
      if (startY > PITCH_MOUSE_THRESHOLD) {
        // Move from 0 to 1 as we drag upwards
        deltaScaleY = 1 - centerY / startY;
      }
    }
    deltaScaleY = Math.min(1, Math.max(-1, deltaScaleY));

    const newMapState = this.mapState.rotate({deltaScaleX, deltaScaleY});
    return this.updateViewport(newMapState);
  }

  // Default handler for the `wheel` event.
  _onWheel(event) {
    const pos = this.getCenter(event);
    const {delta} = event;

    // Map wheel delta to relative scale
    let scale = 2 / (1 + Math.exp(-Math.abs(delta * ZOOM_ACCEL)));
    if (delta < 0 && scale !== 0) {
      scale = 1 / scale;
    }

    const newMapState = this.mapState.zoom({pos, scale});
    return this.updateViewport(newMapState);
  }

  // Default handler for the `pinchstart` event.
  _onPinchStart(event) {
    const pos = this.getCenter(event);
    const newMapState = this.mapState.zoomStart({pos});
    return this.updateViewport(newMapState, {isDragging: true});
  }

  // Default handler for the `pinch` event.
  _onPinch(event) {
    const pos = this.getCenter(event);
    const {scale} = event;
    const newMapState = this.mapState.zoom({pos, scale});
    return this.updateViewport(newMapState);
  }

  // Default handler for the `pinchend` event.
  _onPinchEnd(event) {
    const newMapState = this.mapState.zoomEnd();
    return this.updateViewport(newMapState, {isDragging: false});
  }

  // Default handler for the `doubletap` event.
  _onDoubleTap(event) {
    const pos = this.getCenter(event);
    const isZoomOut = this.isFunctionKeyPressed(event);

    const newMapState = this.mapState.zoom({pos, scale: isZoomOut ? 0.5 : 2});
    return this.updateViewport(newMapState);
  }
}
