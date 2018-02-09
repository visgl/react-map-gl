import React, {Component} from 'react';
import MapGL, {Marker} from '../../../src';

import bartStations from '../../data/bart-station.json';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

import MARKER_STYLE from './marker-style';

export default class BartMap extends Component {

  state = {
      viewport: {
      latitude: 37.729,
      longitude: -122.36,
      zoom: 11,
      bearing: 0,
      pitch: 50,
      width: 500,
      height: 500
    },
    settings: {
      dragPan: true,
      dragRotate: true,
      scrollZoom: true,
      touchZoom: true,
      touchRotate: true,
      keyboard: true,
      doubleClickZoom: true,
      minZoom: 0,
      maxZoom: 20,
      minPitch: 0,
      maxPitch: 85
    }
  };

  _onViewportChange = viewport => this.setState({viewport});

  _renderMarker(station, i) {
    const {name, coordinates} = station;
    return (
      <Marker key={i} longitude={coordinates[0]} latitude={coordinates[1]} >
        <div className="station"><span>{name}</span></div>
      </Marker>
    );
  }

  render() {
    const {viewport, settings} = this.state;
    return (
      <MapGL
        {...viewport}
        {...settings}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        reuseMaps={true}
      >
        <style>{MARKER_STYLE}</style>
        { bartStations.map(this._renderMarker) }
      </MapGL>
    );
  }

}
