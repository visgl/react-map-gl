/* global window */
import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Source, Layer} from 'react-map-gl';

import ControlPanel from './control-panel';
import {pointOnCircle} from './utils';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

const pointLayer = {
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};

export default class App extends Component {
  state = {
    pointData: null,
    viewport: {
      latitude: 0,
      longitude: -100,
      zoom: 3,
      bearing: 0,
      pitch: 0
    }
  };

  componentDidMount() {
    this._animatePoint();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animation);
  }

  animation = null;

  _animatePoint = () => {
    this.setState({
      pointData: pointOnCircle({center: [-100, 0], angle: Date.now() / 1000, radius: 20})
    });
    this.animation = window.requestAnimationFrame(this._animatePoint);
  };

  _onViewportChange = viewport => this.setState({viewport});

  render() {
    const {viewport, pointData} = this.state;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {pointData && (
          <Source type="geojson" data={pointData}>
            <Layer {...pointLayer} />
          </Source>
        )}
        <ControlPanel containerComponent={this.props.containerComponent} />
      </MapGL>
    );
  }
}

export function renderToDom(container) {
  render(<App />, container);
}
