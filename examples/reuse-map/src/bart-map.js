import React, {Component} from 'react';
import MapGL, {Marker} from '../../../src';

import bartStations from '../../data/bart-station.json';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

export default class BartMap extends Component {

  state = {
    viewState: {
      latitude: 37.729,
      longitude: -122.36,
      zoom: 11,
      bearing: 0,
      pitch: 50
    }
  };

  _onViewportChange = viewState => this.setState({viewState});

  _renderMarker(station, i) {
    const {name, coordinates} = station;
    return (
      <Marker key={i} longitude={coordinates[0]} latitude={coordinates[1]} >
        <div className="station"><span>{name}</span></div>
      </Marker>
    );
  }

  render() {
    const {mapStyle} = this.props;
    const {viewState} = this.state;
    return (
      <MapGL
        {...viewState}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={mapStyle}

        width={500}
        height={500}
        onViewportChange={this._onViewportChange}

        reuseMaps={true}
      >
        { bartStations.map(this._renderMarker) }
      </MapGL>
    );
  }

}
