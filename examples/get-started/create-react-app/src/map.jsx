import React, {Component} from 'react';
import MapGL, {NavigationControl, FullscreenControl} from 'react-map-gl';
import './map.css';

// Insert your Mapbox API key here
const API_KEY = '';

class Map extends Component {
  state = {
    viewport: {
      latitude: 37.785164,
      longitude: -100,
      zoom: 3.5,
      bearing: 0,
      pitch: 0
    }
  };

  updateViewport = viewport => {
    this.setState({viewport});
  };

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        width="100%"
        height="100vh"
        mapboxApiAccessToken={API_KEY}
        onViewportChange={viewport => this.updateViewport(viewport)}
        mapStyle="mapbox://styles/mapbox/light-v9"
        className="map"
      >
        <div className="fullscreen">
          <FullscreenControl />
        </div>

        <div className="nav">
          <NavigationControl />
        </div>
      </MapGL>
    );
  }
}

export default Map;
