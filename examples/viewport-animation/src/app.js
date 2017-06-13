/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import TWEEN from 'tween.js';

import CITIES from './cities.json';

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

class Root extends Component {

  state = {
    viewport: {
      latitude: 37.785164,
      longitude: -100,
      zoom: 4,
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

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  };

  _easeTo = ({longitude, latitude}) => {
    // Remove existing animations
    TWEEN.removeAll();

    const {viewport} = this.state;

    new TWEEN.Tween(viewport)
      .to({
        longitude,
        latitude,
        zoom: 11
      }, 3000)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(() => this._onViewportChange(viewport))
      .start();
  };

  _onViewportChange = viewport => this.setState({viewport});

  _renderButton = (city, index) => {
    return (
      <div key={`btn-${index}`} className="btn"
        onClick={() => this._easeTo(city)} >
        {city.city}, {city.state}
      </div>
    );
  };

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

        <div className="control-panel">
          { CITIES.map(this._renderButton) }
        </div>
      </div>
    );
  }

}

const root = document.createElement('div');
document.body.appendChild(root);

render(<Root />, root);
