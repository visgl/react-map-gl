/* global window */
import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';

import ControlPanel from './control-panel';
import MapController from './map-controller';
const customController = new MapController();

const MAPBOX_TOKEN = ''; // Set your mapbox token here

export default class App extends Component {
  state = {
    viewport: {
      latitude: 37.773,
      longitude: -122.481,
      zoom: 15.5,
      bearing: 0,
      pitch: 0
    },
    settings: {
      invertZoom: false,
      invertPan: false,
      longPress: false
    }
  };

  _onViewportChange = viewport => this.setState({viewport});

  _onSettingsChange = (name, value) => {
    this.setState({
      settings: {...this.state.settings, [name]: value}
    });
  };

  render() {
    const {viewport, settings} = this.state;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        controller={customController}
        invertZoom={settings.invertZoom}
        invertPan={settings.invertPan}
        onPress={settings.longPress ? () => window.alert('pressed') : null} // eslint-disable-line no-alert
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <ControlPanel settings={settings} onChange={this._onSettingsChange} />
      </MapGL>
    );
  }
}

export function renderToDom(container) {
  render(<App />, container);
}
