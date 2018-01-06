/* global window, fetch */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import ControlPanel from './control-panel';

import {defaultMapStyle, dataLayer} from './map-style';
import {updatePercentiles} from './utils';
import {json as requestJson} from 'd3-request';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

export default class App extends Component {

  state = {
    mapStyle: defaultMapStyle,
    year: 2015,
    data: null,
    hoveredFeature: null,
    viewport: {
      latitude: 40,
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

    requestJson('data/us-income.geojson', (error, response) => {
      if (!error) {
        this._loadData(response);
      }
    });
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

  _loadData = originalData => {

    const data = updatePercentiles(originalData, f => f.properties.income[this.state.year]);

    const mapStyle = Object.assign({}, defaultMapStyle);
    // Add geojson source to map
    mapStyle.sources.incomeByState = { type: 'geojson', data};
    // Add point layer to map
    mapStyle.layers.push(dataLayer);
    this.setState({data, mapStyle});
  };

  _updateSettings = (name, value) => {
    if (name === 'year') {
      this.setState({year: value});

      const {data: originalData, mapStyle} = this.state;
      if (originalData) {
        const data = updatePercentiles(originalData, f => f.properties.income[value]);
        const newMapStyle = Object.assign({}, mapStyle);
        newMapStyle.sources = Object.assign({}, newMapStyle.sources);
        newMapStyle.sources.incomeByState = { type: 'geojson', data };
        this.setState({mapStyle: newMapStyle});
      }
    }
  };

  _onViewportChange = viewport => this.setState({viewport});

  _onHover = event => {
    const {features, srcEvent: {offsetX, offsetY}} = event;
    const hoveredFeature = features && features.find(f => f.layer.id === 'data');

    this.setState({hoveredFeature, x: offsetX, y: offsetY});
  };

  _renderTooltip() {
    const {hoveredFeature, year, x, y} = this.state;

    return hoveredFeature && (
      <div className="tooltip" style={{left: x, top: y}}>
        <div>State: {hoveredFeature.properties.name}</div>
        <div>Median Household Income: {hoveredFeature.properties.value}</div>
        <div>Percentile: {hoveredFeature.properties.percentile / 8 * 100}</div>
      </div>
    );
  }

  render() {

    const {viewport, mapStyle} = this.state;

    return (
      <div>
        <MapGL
          {...viewport}
          mapStyle={mapStyle}
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onHover={this._onHover} >

          {this._renderTooltip()}

        </MapGL>

        <ControlPanel containerComponent={this.props.containerComponent}
          settings={this.state} onChange={this._updateSettings} />
      </div>
    );
  }

}
