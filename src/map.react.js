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

import mapboxgl from 'mapbox-gl';
import {select} from 'd3-selection';
import Immutable from 'immutable';
import assert from 'assert';

import MapInteractions from './map-interactions.react';
import config from './config';

import diffStyles from './utils/diff-styles';
import {mod, unprojectFromTransform, cloneTransform} from './utils/transform';

// Note: Max pitch is a hard coded value (not a named constant) in transform.js
const MAX_PITCH = 60;
const PITCH_MOUSE_THRESHOLD = 20;
const PITCH_ACCEL = 1.2;

const PROP_TYPES = {
  /**
    * The latitude of the center of the map.
    */
  latitude: PropTypes.number.isRequired,
  /**
    * The longitude of the center of the map.
    */
  longitude: PropTypes.number.isRequired,
  /**
    * The tile zoom level of the map.
    */
  zoom: PropTypes.number.isRequired,
  /**
    * The Mapbox style the component should use. Can either be a string url
    * or a MapboxGL style Immutable.Map object.
    */
  mapStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Immutable.Map)
  ]),
  /**
    * The Mapbox API access token to provide to mapbox-gl-js. This is required
    * when using Mapbox provided vector tiles and styles.
    */
  mapboxApiAccessToken: PropTypes.string,
  /**
    * `onChangeViewport` callback is fired when the user interacted with the
    * map. The object passed to the callback contains `latitude`,
    * `longitude` and `zoom` and additional state information.
    */
  onChangeViewport: PropTypes.func,
  /**
    * The width of the map.
    */
  width: PropTypes.number.isRequired,
  /**
    * The height of the map.
    */
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
    * Called when a feature is hovered over. Features must set the
    * `interactive` property to `true` for this to work properly. see the
    * Mapbox example: https://www.mapbox.com/mapbox-gl-js/example/featuresat/
    * The first argument of the callback will be the array of feature the
    * mouse is over. This is the same response returned from `featuresAt`.
    */
  onHoverFeatures: PropTypes.func,
  /**
    * Defaults to TRUE
    * Set to false to enable onHoverFeatures to be called regardless if
    * there is an actual feature at x, y. This is useful to emulate
    * "mouse-out" behaviors on features.
    */
  ignoreEmptyFeatures: PropTypes.bool,

  /**
    * Show attribution control or not.
    */
  attributionControl: PropTypes.bool,

  /**
    * Called when a feature is clicked on. Features must set the
    * `interactive` property to `true` for this to work properly. see the
    * Mapbox example: https://www.mapbox.com/mapbox-gl-js/example/featuresat/
    * The first argument of the callback will be the array of feature the
    * mouse is over. This is the same response returned from `featuresAt`.
    */
  onClickFeatures: PropTypes.func,

  /**
    * Radius to detect features around a clicked point. Defaults to 15.
    */
  clickRadius: PropTypes.number,

  /**
    * Passed to Mapbox Map constructor which passes it to the canvas context.
    * This is unseful when you want to export the canvas as a PNG.
    */
  preserveDrawingBuffer: PropTypes.bool,

  /**
    * There are still known issues with style diffing. As a temporary stopgap,
    * add the option to prevent style diffing.
    */
  preventStyleDiffing: PropTypes.bool,

  /**
    * Enables perspective control event handling (Command-rotate)
    */
  perspectiveEnabled: PropTypes.bool,

  /**
    * Specify the bearing of the viewport
    */
  bearing: React.PropTypes.number,

  /**
    * Specify the pitch of the viewport
    */
  pitch: React.PropTypes.number,

  /**
    * Specify the altitude of the viewport camera
    * Unit: map heights, default 1.5
    * Non-public API, see https://github.com/mapbox/mapbox-gl-js/issues/1137
    */
  altitude: React.PropTypes.number
};

const DEFAULT_PROPS = {
  mapStyle: 'mapbox://styles/mapbox/light-v8',
  onChangeViewport: null,
  mapboxApiAccessToken: config.DEFAULTS.MAPBOX_API_ACCESS_TOKEN,
  preserveDrawingBuffer: false,
  attributionControl: true,
  ignoreEmptyFeatures: true,
  bearing: 0,
  pitch: 0,
  altitude: 1.5,
  clickRadius: 15
};

@pureRender
export default class MapGL extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      isHovering: false,
      startDragLngLat: null,
      startBearing: null,
      startPitch: null
    };
    mapboxgl.accessToken = props.mapboxApiAccessToken;
  }

  componentDidMount() {
    const mapStyle = this.props.mapStyle instanceof Immutable.Map ?
      this.props.mapStyle.toJS() :
      this.props.mapStyle;
    const map = new mapboxgl.Map({
      container: this.refs.mapboxMap,
      center: [this.props.longitude, this.props.latitude],
      zoom: this.props.zoom,
      pitch: this.props.pitch,
      bearing: this.props.bearing,
      style: mapStyle,
      interactive: false,
      preserveDrawingBuffer: this.props.preserveDrawingBuffer
      // TODO?
      // attributionControl: this.props.attributionControl
    });

    select(map.getCanvas()).style('outline', 'none');

    this._map = map;
    this._updateMapViewport({}, this.props);
    this._callOnChangeViewport(map.transform);
  }

  // New props are comin' round the corner!
  componentWillReceiveProps(newProps) {
    this._updateStateFromProps(this.props, newProps);
    this._updateMapViewport(this.props, newProps);
    this._updateMapStyle(this.props, newProps);
    // Save width/height so that we can check them in componentDidUpdate
    this.setState({
      width: this.props.width,
      height: this.props.height
    });
  }

  componentDidUpdate() {
    // map.resize() reads size from DOM, we need to call after render
    this._updateMapSize(this.state, this.props);
  }

  componentWillUnmount() {
    if (this._map) {
      this._map.remove();
    }
  }

  _cursor() {
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

  _getMap() {
    return this._map;
  }

  _updateStateFromProps(oldProps, newProps) {
    mapboxgl.accessToken = newProps.mapboxApiAccessToken;
    const {startDragLngLat} = newProps;
    this.setState({
      startDragLngLat: startDragLngLat && startDragLngLat.slice()
    });
  }

  // Individually update the maps source and layers that have changed if all
  // other style props haven't changed. This prevents flicking of the map when
  // styles only change sources or layers.
  /* eslint-disable max-statements, complexity */
  _setDiffStyle(prevStyle, nextStyle) {
    const prevKeysMap = prevStyle && styleKeysMap(prevStyle) || {};
    const nextKeysMap = styleKeysMap(nextStyle);
    function styleKeysMap(style) {
      return style.map(() => true).delete('layers').delete('sources').toJS();
    }
    function propsOtherThanLayersOrSourcesDiffer() {
      const prevKeysList = Object.keys(prevKeysMap);
      const nextKeysList = Object.keys(nextKeysMap);
      if (prevKeysList.length !== nextKeysList.length) {
        return true;
      }
      // `nextStyle` and `prevStyle` should not have the same set of props.
      if (nextKeysList.some(
        key => prevStyle.get(key) !== nextStyle.get(key)
        // But the value of one of those props is different.
      )) {
        return true;
      }
      return false;
    }

    const map = this._getMap();

    if (!prevStyle || propsOtherThanLayersOrSourcesDiffer()) {
      map.setStyle(nextStyle.toJS());
      return;
    }

    const {sourcesDiff, layersDiff} = diffStyles(prevStyle, nextStyle);

    // TODO: It's rather difficult to determine style diffing in the presence
    // of refs. For now, if any style update has a ref, fallback to no diffing.
    // We can come back to this case if there's a solid usecase.
    if (layersDiff.updates.some(node => node.layer.get('ref'))) {
      map.setStyle(nextStyle.toJS());
      return;
    }

    for (const enter of sourcesDiff.enter) {
      map.addSource(enter.id, enter.source.toJS());
    }
    for (const update of sourcesDiff.update) {
      map.removeSource(update.id);
      map.addSource(update.id, update.source.toJS());
    }
    for (const exit of sourcesDiff.exit) {
      map.removeSource(exit.id);
    }
    for (const exit of layersDiff.exiting) {
      if (map.style.getLayer(exit.id)) {
        map.removeLayer(exit.id);
      }
    }
    for (const update of layersDiff.updates) {
      if (!update.enter) {
        // This is an old layer that needs to be updated. Remove the old layer
        // with the same id and add it back again.
        map.removeLayer(update.id);
      }
      map.addLayer(update.layer.toJS(), update.before);
    }
  }
  /* eslint-enable max-statements, complexity */

  _updateMapStyle(oldProps, newProps) {
    const mapStyle = newProps.mapStyle;
    const oldMapStyle = oldProps.mapStyle;
    if (mapStyle !== oldMapStyle) {
      if (mapStyle instanceof Immutable.Map) {
        if (this.props.preventStyleDiffing) {
          this._getMap().setStyle(mapStyle.toJS());
        } else {
          this._setDiffStyle(oldMapStyle, mapStyle);
        }
      } else {
        this._getMap().setStyle(mapStyle);
      }
    }
  }

  _updateMapViewport(oldProps, newProps) {
    const viewportChanged =
      newProps.latitude !== oldProps.latitude ||
      newProps.longitude !== oldProps.longitude ||
      newProps.zoom !== oldProps.zoom ||
      newProps.pitch !== oldProps.pitch ||
      newProps.zoom !== oldProps.bearing ||
      newProps.altitude !== oldProps.altitude;

    const map = this._getMap();

    if (viewportChanged) {
      map.jumpTo({
        center: [newProps.longitude, newProps.latitude],
        zoom: newProps.zoom,
        bearing: newProps.bearing,
        pitch: newProps.pitch
      });

      // TODO - jumpTo doesn't handle altitude
      if (newProps.altitude !== oldProps.altitude) {
        map.transform.altitude = newProps.altitude;
      }
    }
  }

  // Note: needs to be called after render (e.g. in componentDidUpdate)
  _updateMapSize(oldProps, newProps) {
    const sizeChanged =
      oldProps.width !== newProps.width || oldProps.height !== newProps.height;

    if (sizeChanged) {
      const map = this._getMap();
      map.resize();
      this._callOnChangeViewport(map.transform);
    }
  }

  _calculateNewPitchAndBearing({pos, startPos, startBearing, startPitch}) {
    const xDelta = pos.x - startPos.x;
    const bearing = startBearing + 180 * xDelta / this.props.width;

    let pitch = startPitch;
    const yDelta = pos.y - startPos.y;
    if (yDelta > 0) {
      // Dragging downwards, gradually decrease pitch
      if (Math.abs(this.props.height - startPos.y) > PITCH_MOUSE_THRESHOLD) {
        const scale = yDelta / (this.props.height - startPos.y);
        pitch = (1 - scale) * PITCH_ACCEL * startPitch;
      }
    } else if (yDelta < 0) {
      // Dragging upwards, gradually increase pitch
      if (startPos.y > PITCH_MOUSE_THRESHOLD) {
        // Move from 0 to 1 as we drag upwards
        const yScale = 1 - pos.y / startPos.y;
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

   // Helper to call props.onChangeViewport
  _callOnChangeViewport(transform, opts = {}) {
    if (this.props.onChangeViewport) {
      this.props.onChangeViewport({
        latitude: transform.center.lat,
        longitude: mod(transform.center.lng + 180, 360) - 180,
        zoom: transform.zoom,
        pitch: transform.pitch,
        bearing: mod(transform.bearing + 180, 360) - 180,

        isDragging: this.props.isDragging,
        startDragLngLat: this.props.startDragLngLat,
        startBearing: this.props.startBearing,
        startPitch: this.props.startPitch,

        ...opts
      });
    }
  }

  @autobind _onTouchStart({pos}) {
    this._onMouseDown({pos});
  }

  @autobind _onMouseDown({pos}) {
    const map = this._getMap();
    const lngLat = unprojectFromTransform(map.transform, pos);
    this._callOnChangeViewport(map.transform, {
      isDragging: true,
      startDragLngLat: [lngLat.lng, lngLat.lat],
      startBearing: map.transform.bearing,
      startPitch: map.transform.pitch
    });
  }

  @autobind _onTouchDrag({pos}) {
    this._onMouseDrag({pos});
  }

  @autobind _onMouseDrag({pos}) {
    if (!this.props.onChangeViewport) {
      return;
    }

    // take the start lnglat and put it where the mouse is down.
    assert(this.props.startDragLngLat, '`startDragLngLat` prop is required ' +
      'for mouse drag behavior to calculate where to position the map.');

    const map = this._getMap();
    const transform = cloneTransform(map.transform);
    transform.setLocationAtPoint(this.props.startDragLngLat, pos);
    this._callOnChangeViewport(transform, {
      isDragging: true
    });
  }

  @autobind _onTouchRotate({pos, startPos}) {
    this._onMouseRotate({pos, startPos});
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

    const map = this._getMap();

    const {pitch, bearing} = this._calculateNewPitchAndBearing({
      pos,
      startPos,
      startBearing,
      startPitch
    });

    const transform = cloneTransform(map.transform);
    transform.bearing = bearing;
    transform.pitch = pitch;

    this._callOnChangeViewport(transform, {
      isDragging: true
    });
  }

  @autobind _onMouseMove(opt) {
    const map = this._getMap();
    const pos = opt.pos;
    if (!this.props.onHoverFeatures) {
      return;
    }
    const features = map.queryRenderedFeatures([pos.x, pos.y]);
    if (!features.length && this.props.ignoreEmptyFeatures) {
      return;
    }
    this.setState({isHovering: features.length > 0});
    this.props.onHoverFeatures(features);
  }

  @autobind _onTouchEnd(opt) {
    this._onMouseUp(opt);
  }

  @autobind _onMouseUp(opt) {
    const map = this._getMap();
    this._callOnChangeViewport(map.transform, {
      isDragging: false,
      startDragLngLat: null,
      startBearing: null,
      startPitch: null
    });

    if (!this.props.onClickFeatures) {
      return;
    }

    const pos = opt.pos;

    // Radius enables point features, like marker symbols, to be clicked.
    const size = this.props.clickRadius;
    const bbox = [[pos.x - size, pos.y - size], [pos.x + size, pos.y + size]];
    const features = map.queryRenderedFeatures(bbox);
    if (!features.length && this.props.ignoreEmptyFeatures) {
      return;
    }
    this.props.onClickFeatures(features);
  }

  @autobind _onZoom({pos, scale}) {
    const map = this._getMap();
    const transform = cloneTransform(map.transform);
    const around = unprojectFromTransform(transform, pos);
    transform.zoom = transform.scaleZoom(map.transform.scale * scale);
    transform.setLocationAtPoint(around, pos);
    this._callOnChangeViewport(transform, {
      isDragging: true
    });
  }

  @autobind _onZoomEnd() {
    const map = this._getMap();
    this._callOnChangeViewport(map.transform, {
      isDragging: false
    });
  }

  render() {
    const {className, width, height, style} = this.props;
    const mapStyle = {
      ...style,
      width,
      height,
      cursor: this._cursor()
    };

    let content = [
      <div key="map" ref="mapboxMap"
        style={ mapStyle } className={ className }/>,
      <div key="overlays" className="overlays"
        style={ {position: 'absolute', left: 0, top: 0} }>
        { this.props.children }
      </div>
    ];

    if (this.props.onChangeViewport) {
      content = (
        <MapInteractions
          onMouseDown ={ this._onMouseDown }
          onMouseDrag ={ this._onMouseDrag }
          onMouseRotate ={ this._onMouseRotate }
          onMouseUp ={ this._onMouseUp }
          onMouseMove ={ this._onMouseMove }
          onTouchStart ={ this._onTouchStart }
          onTouchDrag ={ this._onTouchDrag }
          onTouchRotate ={ this._onTouchRotate }
          onTouchEnd ={ this._onTouchEnd }
          onZoom ={ this._onZoom }
          onZoomEnd ={ this._onZoomEnd }
          width ={ this.props.width }
          height ={ this.props.height }>

          { content }

        </MapInteractions>
      );
    }

    return (
      <div
        style={ {
          ...this.props.style,
          width: this.props.width,
          height: this.props.height,
          position: 'relative'
        } }>

        { content }

      </div>
    );
  }
}

MapGL.propTypes = PROP_TYPES;
MapGL.defaultProps = DEFAULT_PROPS;
