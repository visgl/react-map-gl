/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Popup} from 'react-map-gl';
import ControlPanel from './control-panel';

import {defaultMapStyle, highlightLayerIndex} from './map-style.js';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

export default class App extends Component {

  state = {
    mapStyle: defaultMapStyle,
    viewport: {
      latitude: 38.88,
      longitude: -98,
      zoom: 3,
      minZoom: 2,
      bearing: 0,
      pitch: 0,
      width: 500,
      height: 500
    },
    hoverInfo: null
  };

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

  _onHover = event => {
    let countyName = '';
    let hoverInfo = null;

    const county = event.features && event.features.find(f => f.layer.id === 'counties');
    if (county) {
      hoverInfo = {
        lngLat: event.lngLat,
        county: county.properties
      };
      countyName = county.properties.COUNTY;
    }
    this.setState({
      mapStyle: defaultMapStyle.setIn(['layers', highlightLayerIndex, 'filter', 2], countyName),
      hoverInfo
    });
  };

  _renderPopup() {
    const {hoverInfo} = this.state;
    if (hoverInfo) {
      return (
        <Popup longitude={hoverInfo.lngLat[0]} latitude={hoverInfo.lngLat[1]} closeButton={false}>
          <div className="county-info">{hoverInfo.county.COUNTY}</div>
        </Popup>
      );
    }
    return null;
  }

  render() {

    const {viewport, mapStyle} = this.state;

    return (
      <MapGL
        {...viewport}
        mapStyle={mapStyle}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={this._onViewportChange}
        onHover={this._onHover} >
        { this._renderPopup() }
        <ControlPanel containerComponent={this.props.containerComponent} />
      </MapGL>
    );
  }

}
