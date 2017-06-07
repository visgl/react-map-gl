import React, {PureComponent} from 'react';
import {Marker} from 'react-map-gl';
import bartStations from './bart-station.json';

export default class Markers extends PureComponent {

  _renderMarker(station, i) {
    const {name, coordinates} = station;
    return (
      <Marker key={i} longitude={coordinates[0]} latitude={coordinates[1]} >
        {name}
      </Marker>
    );
  }

  render() {
    return bartStations.map(this._renderMarker);
  }

}
