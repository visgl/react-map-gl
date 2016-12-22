import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';

import MapInteractions from './map-interactions';
import StaticMap from './static-map';

import {mod, unprojectFromTransform, cloneTransform} from './utils/transform';
import mapboxgl, {Point} from 'mapbox-gl';

@pureRender
export default class InteractiveMap extends Component {

  static supported() {
    return mapboxgl.supported();
  }

  constructor(props) {
    super(props);
    this.state = {viewport: {}};
  }

  _getMap() {
    return this.refs.map._map;
  }

  @autobind
  _unproject(pos) {
    const {lng, lat} = this._unprojectToLatLng(pos);
    return [lng, lat];
  }

  @autobind
  _unprojectToLatLng(pos) {
    const map = this._getMap();
    const point = new Point(...pos);
    const latLong = map.unproject(point);
    return latLong;
  }

  @autobind
  _getFeatures({pos, radius}) {
    const map = this._getMap();
    const point = new Point(...pos);
    let features;
    if (radius) {
      // Radius enables point features, like marker symbols, to be clicked.
      const size = radius;
      const bbox = [[pos[0] - size, pos[1] - size], [pos[0] + size, pos[1] + size]];
      features = map.queryRenderedFeatures(bbox, this._queryParams);
    } else {
      features = map.queryRenderedFeatures(point, this._queryParams);
    }
    return features;
  }

  @autobind
  _updateViewport({
    relativeZoom,
    location,
    point,
    pitch,
    bearing,
    ...opts
  }) {
    const map = this._getMap();
    const transform = cloneTransform(map.transform);
    if (relativeZoom) {
      transform.zoom = transform.scaleZoom(map.transform.scale * relativeZoom);
    }
    if (location) {
      // assert(point);
      const mapboxPoint = new Point(...point);
      const around = unprojectFromTransform(transform, mapboxPoint);
      transform.setLocationAtPoint(around, mapboxPoint);
    }
    if (bearing) {
      transform.bearing = bearing;
    }
    if (pitch) {
      transform.pitch = pitch;
    }

    this._callOnChangeViewport(transform, {
      isDragging: true,
      startDragLngLat: point ? this._unproject(point) : null,
      startBearing: transform.bearing,
      startPitch: transform.pitch,
      ...opts
    });
  }

   // Helper to call props.onChangeViewport
  _callOnChangeViewport(transform, opts = {}) {
    console.log(opts);
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

  render() {
    return (
      <MapInteractions
        {...this.props}
        unproject={this._unproject}
        onChangeViewport={this._updateViewport}
        getFeatures={this._getFeatures}>

        <StaticMap ref="map" {...this.props}/>

      </MapInteractions>
    );
  }
}
