/* global document */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

class Root extends Component {
  state = {
    viewport: {
      latitude: 37.785164,
      longitude: -122.41669,
      zoom: 16.14044,
      bearing: -20.55991,
      pitch: 60
    }
  };

  render() {
    const {viewport} = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={v => this.setState({viewport: v})}
        preventStyleDiffing={false}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        perspectiveEnabled
        width="100vw"
        height="100vh"
      />
    );
  }
}

const root = document.createElement('div');
document.body.appendChild(root);

render(<Root />, root);
