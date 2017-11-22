/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {experimental} from 'react-map-gl';

import ControlPanel from './control-panel';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

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

  _onViewportChange = viewport => this.setState({
    viewport: {...this.state.viewport, ...viewport}
  });

  _resize = () => this._onViewportChange({
    width: this.props.width || window.innerWidth,
    height: this.props.height || window.innerHeight
  });

  _goToViewport = ({longitude, latitude}) => {
    this._onViewportChange({
      longitude,
      latitude,
      zoom: 11,
      transitionInterpolator: new experimental.ViewportFlyToInterpolator(),
      transitionDuration: 3000
    });
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
          mapboxApiAccessToken={MAPBOX_TOKEN} />
        <ControlPanel containerComponent={this.props.containerComponent}
          onViewportChange={this._goToViewport} />
      </div>
    );
  }

}
