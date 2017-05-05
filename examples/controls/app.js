/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';

import CityPin from './components/city-pin';

import CITIES from './data/cities.json';

import './app.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const token = process.env.MAPBOX_ACCESS_TOKEN || // eslint-disable-line
  'Set MAPBOX_ACCESS_TOKEN environment variable or put your token here.';

if (!token) {
  throw new Error('Please specify a valid mapbox token');
}

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 4,
        bearing: 0,
        pitch: 0,
      },
      width: 500,
      height: 500,
      popupInfo: null
    };

    this._updateViewport = this._updateViewport.bind(this);
    this._resize = this._resize.bind(this);
    this._renderCityMarker = this._renderCityMarker.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _updateViewport(viewport) {
    this.setState({viewport});
  }

  _resize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _renderCityMarker(city, index) {
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
        {popupInfo.cityName}
      </Popup>
    );
  }

  render() {

    const {viewport, width, height} = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onChangeViewport={this._updateViewport}
        preventStyleDiffing={false}
        mapboxApiAccessToken={token}
        perspectiveEnabled
        width={width}
        height={height}>

        { CITIES.map(this._renderCityMarker) }

        {this._renderPopup()}

        <div className="nav">
          <NavigationControl onChangeViewport={this._updateViewport} />
        </div>

      </MapGL>
    );
  }

}

const root = document.createElement('div');
document.body.appendChild(root);

render(<Root />, root);
