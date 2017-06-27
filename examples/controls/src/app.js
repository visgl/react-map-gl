/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';

import CityPin from './city-pin';

import CITIES from './cities.json';

const token = process.env.MapboxAccessToken; // eslint-disable-line

if (!token) {
  throw new Error('Please specify a valid mapbox token');
}

const navStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  padding: '10px'
};

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 4,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      popupInfo: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.width !== this.state.viewport.width ||
        nextProps.height !== this.state.viewport.height) {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: nextProps.width,
          height: nextProps.height
        }
      });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _updateViewport = (viewport) => {
    this.setState({viewport});
  }

  _resize = () => {
    const {widthOffset, heightOffset} = this.props;
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth - widthOffset,
        height: window.innerHeight - heightOffset,
      }
    });
  }

  _renderCityMarker = (city, index) => {
    return (
      <Marker key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude} >
        <CityPin size={20} onClick={() => this.setState({popupInfo: city})} />
      </Marker>
    );
  }

  _renderPopup() {
    const {popupInfo} = this.state;

    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        onClose={() => this.setState({popupInfo: null})} >
        {popupInfo.city}, {popupInfo.state}
      </Popup>
    );
  }

  render() {

    const {viewport} = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={token} >

        { CITIES.map(this._renderCityMarker) }

        {this._renderPopup()}

        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>

      </MapGL>
    );
  }

}

// Used to render properly in docs. Ignore these props or remove if you're
// copying this as a starting point.
App.defaultProps = {
  widthOffset: 0,
  heightOffset: 0
};
