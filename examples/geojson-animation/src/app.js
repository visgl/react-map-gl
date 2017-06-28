/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';

import ControlPanel from './control-panel';
import {defaultMapStyle, pointLayer} from './map-style.js';
import {pointOnCircle} from './utils';
import {fromJS} from 'immutable';

const token = process.env.MapboxAccessToken; // eslint-disable-line

if (!token) {
  throw new Error('Please specify a valid mapbox token');
}

let animation = null;

export default class App extends Component {

  state = {
    mapStyle: defaultMapStyle,
    viewport: {
      latitude: 0,
      longitude: -100,
      zoom: 3,
      bearing: 0,
      pitch: 0,
      width: 500,
      height: 500
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
    animation = window.requestAnimationFrame(this._animatePoint);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
    window.cancelAnimationFrame(animation);
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

  _animatePoint = () => {
    this._updatePointData(pointOnCircle({center: [-100, 0], angle: Date.now() / 1000, radius: 20}));
    animation = window.requestAnimationFrame(this._animatePoint);
  }

  _updatePointData = pointData => {
    let {mapStyle} = this.state;
    if (!mapStyle.hasIn(['source', 'point'])) {
      mapStyle = mapStyle
        // Add geojson source to map
        .setIn(['sources', 'point'], fromJS({type: 'geojson'}))
        // Add point layer to map
        .set('layers', mapStyle.get('layers').push(pointLayer));
    }
    // Update data source
    mapStyle = mapStyle.setIn(['sources', 'point', 'data'], pointData);

    this.setState({mapStyle});
  }

  _onViewportChange = viewport => this.setState({viewport});

  render() {

    const {viewport, mapStyle} = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle={mapStyle}
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={token} >
        <ControlPanel />
      </MapGL>
    );
  }

}
