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
import assert from 'assert';
import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';
import d3 from 'd3';
import Immutable from 'immutable';
import mapboxgl, {LngLatBounds, Point} from 'mapbox-gl';

// NOTE: Transform is not a public API so we should be careful to always lock
// down mapbox-gl to a specific major, minor, and patch version.
import Transform from 'mapbox-gl/js/geo/transform';

import config from './config';
import MapInteractions from './map-interactions.react';

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
    * map. The object passed to the callback containers `latitude`,
    * `longitude` and `zoom` information.
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
    * Passed to Mapbox Map constructor which passes it to the canvas context.
    * This is unseful when you want to export the canvas as a PNG.
    */
  preserveDrawingBuffer: PropTypes.bool,

  /**
    * There are still known issues with style diffing. As a temporary stopgap,
    * add the option to prevent style diffing.
    */
  preventStyleDiffing: PropTypes.bool
};

const DEFAULT_PROPS = {
  mapStyle: 'mapbox://styles/mapbox/light-v8',
  onChangeViewport: null,
  mapboxApiAccessToken: config.DEFAULTS.MAPBOX_API_ACCESS_TOKEN,
  preserveDrawingBuffer: false,
  attributionControl: true,
  ignoreEmptyFeatures: true
};

export default class MapGL extends Component {

  constructor(props) {
    super(props);
    const defaultState = {};
    const stateChanges = this._updateStateFromProps(defaultState, this.props);
    this.state = {...defaultState, ...stateChanges};
  }

  componentDidMount() {
    const mapStyle = this.props.mapStyle instanceof Immutable.Map ?
      this.props.mapStyle.toJS() :
      this.props.mapStyle;

    const map = new mapboxgl.Map({
      container: this.refs.mapboxMap,
      center: [this.state.longitude, this.state.latitude],
      zoom: this.state.zoom,
      style: mapStyle,
      interactive: false,
      preserveDrawingBuffer: this.props.preserveDrawingBuffer
      // ,
      // attributionControl: this.props.attributionControl
    });

    d3.select(map.getCanvas()).style('outline', 'none');

    this._map = map;
    this._updateMapViewport();
  }

  // New props are comin' round the corner!
  componentWillReceiveProps(newProps) {
    const stateChanges = this._updateStateFromProps(this.state, newProps);
    this.setState(stateChanges);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let allTheSame = Object.keys(nextProps).reduce((all, prop) => {
      const same = nextProps[prop] === this.props[prop];
      return all && same;
    }, true);

    if (!allTheSame) {
      return true;
    }

    allTheSame = Object.keys(nextState).reduce((all, prop) => {
      const same = nextState[prop] === this.state[prop];
      return all && same;
    }, true);

    return !allTheSame;
  }

  componentDidUpdate() {
    this._updateMapViewport();
    this._updateMapStyle();
  }

  componentWillUnmount() {
    if (this._map) {
      this._map.remove();
    }
  }

  _cursor() {
    const isInteractive = this.props.onChangeViewport ||
      this.props.onClickFeature ||
      this.props.onHoverFeatures;
    if (isInteractive) {
      return this.props.isDragging ?
        config.CURSOR.GRABBING : config.CURSOR.GRAB;
    }
    return 'inherit';
  }

  // Use props to create an object of state changes.
  _updateStateFromProps(state, props) {

    mapboxgl.accessToken = props.mapboxApiAccessToken;

    const stateChanges = {
      latitude: props.latitude,
      longitude: props.longitude,
      zoom: props.zoom,
      width: props.width,
      height: props.height,
      mapStyle: props.mapStyle,
      startDragLngLat: props.startDragLngLat && props.startDragLngLat.slice(),

      prevLatitude: state.latitude,
      prevLongitude: state.longitude,
      prevZoom: state.zoom,
      prevWidth: state.width,
      prevHeight: state.height,
      prevMapStyle: state.mapStyle
    };

    return stateChanges;
  }

  _getMap() {
    return this._map;
  }

  _updateMapViewport() {
    const state = this.state;
    if (state.latitude !== state.prevLatitude ||
      state.longitude !== state.prevLongitude ||
      state.zoom !== state.prevZoom
    ) {
      this._getMap().jumpTo({
        center: [state.longitude, state.latitude],
        zoom: state.zoom,
        bearing: 0,
        pitch: 0
      });
    }
    if (state.width !== state.prevWidth || state.height !== state.prevHeight) {
      this._resizeMap();
    }
  }

  _resizeMap() {
    const map = this._getMap();
    map.resize();
  }

  /* eslint-disable max-statements */
  _diffSources(prevStyle, nextStyle) {
    const prevSources = prevStyle.get('sources');
    const nextSources = nextStyle.get('sources');
    const enter = [];
    const update = [];
    const exit = [];
    const prevIds = prevSources.keySeq().toArray();
    const nextIds = nextSources.keySeq().toArray();
    for (const id of prevIds) {
      const nextSource = nextSources.get(id);
      if (nextSource) {
        if (!nextSource.equals(prevSources.get(id))) {
          update.push({id, source: nextSources.get(id)});
        }
      } else {
        exit.push({id, source: prevSources.get(id)});
      }
    }
    for (const id of nextIds) {
      const prevSource = prevSources.get(id);
      if (!prevSource) {
        enter.push({id, source: nextSources.get(id)});
      }
    }
    return {enter, update, exit};
  }
  /* eslint-enable max-statements */

  _diffLayers(prevStyle, nextStyle) {
    const prevLayers = prevStyle.get('layers');
    const nextLayers = nextStyle.get('layers');
    const updates = [];
    const exiting = [];
    const prevMap = {};
    const nextMap = {};
    nextLayers.forEach((layer, index) => {
      const id = layer.get('id');
      const layerImBehind = nextLayers.get(index + 1);
      nextMap[id] = {
        layer,
        id,
        // The `id` of the layer before this one.
        before: layerImBehind ? layerImBehind.get('id') : null,
        enter: true
      };
    });
    prevLayers.forEach((layer, index) => {
      const id = layer.get('id');
      const layerImBehind = prevLayers.get(index + 1);
      prevMap[id] = {
        layer,
        id,
        before: layerImBehind ? layerImBehind.get('id') : null
      };
      if (nextMap[id]) {
        // Not a new layer.
        nextMap[id].enter = false;
      } else {
        // This layer is being removed.
        exiting.push(prevMap[id]);
      }
    });
    for (const layer of nextLayers.reverse()) {
      const id = layer.get('id');
      if (
        !prevMap[id] ||
        !prevMap[id].layer.equals(nextMap[id].layer) ||
        prevMap[id].before !== nextMap[id].before
      ) {
        // This layer is being changed.
        updates.push(nextMap[id]);
      }
    }
    return {updates, exiting};
  }

  // Individually update the maps source and layers that have changed if all
  // other style props haven't changed. This prevents flicking of the map when
  // styles only change sources or layers.
  _setDiffStyle(prevStyle, nextStyle) {
    const map = this._getMap();
    const prevKeysMap = prevStyle && styleKeysMap(prevStyle) || {};
    const nextKeysMap = styleKeysMap(nextStyle);
    function styleKeysMap(style) {
      return style.map(() => {
        return true;
      }).delete('layers').delete('sources').toJS();
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

    if (!prevStyle || propsOtherThanLayersOrSourcesDiffer()) {
      map.setStyle(nextStyle.toJS());
      return;
    }

    const sourcesDiff = this._diffSources(prevStyle, nextStyle);
    const layersDiff = this._diffLayers(prevStyle, nextStyle);

    // TODO: It's rather difficult to determine style diffing in the presence
    // of refs. For now, if any style update has a ref, fallback to no diffing.
    // We can come back to this case if there's a solid usecase.
    if (layersDiff.updates.some(node => node.layer.get('ref'))) {
      map.setStyle(nextStyle.toJS());
      return;
    }

    map.batch(batch => {
      for (const enter of sourcesDiff.enter) {
        batch.addSource(enter.id, enter.source.toJS());
      }
      for (const update of sourcesDiff.update) {
        batch.removeSource(update.id);
        batch.addSource(update.id, update.source.toJS());
      }
      for (const exit of sourcesDiff.exit) {
        batch.removeSource(exit.id);
      }
      for (const exit of layersDiff.exiting) {
        if (map.style.getLayer(exit.id)) {
          batch.removeLayer(exit.id);
        }
      }
      for (const update of layersDiff.updates) {
        if (!update.enter) {
          // This is an old layer that needs to be updated. Remove the old layer
          // with the same id and add it back again.
          batch.removeLayer(update.id);
        }
        batch.addLayer(update.layer.toJS(), update.before);
      }
    });
  }

  _updateMapStyle() {
    const mapStyle = this.state.mapStyle;
    if (mapStyle !== this.state.prevMapStyle) {
      if (mapStyle instanceof Immutable.Map) {
        if (this.props.preventStyleDiffing) {
          this._getMap().setStyle(mapStyle.toJS());
        } else {
          this._setDiffStyle(this.state.prevMapStyle, mapStyle);
        }
      } else {
        this._getMap().setStyle(mapStyle);
      }
    }
  }

  @autobind _onChangeViewport(changes) {
    const map = this._getMap();
    const center = map.getCenter();
    changes = {
      latitude: center.lat,
      longitude: center.lng,
      zoom: map.getZoom(),
      isDragging: this.props.isDragging,
      startDragLngLat: this.state.startDragLngLat,
      ...changes
    };
    changes.longitude = mod(changes.longitude + 180, 360) - 180;
    this.props.onChangeViewport(changes);
  }

  @autobind _onMouseDown(opt) {
    const map = this._getMap();
    const lngLat = unprojectFromTransform(map.transform, opt.pos);
    this._onChangeViewport({
      isDragging: true,
      startDragLngLat: [lngLat.lng, lngLat.lat]
    });
  }

  @autobind _onMouseDrag(opt) {
    if (!this.props.onChangeViewport) {
      return;
    }
    const p2 = opt.pos;
    const map = this._getMap();
    // take the start lnglat and put it where the mouse is down.
    const transform = cloneTransform(map.transform);
    assert(this.state.startDragLngLat, '`startDragLngLat` prop is required ' +
      'for mouse drag behavior to calculate where to position the map.');
    transform.setLocationAtPoint(this.state.startDragLngLat, p2);
    this._onChangeViewport({
      latitude: transform.center.lat,
      longitude: transform.center.lng,
      zoom: transform.zoom,
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
    this.props.onHoverFeatures(features);
  }

  @autobind _onMouseUp(opt) {
    const map = this._getMap();
    const transform = cloneTransform(map.transform);

    this._onChangeViewport({
      latitude: transform.center.lat,
      longitude: transform.center.lng,
      zoom: transform.zoom,
      isDragging: false
    });

    if (!this.props.onClickFeatures) {
      return;
    }

    const pos = opt.pos;

    // Radius enables point features, like marker symbols, to be clicked.
    const size = 15;
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
    this._onChangeViewport({
      latitude: transform.center.lat,
      longitude: transform.center.lng,
      zoom: transform.zoom,
      isDragging: true
    });
  }

  @autobind _onZoomEnd() {
    this._onChangeViewport({isDragging: false});
  }

  render() {
    const {props} = this;
    const {className} = this.props;
    const style = {
      ...props.style,
      width: props.width,
      height: props.height,
      cursor: this._cursor()
    };

    const transform = new Transform();
    transform.width = props.width;
    transform.height = props.height;
    transform.zoom = this.props.zoom;
    transform.center.lat = this.props.latitude;
    transform.center.lng = this.props.longitude;

    let content = [
      <div key="map" ref="mapboxMap" style={ style } className={ className }/>,
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
          onMouseUp ={ this._onMouseUp }
          onMouseMove ={ this._onMouseMove }
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

export function fitBounds(width, height, _bounds, options) {
  const bounds = new LngLatBounds([_bounds[0].reverse(), _bounds[1].reverse()]);
  options = options || {};
  const padding = typeof options.padding === 'undefined' ? 0 : options.padding;
  const offset = Point.convert([0, 0]);
  const tr = new Transform();
  tr.width = width;
  tr.height = height;
  const nw = tr.project(bounds.getNorthWest());
  const se = tr.project(bounds.getSouthEast());
  const size = se.sub(nw);
  const scaleX = (tr.width - padding * 2 - Math.abs(offset.x) * 2) / size.x;
  const scaleY = (tr.height - padding * 2 - Math.abs(offset.y) * 2) / size.y;

  const center = tr.unproject(nw.add(se).div(2));
  const zoom = tr.scaleZoom(tr.scale * Math.min(scaleX, scaleY));
  return {
    latitude: center.lat,
    longitude: center.lng,
    zoom
  };
}

function mod(value, divisor) {
  const modulus = value % divisor;
  return modulus < 0 ? divisor + modulus : modulus;
}

function unprojectFromTransform(transform, point) {
  return transform.pointLocation(Point.convert(point));
}

function cloneTransform(original) {
  const transform = new Transform(original._minZoom, original._maxZoom);
  transform.latRange = original.latRange;
  transform.width = original.width;
  transform.height = original.height;
  transform.zoom = original.zoom;
  transform.center = original.center;
  transform.angle = original.angle;
  transform.altitude = original.altitude;
  transform.pitch = original.pitch;
  return transform;
}

MapGL.propTypes = PROP_TYPES;
MapGL.defaultProps = DEFAULT_PROPS;
