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
import {PureComponent, createElement} from 'react';
import PropTypes from 'prop-types';
import autobind from '../utils/autobind';

import {getAccessToken} from '../utils/access-token';
import {getInteractiveLayerIds} from '../utils/style-utils';
import diffStyles from '../utils/diff-styles';

import Immutable from 'immutable';

import isBrowser from '../utils/is-browser';
import {PerspectiveMercatorViewport} from 'viewport-mercator-project';

let mapboxgl = null;
let Point = null;
if (isBrowser) {
  mapboxgl = require('mapbox-gl');
  ({Point} = mapboxgl);
}

function noop() {}

const propTypes = {
  /** Mapbox API access token for mapbox-gl-js. Required when using Mapbox vector tiles/styles. */
  mapboxApiAccessToken: PropTypes.string,
  /** Mapbox WebGL context creation option. Useful when you want to export the canvas as a PNG. */
  preserveDrawingBuffer: PropTypes.bool,
  /** Show attribution control or not. */
  attributionControl: PropTypes.bool,

  /** The Mapbox style. A string url or a MapboxGL style Immutable.Map object. */
  mapStyle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Immutable.Map)
  ]),
  /** There are known issues with style diffing. As stopgap, add option to prevent style diffing. */
  preventStyleDiffing: PropTypes.bool,

  /** The latitude of the center of the map. */
  latitude: PropTypes.number.isRequired,
  /** The longitude of the center of the map. */
  longitude: PropTypes.number.isRequired,
  /** The tile zoom level of the map. */
  zoom: PropTypes.number.isRequired,
  /** Specify the bearing of the viewport */
  bearing: PropTypes.number,
  /** Specify the pitch of the viewport */
  pitch: PropTypes.number,
  /** Altitude of the viewport camera. Default 1.5 "screen heights" */
  // Note: Non-public API, see https://github.com/mapbox/mapbox-gl-js/issues/1137
  altitude: PropTypes.number,
  /** The width of the map. */
  width: PropTypes.number.isRequired,
  /** The height of the map. */
  height: PropTypes.number.isRequired,

 /**
    * Called when a feature is hovered over. Uses Mapbox's
    * queryRenderedFeatures API to find features under the pointer:
    * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
    * To query only some of the layers, set the `interactive` property in the
    * layer style to `true`. See Mapbox's style spec
    * https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive
    * If no interactive layers are found (e.g. using Mapbox's default styles),
    * will fall back to query all layers.
    * @callback
    * @param {array} features - The array of features the mouse is over.
    */
  onHoverFeatures: PropTypes.func,
  /**
    * Set to false to enable onHoverFeatures to be called regardless if
    * there is an actual feature at x, y. This is useful to emulate
    * "mouse-out" behaviors on features.
    * Defaults to TRUE
    */
  ignoreEmptyFeatures: PropTypes.bool,
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

  /**
   * Called when the map is clicked. The handler is called with the clicked
   * coordinates (https://www.mapbox.com/mapbox-gl-js/api/#LngLat) and the
   * screen coordinates (https://www.mapbox.com/mapbox-gl-js/api/#PointLike).
   */
  onClick: PropTypes.func,

  /** Radius to detect features around a clicked point. Defaults to 15. */
  clickRadius: PropTypes.number
};

const defaultProps = {
  mapStyle: 'mapbox://styles/mapbox/light-v8',
  mapboxApiAccessToken: getAccessToken(),
  preserveDrawingBuffer: false,
  attributionControl: true,
  ignoreEmptyFeatures: true,
  bearing: 0,
  pitch: 0,
  altitude: 1.5,
  clickRadius: 15
};

const childContextTypes = {
  viewport: PropTypes.instanceOf(PerspectiveMercatorViewport)
};

export default class StaticMap extends PureComponent {
  static supported() {
    return mapboxgl && mapboxgl.supported();
  }

  constructor(props) {
    super(props);
    this.state = {
      isSupported: mapboxgl && mapboxgl.supported(),
      isDragging: false,
      isHovering: false,
      startDragLngLat: null,
      startBearing: null,
      startPitch: null
    };
    this._queryParams = {};
    mapboxgl.accessToken = props.mapboxApiAccessToken;

    if (!this.state.isSupported) {
      this.componentDidMount = noop;
      this.componentWillReceiveProps = noop;
      this.componentDidUpdate = noop;
    }
    autobind(this);
  }

  getChildContext() {
    return {
      viewport: new PerspectiveMercatorViewport(this.props)
    };
  }

  componentDidMount() {
    if (!mapboxgl) {
      return;
    }

    const mapStyle = Immutable.Map.isMap(this.props.mapStyle) ?
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
      attributionControl: this.props.attributionControl,
      preserveDrawingBuffer: this.props.preserveDrawingBuffer
    });

    // Disable outline style
    const canvas = map.getCanvas();
    if (canvas) {
      canvas.style.outline = 'none';
    }

    this._map = map;
    this._updateMapViewport({}, this.props);
    // this._callOnChangeViewport(map.transform);
    this._updateQueryParams(mapStyle);
  }

  componentWillReceiveProps(newProps) {
    if (!mapboxgl) {
      return;
    }

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
    if (!mapboxgl) {
      return;
    }

    // Since Mapbox's map.resize() reads size from DOM
    // we must wait to read size until after render (i.e. here in "didUpdate")
    this._updateMapSize(this.state, this.props);
  }

  componentWillUnmount() {
    if (!mapboxgl) {
      return;
    }

    if (this._map) {
      this._map.remove();
    }
  }

  // External apps can access map this way
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

  // Hover and click only query layers whose interactive property is true
  // If no interactivity is specified, query all layers
  _updateQueryParams(mapStyle) {
    const interactiveLayerIds = getInteractiveLayerIds(mapStyle);
    this._queryParams = interactiveLayerIds.length === 0 ? {} :
      {layers: interactiveLayerIds};
  }

  // Update a source in the map style
  _updateSource(map, update) {
    const newSource = update.source.toJS();
    if (newSource.type === 'geojson') {
      const oldSource = map.getSource(update.id);
      if (oldSource.type === 'geojson') {
        // update data if no other GeoJSONSource options were changed
        const oldOpts = oldSource.workerOptions;
        if (
          (newSource.maxzoom === undefined ||
            newSource.maxzoom === oldOpts.geojsonVtOptions.maxZoom) &&
          (newSource.buffer === undefined ||
            newSource.buffer === oldOpts.geojsonVtOptions.buffer) &&
          (newSource.tolerance === undefined ||
            newSource.tolerance === oldOpts.geojsonVtOptions.tolerance) &&
          (newSource.cluster === undefined ||
            newSource.cluster === oldOpts.cluster) &&
          (newSource.clusterRadius === undefined ||
            newSource.clusterRadius === oldOpts.superclusterOptions.radius) &&
          (newSource.clusterMaxZoom === undefined ||
            newSource.clusterMaxZoom === oldOpts.superclusterOptions.maxZoom)
        ) {
          oldSource.setData(newSource.data);
          return;
        }
      }
    }

    map.removeSource(update.id);
    map.addSource(update.id, newSource);
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

    const map = this._map;

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
      this._updateSource(map, update);
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
      if (Immutable.Map.isMap(mapStyle)) {
        if (this.props.preventStyleDiffing) {
          this._map.setStyle(mapStyle.toJS());
        } else {
          this._setDiffStyle(oldMapStyle, mapStyle);
        }
      } else {
        this._map.setStyle(mapStyle);
      }
      this._updateQueryParams(mapStyle);
    }
  }

  _updateMapViewport(oldProps, newProps) {
    const viewportChanged =
      newProps.latitude !== oldProps.latitude ||
      newProps.longitude !== oldProps.longitude ||
      newProps.zoom !== oldProps.zoom ||
      newProps.pitch !== oldProps.pitch ||
      newProps.bearing !== oldProps.bearing ||
      newProps.altitude !== oldProps.altitude;

    if (viewportChanged) {
      this._map.jumpTo({
        center: [newProps.longitude, newProps.latitude],
        zoom: newProps.zoom,
        bearing: newProps.bearing,
        pitch: newProps.pitch
      });

      // TODO - jumpTo doesn't handle altitude
      if (newProps.altitude !== oldProps.altitude) {
        this._map.transform.altitude = newProps.altitude;
      }
    }
  }

  // Note: needs to be called after render (e.g. in componentDidUpdate)
  _updateMapSize(oldProps, newProps) {
    const sizeChanged =
      oldProps.width !== newProps.width || oldProps.height !== newProps.height;

    if (sizeChanged) {
      this._map.resize();
      // this._callOnChangeViewport(this._map.transform);
    }
  }

  _getFeatures({pos, radius}) {
    let features;
    if (radius) {
      // Radius enables point features, like marker symbols, to be clicked.
      const size = radius;
      const bbox = [[pos[0] - size, pos[1] - size], [pos[0] + size, pos[1] + size]];
      features = this._map.queryRenderedFeatures(bbox, this._queryParams);
    } else {
      const point = new Point(...pos);
      features = this._map.queryRenderedFeatures(point, this._queryParams);
    }
    return features;
  }

  // HOVER AND CLICK

  _onMouseMove({pos}) {
    if (this.props.onHover) {
      const latLong = this.props.unproject(pos);
      this.props.onHover(latLong, pos);
    }
    if (this.props.onHoverFeatures) {
      const features = this._getFeatures({pos});
      if (!features.length && this.props.ignoreEmptyFeatures) {
        return;
      }
      this.setState({isHovering: features.length > 0});
      this.props.onHoverFeatures(features);
    }
  }

  _onMouseClick(event) {
    const pos = [event.clientX, event.clientY];

    if (this.props.onClick) {
      const latLong = this.props.unproject(pos);
      // TODO - Do we really want to expose a mapbox "Point" in our interface?
      // const point = new Point(...pos);
      this.props.onClick(latLong, pos);
    }

    if (this.props.onClickFeatures) {
      const features = this._getFeatures({pos, radius: this.props.clickRadius});
      if (!features.length && this.props.ignoreEmptyFeatures) {
        return;
      }
      this.props.onClickFeatures(features);
    }
  }

  render() {
    const {className, width, height, style} = this.props;
    const mapContainerStyle = Object.assign({}, style, {width, height, position: 'relative'});
    const mapStyle = Object.assign({}, style, {width, height});
    const overlayContainerStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      width,
      height,
      overflow: 'hidden'
    };

    // Note: a static map still handles clicks and hover events
    return (
      createElement('div', {
        key: 'map-container',
        style: mapContainerStyle,
        onMouseMove: this._onMouseMove,
        onClick: this._onMouseClick,
        children: [
          createElement('div', {
            key: 'map-mapbox',
            ref: 'mapboxMap',
            style: mapStyle,
            className
          }),
          createElement('div', {
            key: 'map-overlays',
            // Same as interactive map's overlay container
            className: 'overlays',
            style: overlayContainerStyle,
            children: this.props.children
          })
        ]
      })
    );
  }
}

StaticMap.displayName = 'StaticMap';
StaticMap.propTypes = propTypes;
StaticMap.defaultProps = defaultProps;
StaticMap.childContextTypes = childContextTypes;
