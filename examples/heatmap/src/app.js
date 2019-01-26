/* global window, fetch */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import ControlPanel from './control-panel';
import {json as requestJson} from 'd3-request';

const MAPBOX_TOKEN = ''; // Set your mapbox token here
const HEATMAP_SOURCE_ID = "earthquakes-source";


export default class App extends Component {

  constructor(props) {
    super(props);
    var current = new Date().getTime();

    this.state = {
      viewport: {
        latitude: 40,
        longitude: -100,
        zoom: 3,
        bearing: 0,
        pitch: 0
      },
      allDay: true,
      startTime: current,
      endTime: current,
      selectedTime: current,
      earthquakes: null
    };

    this._mapRef = React.createRef();
    this._handleMapLoaded = this._handleMapLoaded.bind(this);
    this._handleChangeDay = this._handleChangeDay.bind(this);
    this._handleChangeAllDay = this._handleChangeAllDay.bind(this);
  }

  _mkFeatureCollection = (features) => ({ "type": "FeatureCollection", features});

  _filterFeaturesByDay = (features, time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return features
      .filter(feature => {
        const featureDate = new Date(feature.properties.time);
        return featureDate.getFullYear() == year
          && featureDate.getMonth() == month
          && featureDate.getDate() == day;
      })};

  _mkHeatmapLayer = (id, source) => {
    const MAX_ZOOM_LEVEL = 9;
    return {
      id,
      source,
      maxzoom: MAX_ZOOM_LEVEL,
      type: 'heatmap',
      paint: {
        // Increase the heatmap weight based on frequency and property magnitude
        "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", "mag"],
            0, 0,
            6, 1
        ],
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        "heatmap-intensity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0, 1,
            MAX_ZOOM_LEVEL, 3
        ],
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0, "rgba(33,102,172,0)",
            0.2, "rgb(103,169,207)",
            0.4, "rgb(209,229,240)",
            0.6, "rgb(253,219,199)",
            0.8, "rgb(239,138,98)",
            0.9, "rgb(255,201,101)"
        ],
        // Adjust the heatmap radius by zoom level
        "heatmap-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0, 2,
            MAX_ZOOM_LEVEL, 20
        ],
        // Transition from heatmap to circle layer by zoom level
        "heatmap-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            7, 1,
            9, 0
        ],
      }
    }
  };

  _onViewportChange = viewport => this.setState({viewport});

  _getMap = () => {
    return this._mapRef.current ? this._mapRef.current.getMap() : null;
  }

  _handleMapLoaded = event => {
    const map = this._getMap();

    requestJson('https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson', (error, response) => {
      if (!error) {
        // Note: In a real application you would do a validation of JSON data before doing anything with it,
        // but for demonstration purposes we ingore this part here and just trying to select needed data...
        const features = response.features;
        const endTime = features[0].properties.time;
        const startTime = features[features.length - 1].properties.time;

        this.setState({ earthquakes: response, endTime, startTime, selectedTime: endTime });
        map.addSource(HEATMAP_SOURCE_ID, { type: "geojson", data: response});
        map.addLayer(this._mkHeatmapLayer("heatmap-layer", HEATMAP_SOURCE_ID));
      }
    });
  }

  _handleChangeDay = time => {
    this.setState({selectedTime: time});
    if (this.state.earthquakes !== null && this.state.earthquakes.features) {
      const features = this._filterFeaturesByDay(this.state.earthquakes.features, time);
      this._setMapData(features);
    }
  }

  _handleChangeAllDay = allDay => {
    this.setState({allDay});
    if (this.state.earthquakes !== null && this.state.earthquakes.features) {
      this._setMapData( allDay
          ? this.state.earthquakes.features
          : this._filterFeaturesByDay(this.state.earthquakes.features, this.state.selectedTime)
        );
    }
  }

  _setMapData = features => {
    const map = this._getMap();
    map && map.getSource(HEATMAP_SOURCE_ID).setData(this._mkFeatureCollection(features));
  }

  render() {

    const {viewport, allDay, selectedTime, startTime, endTime} = this.state;

    return (
      <div style={{height: '100%'}}>
        <MapGL
          ref={this._mapRef}
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onLoad={this._handleMapLoaded}
          />
          <ControlPanel
            startTime={startTime}
            endTime={endTime}
            selectedTime={selectedTime}
            allDay={allDay}
            onChangeDay={this._handleChangeDay}
            onChangeAllDay={this._handleChangeAllDay}
          />
      </div>
    );
  }
}

export function renderToDom(container) {
  render(<App/>, container);
}
