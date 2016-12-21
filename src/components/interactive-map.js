import React, {Component} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import autobind from '../utils/autobind';

import StaticMap from './static-map';
import MapControls from './map-controls';

import {mod, cloneTransform} from '../utils/transform';
// import {unprojectFromTransform} from './utils/transform';
import mapboxgl, {Point} from 'mapbox-gl';

export default class InteractiveMap extends Component {

  static supported() {
    return mapboxgl.supported();
  }

  constructor(props) {
    super(props);
    this.state = {viewport: {}};
    autobind(this);
  }

  // Pure render
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _getMap() {
    return this.refs.map._map;
  }

  // Uses map to unproject a coordinate
  // TODO - replace with Viewport
  _unproject(pos) {
    const {lng, lat} = this._unprojectToLatLng(pos);
    return [lng, lat];
  }

  _unprojectToLatLng(pos) {
    const map = this._getMap();
    const point = new Point(...pos);
    const latLong = map.unproject(point);
    return latLong;
  }

  // Uses map to get position for panning
  // TODO - replace with Viewport
  _getLngLatAtPoint({lngLat, pos}) {
    // assert(point);
    const map = this._getMap();
    const transform = cloneTransform(map.transform);
    const mapboxPoint = new Point(...pos);
    // const around = unprojectFromTransform(transform, mapboxPoint);
    transform.setLocationAtPoint(lngLat, mapboxPoint);
    return [
      mod(transform.center.lng + 180, 360) - 180,
      transform.center.lat
    ];
  }

  render() {
    // TODO - do we still need this?
    // let content = [];
    // if (this.state.isSupported && this.props.onChangeViewport) {
    //   content = (}

    return (
      <MapControls
        {...this.props}
        unproject={this._unproject}
        getLngLatAtPoint={this._getLngLatAtPoint}>

        <StaticMap ref="map" {...this.props}/>

      </MapControls>
    );
  }
}
