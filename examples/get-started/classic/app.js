/* global document */
import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14,
        bearing: 0,
        pitch: 0
      }
    };
  }

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
    );
  }
}

document.body.style.margin = 0;
render(<Root />, document.body.appendChild(document.createElement('div')));
