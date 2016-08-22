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
import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import MapGL from './map.react';

function noop() {}

const PUBLIC_MAP_STATE_DEFAULTS = {
  latitude: 0,
  longitude: 0,
  zoom: 11,
  pitch: 0,
  bearing: 0,
  altitude: 1.5
};

function compareProps(refObject, newObject) {
  for (const field in refObject) {
    if (!(field in newObject) || refObject[field] !== newObject[field]) {
      return false;
    }
  }
  return true;
}

const PROP_TYPES = {
  /**
    * `onChangeViewport` callback is fired when the user interacted with the
    * map. The object passed to the callback contains `latitude`,
    * `longitude`, `zoom` and additional information.
    */
  onChangeViewport: PropTypes.func
};

const DEFAULT_PROPS = {
  onChangeViewport: noop
};

@pureRender
export default class StatefulMapGL extends Component {

  constructor(props) {
    super(props);
    this.state = this._getInternalMapState(props);
  }

  // Extract all public map state fields from an object
  _getPublicMapState(props) {
    return {
      ...PUBLIC_MAP_STATE_DEFAULTS,
      latitude: props.latitude,
      longitude: props.longitude,
      zoom: props.zoom,
      pitch: props.pitch,
      bearing: props.bearing,
      altitude: props.altitude
    };
  }

  // Extract all non-public map state fields from an object
  _getInternalMapState(props) {
    return {
      isDragging: props.isDragging || false,
      startDragLngLat: props.startDragLngLat || null,
      startBearing: props.startBearing || null,
      startPitch: props.startPitch || null
    };
  }

  // Save internal props to state
  // Call apps onChangeViewport with public props only
  // Only call app if public props have changed.
  @autobind _onChangeViewport(mapState) {
    // Update state (triggering map redraw) only if internal props changed
    const internalMapState = this._getInternalMapState(mapState);
    if (!compareProps(internalMapState, this.state)) {
      this.setState(internalMapState);
    }

    // Update app (presumably triggering redraw) only if map changed vs props
    const publicMapState = this._getPublicMapState(mapState);
    if (!compareProps(publicMapState, this.props)) {
      this.props.onChangeViewport(publicMapState);
    }
  }

  render() {
    return (
      <MapGL
        { ...this.props }
        { ...this.state }
        onChangeViewport={ this._onChangeViewport }/>
    );
  }
}

StatefulMapGL.propTypes = PROP_TYPES;
StatefulMapGL.defaultProps = DEFAULT_PROPS;
