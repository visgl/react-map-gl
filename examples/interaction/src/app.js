/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker} from 'react-map-gl';
import ControlPanel from './control-panel';

import bartStations from './bart-station.json';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

import MARKER_STYLE from './marker-style';

export default class App extends Component {

  state = {
    viewport: {
      latitude: 37.729,
      longitude: -122.36,
      zoom: 11,
      bearing: 0,
      pitch: 50,
      width: 500,
      height: 500
    },
    interactionState: {},
    settings: {
      dragPan: true,
      dragRotate: true,
      scrollZoom: true,
      touchZoom: true,
      touchRotate: true,
      keyboard: true,
      doubleClickZoom: true,
      minZoom: 0,
      maxZoom: 20,
      minPitch: 0,
      maxPitch: 85
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

  _onViewportChange = viewport => this.setState({viewport});

  _onInteractionStateChange = interactionState => this.setState({interactionState});

  _onSettingChange = (name, value) => this.setState({
    settings: {...this.state.settings, [name]: value}
  });

  _renderMarker(station, i) {
    const {name, coordinates} = station;
    return (
      <Marker key={i} longitude={coordinates[0]} latitude={coordinates[1]}
        captureDrag={false} captureDoubleClick={false}>
        <div className="station"><span>{name}</span></div>
      </Marker>
    );
  }

  render() {

    const {viewport, settings, interactionState} = this.state;

    return (
      <MapGL
        {...viewport}
        {...settings}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._onViewportChange}
        onInteractionStateChange={this._onInteractionStateChange}
        mapboxApiAccessToken={MAPBOX_TOKEN} >
        <style>{MARKER_STYLE}</style>
        { bartStations.map(this._renderMarker) }
        <ControlPanel containerComponent={this.props.containerComponent}
          settings={settings}
          interactionState={{...interactionState}}
          onChange={this._onSettingChange} />
      </MapGL>
    );
  }

}
