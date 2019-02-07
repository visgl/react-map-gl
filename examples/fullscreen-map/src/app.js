import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {FullscreenControl} from 'react-map-gl';

const TOKEN = ''; // Set your mapbox token here

const fullscreenStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0
      },
      events: {}
    };
  }

  _updateViewport = (viewport) => {
    this.setState({viewport});
  }

  render() {
    const {viewport} = this.state;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN} >

        <div className="fullscreen" style={fullscreenStyle}>
          <FullscreenControl />
        </div>

      </MapGL>
    );
  }

}

export function renderToDom(container) {
  render(<App/>, container);
}
