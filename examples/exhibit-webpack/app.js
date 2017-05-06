import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';

const token = process.env.MAPBOX_ACCESS_TOKEN; // eslint-disable-line

if (!token) {
  throw new Error('Please specify a valid mapbox token');
}

class Root extends Component {

  state = {
    viewport: {
      latitude: 37.785164,
      longitude: -122.41669,
      zoom: 16.140440,
      bearing: -20.55991,
      pitch: 60,
    },
    width: 500,
    height: 500,
  }

  render() {

    const {viewport, width, height} = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onChangeViewport={v => this.setState({viewport: v})}
        preventStyleDiffing={false}
        mapboxApiAccessToken={token}
        perspectiveEnabled
        width={width}
        height={height}>
      </MapGL>
    );
  }

}

const root = document.createElement('div');
document.body.appendChild(root);

render(<Root />, root);
