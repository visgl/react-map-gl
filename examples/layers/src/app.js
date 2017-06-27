/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import StyleControls from './style-controls';

const token = process.env.MapboxAccessToken; // eslint-disable-line

if (!token) {
  throw new Error('Please specify a valid mapbox token');
}

export default class App extends Component {

  state = {
    mapStyle: '',
    viewport: {
      latitude: 37.805,
      longitude: -122.447,
      zoom: 15.5,
      bearing: 0,
      pitch: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  _resize = () => {
    const {widthOffset, heightOffset} = this.props;
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth - widthOffset,
        height: window.innerHeight - heightOffset
      }
    });
  };

  _onViewportChange = viewport => this.setState({viewport});

  _onStyleChange = mapStyle => this.setState({mapStyle});

  render() {

    const {viewport, mapStyle} = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle={mapStyle}
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={token} >
        <StyleControls onChange={this._onStyleChange} />
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
