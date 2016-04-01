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
'use strict';

var assert = require('assert');
var React = require('react');
var r = require('r-dom');
var d3 = require('d3');
var assign = require('object-assign');
var Immutable = require('immutable');
var mapboxgl = require('mapbox-gl');
var LngLatBounds = mapboxgl.LngLatBounds;
var Point = mapboxgl.Point;

// NOTE: Transform is not a public API so we should be careful to always lock
// down mapbox-gl to a specific major, minor, and patch version.
var Transform = require('mapbox-gl/js/geo/transform');

var config = require('./config');
var MapInteractions = require('./map-interactions.react');

function mod(value, divisor) {
  var modulus = value % divisor;
  return modulus < 0 ? divisor + modulus : modulus;
}

function unprojectFromTransform(transform, point) {
  return transform.pointLocation(Point.convert(point));
}

function cloneTransform(original) {
  var transform = new Transform(original._minZoom, original._maxZoom);
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

var MapGL = React.createClass({

  displayName: 'MapGL',

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    var allTheSame = Object.keys(nextProps).reduce(function reduce(all, prop) {
      var same = nextProps[prop] === this.props[prop];
      return all && same;
    }.bind(this), true);

    if (!allTheSame) {
      return true;
    }

    allTheSame = Object.keys(nextState).reduce(function reduce(all, prop) {
      var same = nextState[prop] === this.state[prop];
      return all && same;
    }.bind(this), true);

    return !allTheSame;
  },

  propTypes: {
    /**
      * The latitude of the center of the map.
      */
    latitude: React.PropTypes.number.isRequired,
    /**
      * The longitude of the center of the map.
      */
    longitude: React.PropTypes.number.isRequired,
    /**
      * The tile zoom level of the map.
      */
    zoom: React.PropTypes.number.isRequired,
    /**
      * The Mapbox style the component should use. Can either be a string url
      * or a MapboxGL style Immutable.Map object.
      */
    mapStyle: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.instanceOf(Immutable.Map)
    ]),
    /**
      * The Mapbox API access token to provide to mapbox-gl-js. This is required
      * when using Mapbox provided vector tiles and styles.
      */
    mapboxApiAccessToken: React.PropTypes.string,
    /**
      * `onChangeViewport` callback is fired when the user interacted with the
      * map. The object passed to the callback containers `latitude`,
      * `longitude` and `zoom` information.
      */
    onChangeViewport: React.PropTypes.func,
    /**
      * The width of the map.
      */
    width: React.PropTypes.number.isRequired,
    /**
      * The height of the map.
      */
    height: React.PropTypes.number.isRequired,
    /**
      * Is the component currently being dragged. This is used to show/hide the
      * drag cursor. Also used as an optimization in some overlays by preventing
      * rendering while dragging.
      */
    isDragging: React.PropTypes.bool,
    /**
      * Required to calculate the mouse projection after the first click event
      * during dragging. Where the map is depends on where you first clicked on
      * the map.
      */
    startDragLngLat: React.PropTypes.array,
    /**
      * Called when a feature is hovered over. Features must set the
      * `interactive` property to `true` for this to work properly. see the
      * Mapbox example: https://www.mapbox.com/mapbox-gl-js/example/featuresat/
      * The first argument of the callback will be the array of feature the
      * mouse is over. This is the same response returned from `featuresAt`.
      */
    onHoverFeatures: React.PropTypes.func,
    /**
      * Defaults to TRUE
      * Set to false to enable onHoverFeatures to be called regardless if
      * there is an actual feature at x, y. This is useful to emulate
      * "mouse-out" behaviors on features.
      */
    ignoreEmptyFeatures: React.PropTypes.bool,

    /**
      * Show attribution control or not.
      */
    attributionControl: React.PropTypes.bool,

    /**
      * Called when a feature is clicked on. Features must set the
      * `interactive` property to `true` for this to work properly. see the
      * Mapbox example: https://www.mapbox.com/mapbox-gl-js/example/featuresat/
      * The first argument of the callback will be the array of feature the
      * mouse is over. This is the same response returned from `featuresAt`.
      */
    onClickFeatures: React.PropTypes.func,

    /**
      * Passed to Mapbox Map constructor which passes it to the canvas context.
      * This is unseful when you want to export the canvas as a PNG.
      */
    preserveDrawingBuffer: React.PropTypes.bool,

    /**
      * There are still known issues with style diffing. As a temporary stopgap,
      * add the option to prevent style diffing.
      */
    preventStyleDiffing: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      mapStyle: 'mapbox://styles/mapbox/light-v8',
      onChangeViewport: null,
      mapboxApiAccessToken: config.DEFAULTS.MAPBOX_API_ACCESS_TOKEN,
      preserveDrawingBuffer: false,
      attributionControl: true,
      ignoreEmptyFeatures: true
    };
  },

  getInitialState: function getInitialState() {
    var defaultState = {};
    var stateChanges = this._updateStateFromProps(defaultState, this.props);
    var state = assign({}, defaultState, stateChanges);
    return state;
  },

  // New props are comin' round the corner!
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    var stateChanges = this._updateStateFromProps(this.state, newProps);
    this.setState(stateChanges);
  },

  _cursor: function _cursor() {
    var isInteractive = this.props.onChangeViewport ||
      this.props.onClickFeature ||
      this.props.onHoverFeatures;
    if (isInteractive) {
      return this.props.isDragging ?
        config.CURSOR.GRABBING : config.CURSOR.GRAB;
    }
    return 'inherit';
  },

  // Use props to create an object of state changes.
  _updateStateFromProps: function _updateStateFromProps(state, props) {
    var stateChanges = {
      latitude: props.latitude,
      longitude: props.longitude,
      zoom: props.zoom,
      width: props.width,
      height: props.height,
      mapStyle: props.mapStyle,
      startDragLngLat: props.startDragLngLat && props.startDragLngLat.slice()
    };

    assign(stateChanges, {
      prevLatitude: state.latitude,
      prevLongitude: state.longitude,
      prevZoom: state.zoom,
      prevWidth: state.width,
      prevHeight: state.height,
      prevMapStyle: state.mapStyle
    });

    mapboxgl.accessToken = props.mapboxApiAccessToken;

    return stateChanges;
  },

  _onChangeViewport: function _onChangeViewport(_changes) {
    var map = this._getMap();
    var center = map.getCenter();
    var changes = assign({
      latitude: center.lat,
      longitude: center.lng,
      zoom: map.getZoom(),
      isDragging: this.props.isDragging,
      startDragLngLat: this.state.startDragLngLat
    }, _changes);
    changes.longitude = mod(changes.longitude + 180, 360) - 180;
    this.props.onChangeViewport(changes);
  },

  _getMap: function _getMap() {
    return this._map;
  },

  componentDidMount: function componentDidMount() {
    var mapStyle;
    if (this.props.mapStyle instanceof Immutable.Map) {
      mapStyle = this.props.mapStyle.toJS();
    } else {
      mapStyle = this.props.mapStyle;
    }
    var map = new mapboxgl.Map({
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
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this._map) {
      this._map.remove();
    }
  },

  _updateMapViewport: function _updateMapViewport() {
    var state = this.state;
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
  },

  _resizeMap: function _resizeMap() {
    var map = this._getMap();
    map.resize();
  },

  _diffSources: function _diffSources(prevStyle, nextStyle) {
    var prevSources = prevStyle.get('sources');
    var nextSources = nextStyle.get('sources');
    var enter = [];
    var update = [];
    var exit = [];
    var prevIds = prevSources.keySeq().toArray();
    var nextIds = nextSources.keySeq().toArray();
    prevIds.forEach(function each(id) {
      var nextSource = nextSources.get(id);
      if (nextSource) {
        if (!nextSource.equals(prevSources.get(id))) {
          update.push({id: id, source: nextSources.get(id)});
        }
      } else {
        exit.push({id: id, source: prevSources.get(id)});
      }
    });
    nextIds.forEach(function each(id) {
      var prevSource = prevSources.get(id);
      if (!prevSource) {
        enter.push({id: id, source: nextSources.get(id)});
      }
    });
    return {enter: enter, update: update, exit: exit};
  },

  _diffLayers: function _diffLayers(prevStyle, nextStyle) {
    var prevLayers = prevStyle.get('layers');
    var nextLayers = nextStyle.get('layers');
    var updates = [];
    var exiting = [];
    var prevMap = {};
    var nextMap = {};
    nextLayers.forEach(function map(layer, index) {
      var id = layer.get('id');
      var layerImBehind = nextLayers.get(index + 1);
      nextMap[id] = {
        layer: layer,
        id: id,
        // The `id` of the layer before this one.
        before: layerImBehind ? layerImBehind.get('id') : null,
        enter: true
      };
    });
    prevLayers.forEach(function map(layer, index) {
      var id = layer.get('id');
      var layerImBehind = prevLayers.get(index + 1);
      prevMap[id] = {
        layer: layer,
        id: id,
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
    nextLayers.reverse().forEach(function map(layer) {
      var id = layer.get('id');
      if (
        !prevMap[id] ||
        !prevMap[id].layer.equals(nextMap[id].layer) ||
        prevMap[id].before !== nextMap[id].before
      ) {
        // This layer is being changed.
        updates.push(nextMap[id]);
      }
    });
    return {updates: updates, exiting: exiting};
  },

  // Individually update the maps source and layers that have changed if all
  // other style props haven't changed. This prevents flicking of the map when
  // styles only change sources or layers.
  _setDiffStyle: function _setDiffStyle(prevStyle, nextStyle) {
    var map = this._getMap();
    var prevKeysMap = prevStyle && styleKeysMap(prevStyle) || {};
    var nextKeysMap = styleKeysMap(nextStyle);
    function styleKeysMap(style) {
      return style.map(function _map() {
        return true;
      }).delete('layers').delete('sources').toJS();
    }
    function propsOtherThanLayersOrSourcesDiffer() {
      var prevKeysList = Object.keys(prevKeysMap);
      var nextKeysList = Object.keys(nextKeysMap);
      if (prevKeysList.length !== nextKeysList.length) {
        return true;
      }
      // `nextStyle` and `prevStyle` should not have the same set of props.
      if (nextKeysList.some(function forEach(key) {
        // But the value of one of those props is different.
        return prevStyle.get(key) !== nextStyle.get(key);
      })) {
        return true;
      }
      return false;
    }

    if (!prevStyle || propsOtherThanLayersOrSourcesDiffer()) {
      map.setStyle(nextStyle.toJS());
      return;
    }

    var sourcesDiff = this._diffSources(prevStyle, nextStyle);
    var layersDiff = this._diffLayers(prevStyle, nextStyle);

    // TODO: It's rather difficult to determine style diffing in the presence
    // of refs. For now, if any style update has a ref, fallback to no diffing.
    // We can come back to this case if there's a solid usecase.
    if (layersDiff.updates.some(function updatedNodeHasRef(node) {
      return node.layer.get('ref');
    })) {
      map.setStyle(nextStyle.toJS());
      return;
    }

    map.batch(function batchStyleUpdates(batch) {
      sourcesDiff.enter.forEach(function each(enter) {
        batch.addSource(enter.id, enter.source.toJS());
      });
      sourcesDiff.update.forEach(function each(update) {
        batch.removeSource(update.id);
        batch.addSource(update.id, update.source.toJS());
      });
      sourcesDiff.exit.forEach(function each(exit) {
        batch.removeSource(exit.id);
      });
      layersDiff.exiting.forEach(function forEach(exit) {
        if (map.style.getLayer(exit.id)) {
          batch.removeLayer(exit.id);
        }
      });
      layersDiff.updates.forEach(function forEach(update) {
        if (!update.enter) {
          // This is an old layer that needs to be updated. Remove the old layer
          // with the same id and add it back again.
          batch.removeLayer(update.id);
        }
        batch.addLayer(update.layer.toJS(), update.before);
      });
    });
  },

  _updateMapStyle: function _updateMapStyle() {
    var mapStyle = this.state.mapStyle;
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
  },

  componentDidUpdate: function componentDidUpdate() {
    this._updateMapViewport();
    this._updateMapStyle();
  },

  _onMouseDown: function _onMouseDown(opt) {
    var map = this._getMap();
    var lngLat = unprojectFromTransform(map.transform, opt.pos);
    this._onChangeViewport({
      isDragging: true,
      startDragLngLat: [lngLat.lng, lngLat.lat]
    });
  },

  _onMouseDrag: function _onMouseDrag(opt) {
    if (!this.props.onChangeViewport) {
      return;
    }
    var p2 = opt.pos;
    var map = this._getMap();
    // take the start lnglat and put it where the mouse is down.
    var transform = cloneTransform(map.transform);
    assert(this.state.startDragLngLat, '`startDragLngLat` prop is required ' +
      'for mouse drag behavior to calculate where to position the map.');
    transform.setLocationAtPoint(this.state.startDragLngLat, p2);
    this._onChangeViewport({
      latitude: transform.center.lat,
      longitude: transform.center.lng,
      zoom: transform.zoom,
      isDragging: true
    });
  },

  _onMouseMove: function _onMouseMove(opt) {
    var map = this._getMap();
    var pos = opt.pos;
    if (!this.props.onHoverFeatures) {
      return;
    }
    var features = map.queryRenderedFeatures([pos.x, pos.y]);
    if (!features.length && this.props.ignoreEmptyFeatures) {
      return;
    }
    this.props.onHoverFeatures(features);
  },

  _onMouseUp: function _onMouseUp(opt) {
    var map = this._getMap();
    var transform = cloneTransform(map.transform);

    this._onChangeViewport({
      latitude: transform.center.lat,
      longitude: transform.center.lng,
      zoom: transform.zoom,
      isDragging: false
    });

    if (!this.props.onClickFeatures) {
      return;
    }

    var pos = opt.pos;

    // Radius enables point features, like marker symbols, to be clicked.
    var size = 15;
    var bbox = [[pos.x - size, pos.y - size], [pos.x + size, pos.y + size]];
    var features = map.queryRenderedFeatures(bbox);
    if (!features.length && this.props.ignoreEmptyFeatures) {
      return;
    }
    this.props.onClickFeatures(features);
  },

  _onZoom: function _onZoom(opt) {
    var map = this._getMap();
    var transform = cloneTransform(map.transform);
    var around = unprojectFromTransform(transform, opt.pos);
    transform.zoom = transform.scaleZoom(map.transform.scale * opt.scale);
    transform.setLocationAtPoint(around, opt.pos);
    this._onChangeViewport({
      latitude: transform.center.lat,
      longitude: transform.center.lng,
      zoom: transform.zoom,
      isDragging: true
    });
  },

  _onZoomEnd: function _onZoomEnd() {
    this._onChangeViewport({isDragging: false});
  },

  render: function render() {
    var props = this.props;
    var style = assign({}, props.style, {
      width: props.width,
      height: props.height,
      cursor: this._cursor()
    });

    var transform = new Transform();
    transform.width = props.width;
    transform.height = props.height;
    transform.zoom = this.props.zoom;
    transform.center.lat = this.props.latitude;
    transform.center.lng = this.props.longitude;

    var content = [
      r.div({ref: 'mapboxMap', style: style, className: props.className}),
      r.div({
        className: 'overlays',
        style: {position: 'absolute', left: 0, top: 0}
      }, this.props.children)
    ];

    if (this.props.onChangeViewport) {
      content = [
        r(MapInteractions, {
          onMouseDown: this._onMouseDown,
          onMouseDrag: this._onMouseDrag,
          onMouseUp: this._onMouseUp,
          onMouseMove: this._onMouseMove,
          onZoom: this._onZoom,
          onZoomEnd: this._onZoomEnd,
          width: this.props.width,
          height: this.props.height
        }, content)
      ];
    }

    return r.div({
      style: assign({}, this.props.style, {
        width: this.props.width,
        height: this.props.height,
        position: 'relative'
      })
    }, content);
  }
});

MapGL.fitBounds = function fitBounds(width, height, _bounds, options) {
  var bounds = new LngLatBounds([_bounds[0].reverse(), _bounds[1].reverse()]);
  options = options || {};
  var padding = typeof options.padding === 'undefined' ? 0 : options.padding;
  var offset = Point.convert([0, 0]);
  var tr = new Transform();
  tr.width = width;
  tr.height = height;
  var nw = tr.project(bounds.getNorthWest());
  var se = tr.project(bounds.getSouthEast());
  var size = se.sub(nw);
  var scaleX = (tr.width - padding * 2 - Math.abs(offset.x) * 2) / size.x;
  var scaleY = (tr.height - padding * 2 - Math.abs(offset.y) * 2) / size.y;

  var center = tr.unproject(nw.add(se).div(2));
  var zoom = tr.scaleZoom(tr.scale * Math.min(scaleX, scaleY));
  return {
    latitude: center.lat,
    longitude: center.lng,
    zoom: zoom
  };
};

module.exports = MapGL;
