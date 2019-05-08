import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker, NavigationControl} from 'react-map-gl';

import ControlPanel from './control-panel';
import Pin from './pin';

const TOKEN = ''; // Set your mapbox token here

const navStyle = {
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
      marker: {
        latitude: 37.785164,
        longitude: -100
      },
      events: {}
    };
  }

  _updateViewport = viewport => {
    this.setState({viewport});
  };

  _logDragEvent(name, event) {
    this.setState({
      events: {
        ...this.state.events,
        [name]: event.lngLat
      }
    });
  }

  _onMarkerDragStart = event => {
    this._logDragEvent('onDragStart', event);
  };

  _onMarkerDrag = event => {
    this._logDragEvent('onDrag', event);
  };

  _onMarkerDragEnd = event => {
    this._logDragEvent('onDragEnd', event);
    this.setState({
      marker: {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1]
      }
    });
  };

  render() {
    const {viewport, marker} = this.state;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN}
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable
          onDragStart={this._onMarkerDragStart}
          onDrag={this._onMarkerDrag}
          onDragEnd={this._onMarkerDragEnd}
        >
          <Pin size={20} />
        </Marker>

        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>

        <ControlPanel
          containerComponent={this.props.containerComponent}
          events={this.state.events}
        />
      </MapGL>
    );
  }
}

export function renderToDom(container) {
  render(<App />, container);
}
