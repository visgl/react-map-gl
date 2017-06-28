/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import {PerspectiveMercatorViewport} from 'viewport-mercator-project';
import TWEEN from 'tween.js';

import ControlPanel from './control-panel';

const token = process.env.MapboxAccessToken; // eslint-disable-line

if (!token) {
  throw new Error('Please specify a valid mapbox token');
}

// Required by tween.js
function animate() {
  TWEEN.update();
  window.requestAnimationFrame(animate);
}
animate();

export default class App extends Component {

  state = {
    viewport: {
      latitude: 37.7751,
      longitude: -122.4193,
      zoom: 11,
      bearing: 0,
      pitch: 0,
      width: 500,
      height: 500
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    });
  };

  _easeTo = ({longitude, latitude}) => {
    // Remove existing animations
    TWEEN.removeAll();

    const {viewport} = this.state;

    new TWEEN.Tween(viewport)
      .to({
        longitude, latitude,
        zoom: 11
      }, 3000)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(() => this._onViewportChange(viewport))
      .start();
  };

  _onViewportChange = viewport => this.setState({viewport});

  render() {

    const {viewport, settings} = this.state;

    return (
      <div>
        <MapGL
          {...viewport}
          {...settings}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={this._onViewportChange}
          dragToRotate={false}
          mapboxApiAccessToken={token} />
        <ControlPanel onViewportChange={this._easeTo} />
      </div>
    );
  }

}
