/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';

import ControlPanel from './control-panel';
import {defaultMapStyle, pointLayer} from './map-style';
import {pointOnCircle} from './utils';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

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
    // Trigger an update to the map stylesheet by returning a new instance.
    mapStyle = Object.assign({}, mapStyle);
    if (!mapStyle.sources.point) {
      // Add point layer to map
      mapStyle.layers.push(pointLayer);
    }
    // Update data source. It's important that we recreate it each time
    // so that the changes are detected by react-map-gl.
    mapStyle.sources = Object.assign({}, mapStyle.sources);
    mapStyle.sources.point = {type: 'geojson', data: pointData };

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
        mapboxApiAccessToken={MAPBOX_TOKEN} >
        <ControlPanel containerComponent={this.props.containerComponent} />
      </MapGL>
    );
  }

}
