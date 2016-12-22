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
import EventManager from './event-manager';

import config from './config';
import {mod} from './utils/transform';
import assert from 'assert';

// TODO - expose as
// Note: Max pitch is a hard coded value (not a named constant) in transform.js
const MAX_PITCH = 60;
const PITCH_MOUSE_THRESHOLD = 20;
const PITCH_ACCEL = 1.2;

@pureRender
export default class MapInteractions extends Component {

  static propTypes = {
    /** The latitude of the center of the map. */
    latitude: PropTypes.number.isRequired,
    /** The longitude of the center of the map. */
    longitude: PropTypes.number.isRequired,
    /** The tile zoom level of the map. */
    zoom: PropTypes.number.isRequired,
    /** Specify the bearing of the viewport */
    bearing: React.PropTypes.number,
    /** Specify the pitch of the viewport */
    pitch: React.PropTypes.number,
    /**
      * Specify the altitude of the viewport camera
      * Unit: map heights, default 1.5
      * Non-public API, see https://github.com/mapbox/mapbox-gl-js/issues/1137
      */
    altitude: React.PropTypes.number,
    /** Enables perspective control event handling */
    perspectiveEnabled: PropTypes.bool,
    /**
      * `onChangeViewport` callback is fired when the user interacted with the
      * map. The object passed to the callback contains `latitude`,
      * `longitude` and `zoom` and additional state information.
      */
    onChangeViewport: PropTypes.func,
    /** The width of the map */
    width: PropTypes.number.isRequired,
    /** The height of the map */
    height: PropTypes.number.isRequired,
    /**
      * Is the component currently being dragged. This is used to show/hide the
      * drag cursor. Also used as an optimization in some overlays by preventing
      * rendering while dragging.
      */
    isDragging: PropTypes.bool,
    /**
      * Required to calculate the mouse projection after the first click event
      * during dragging. Where the map is depends on where you first clicked on
      * the map.
      */
    startDragLngLat: PropTypes.array,
    /**
     * Called when the map is clicked. The handler is called with the clicked
     * coordinates (https://www.mapbox.com/mapbox-gl-js/api/#LngLat) and the
     * screen coordinates (https://www.mapbox.com/mapbox-gl-js/api/#PointLike).
     */
    onClick: PropTypes.func,
    /**
      * Called when a feature is clicked on. Uses Mapbox's
      * queryRenderedFeatures API to find features under the pointer:
      * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
      * To query only some of the layers, set the `interactive` property in the
      * layer style to `true`. See Mapbox's style spec
      * https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive
      * If no interactive layers are found (e.g. using Mapbox's default styles),
      * will fall back to query all layers.
      */
    onClickFeatures: PropTypes.func,

    /** Radius to detect features around a clicked point. Defaults to 15. */
    clickRadius: PropTypes.number,

    unproject: PropTypes.func.isRequired
  };

  static defaultProps = {
    bearing: 0,
    pitch: 0,
    altitude: 1.5,
    clickRadius: 15,
    onChangeViewport: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      isHovering: false,
      startDragLngLat: null,
      startBearing: null,
      startPitch: null
    };
  }

  // Calculate a cursor style
  _getCursor() {
    const isInteractive =
      this.props.onChangeViewport ||
      this.props.onClickFeature ||
      this.props.onHoverFeatures;
    if (isInteractive) {
      return this.props.isDragging ?
        config.CURSOR.GRABBING :
        (this.state.isHovering ? config.CURSOR.POINTER : config.CURSOR.GRAB);
    }
    return 'inherit';
  }

  componentDidMount() {
    // this._updateViewport(this.props);
    // this._callOnChangeViewport(map.transform);
  }

  // New props are comin' round the corner!
  componentWillReceiveProps(newProps) {
    const {startDragLngLat} = newProps;
    this.setState({
      startDragLngLat: startDragLngLat && startDragLngLat.slice()
    });
  }

  _updateViewport(opts) {
    return this.props.onChangeViewport({
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      zoom: this.props.zoom,
      bearing: this.props.bearing,
      pitch: this.props.pitch,
      altitude: this.props.altitude,
      ...opts
    });
  }

  // TODO
  // Panning calculation is currently done using an undocumented mapbox function
  // We should have a mapbox-independent implementation of panning
  _calculateNewLngLat({pos, startPos, startDragLngLat}) {
    const xDelta = pos[0] - startPos[0];
    const yDelta = pos[1] - startPos[1];

    return [xDelta, yDelta];
  }

  // Calculates new zoom
  _calculateNewZoom({relativeScale}) {
    const newZoom = this.props.zoom + Math.log2(relativeScale);
    // TODO - check that zoom is within limits
    return newZoom;
  }

  // Calculates a new pitch and bearing from a position (coming from an event)
  _calculateNewPitchAndBearing({pos, startPos, startBearing, startPitch}) {
    const xDelta = pos[0] - startPos[0];
    const yDelta = pos[1] - startPos[1];

    const bearing = startBearing + 180 * xDelta / this.props.width;

    let pitch = startPitch;
    if (yDelta > 0) {
      // Dragging downwards, gradually decrease pitch
      if (Math.abs(this.props.height - startPos[1]) > PITCH_MOUSE_THRESHOLD) {
        const scale = yDelta / (this.props.height - startPos[1]);
        pitch = (1 - scale) * PITCH_ACCEL * startPitch;
      }
    } else if (yDelta < 0) {
      // Dragging upwards, gradually increase pitch
      if (startPos.y > PITCH_MOUSE_THRESHOLD) {
        // Move from 0 to 1 as we drag upwards
        const yScale = 1 - pos[1] / startPos[1];
        // Gradually add until we hit max pitch
        pitch = startPitch + yScale * (MAX_PITCH - startPitch);
      }
    }

    // console.debug(startPitch, pitch);
    return {
      pitch: Math.max(Math.min(pitch, MAX_PITCH), 0),
      bearing
    };
  }

  @autobind _onTouchStart(opts) {
    this._onMouseDown(opts);
  }

  @autobind _onTouchDrag(opts) {
    this._onMouseDrag(opts);
  }

  @autobind _onTouchRotate(opts) {
    this._onMouseRotate(opts);
  }

  @autobind _onTouchEnd(opts) {
    this._onMouseUp(opts);
  }

  @autobind _onTouchTap(opts) {
    this._onMouseClick(opts);
  }

  @autobind _onMouseDown({pos}) {
    this._updateViewport({
      isDragging: true,
      startDragLngLat: this.props.unproject(pos),
      startBearing: this.props.bearing,
      startPitch: this.props.pitch
    });
  }

  @autobind _onMouseDrag({pos}) {
    if (!this.props.onChangeViewport) {
      return;
    }

    // take the start lnglat and put it where the mouse is down.
    assert(this.props.startDragLngLat, '`startDragLngLat` prop is required ' +
      'for mouse drag behavior to calculate where to position the map.');

    this._updateViewport({
      location: this.props.startDragLngLat,
      point: pos,
      isDragging: true
    });
  }

  @autobind _onMouseRotate({pos, startPos}) {
    if (!this.props.onChangeViewport || !this.props.perspectiveEnabled) {
      return;
    }

    const {startBearing, startPitch} = this.props;
    assert(typeof startBearing === 'number',
      '`startBearing` prop is required for mouse rotate behavior');
    assert(typeof startPitch === 'number',
      '`startPitch` prop is required for mouse rotate behavior');

    const {pitch, bearing} = this._calculateNewPitchAndBearing({
      pos,
      startPos,
      startBearing,
      startPitch
    });

    this._updateViewport({
      bearing,
      pitch,
      isDragging: true
    });
  }

  @autobind _onMouseUp(opt) {
    this._updateViewport({
      isDragging: false,
      startDragLngLat: null,
      startBearing: null,
      startPitch: null
    });
  }

  @autobind _onZoom({pos, scale}) {
    this._updateViewport({
      zoom: this._calculateNewZoom({relativeScale: scale}),
      isDragging: true
    });
  }

  @autobind _onZoomEnd() {
    this._updateViewport({isDragging: false});
  }

  // HOVER AND CLICK

  @autobind _onMouseMove({pos}) {
    if (this.props.onHover) {
      const latLong = this.props.unproject(pos);
      this.props.onHover(latLong, pos);
    }

    if (this.props.onHoverFeatures) {
      const features = this.props.getFeatures({pos});
      if (!features.length && this.props.ignoreEmptyFeatures) {
        return;
      }
      this.setState({isHovering: features.length > 0});
      this.props.onHoverFeatures(features);
    }
  }

  @autobind _onMouseClick({pos}) {
    if (this.props.onClick) {
      const latLong = this.props.unproject(pos);
      // TODO - Do we really want to expose a mapbox "Point" in our interface?
      // const point = new Point(...pos);
      this.props.onClick(latLong, pos);
    }

    if (this.props.onClickFeatures) {
      const features = this.props.getFeatures({pos, radius: this.props.clickRadius});
      if (!features.length && this.props.ignoreEmptyFeatures) {
        return;
      }
      this.props.onClickFeatures(features);
    }
  }

  render() {
    const {className, width, height, style} = this.props;
    const mapStyle = {
      ...style,
      width,
      height,
      cursor: this._getCursor()
    };

    // let content = [];
    // if (this.state.isSupported && this.props.onChangeViewport) {
    //   content = (}

    return (
      <div style={{
        ...this.props.style,
        width: this.props.width,
        height: this.props.height,
        position: 'relative',
        cursor: this._getCursor()
      }}>

        <EventManager
          onMouseDown={this._onMouseDown}
          onMouseDrag={this._onMouseDrag}
          onMouseRotate={this._onMouseRotate}
          onMouseUp={this._onMouseUp}
          onMouseMove={this._onMouseMove}
          onMouseClick={this._onMouseClick}
          onTouchStart={this._onTouchStart}
          onTouchDrag={this._onTouchDrag}
          onTouchRotate={this._onTouchRotate}
          onTouchEnd={this._onTouchEnd}
          onTouchTap={this._onTouchTap}
          onZoom={this._onZoom}
          onZoomEnd={this._onZoomEnd}
          width={this.props.width}
          height={this.props.height}>

          <div key="map" ref="mapboxMap" style={mapStyle} className={className}/>

          <div key="overlays" className="overlays" style={{position: 'absolute', left: 0, top: 0}}>

            {this.props.children}

          </div>

        </EventManager>

      </div>
    );
  }
}
