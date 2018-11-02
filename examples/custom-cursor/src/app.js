/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import ControlPanel from './control-panel';
import MAP_STYLE from '../../map-style-basic-v8.json';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

export default class App extends Component {

  state = {
    mapStyle: '',
    viewport: {
      latitude: 37.773,
      longitude: -122.481,
      zoom: 15.5,
      bearing: 0,
      pitch: 0
    },
    interactiveLayerIds: []
  }

  _onViewportChange = viewport => this.setState({viewport});

  _onInteractiveLayersChange = layerFilter => {
    this.setState({
      interactiveLayerIds: MAP_STYLE.layers.map(layer => layer.id).filter(layerFilter)
    });
  };

  _onClick = (event) => {
    const feature = event.features && event.features[0];

    if (feature) {
      window.alert(`Clicked layer ${feature.layer.id}`);
    }
  };

  _getCursor = ({isHovering, isDragging}) => {
    return isHovering ? 'pointer' : 'default';
  };

  render() {

    const {viewport, interactiveLayerIds} = this.state;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle={MAP_STYLE}
        clickRadius={2}
        onClick={this._onClick}
        getCursor={this._getCursor}
        interactiveLayerIds={interactiveLayerIds}
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN} >
        <ControlPanel
          containerComponent={this.props.containerComponent}
          onChange={this._onInteractiveLayersChange} />
      </MapGL>
    );
  }

}

export function renderToDom(container) {
  render(<App/>, container);
}
