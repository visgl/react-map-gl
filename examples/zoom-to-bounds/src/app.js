/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {LinearInterpolator} from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import bbox from '@turf/bbox';

import ControlPanel from './control-panel';
import MAP_STYLE from './map-style';

const TOKEN = ''; // Set your mapbox token here

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -122.4,
        zoom: 11,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };

    this._map = React.createRef();
  }

  _updateViewport = (viewport) => {
    this.setState({viewport});
  }

  _onClick = (event) => {
    const feature = event.features[0];
    if (feature) {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);
      // construct a viewport instance from the current state
      const viewport = new WebMercatorViewport(this.state.viewport);
      const {longitude, latitude, zoom} = viewport.fitBounds(
        [[minLng, minLat], [maxLng, maxLat]],
        {padding: 40}
      );

      this.setState({viewport: {
        ...this.state.viewport,
        longitude,
        latitude,
        zoom,
        transitionInterpolator: new LinearInterpolator({
          around: [event.offsetCenter.x, event.offsetCenter.y]
        }),
        transitionDuration: 1000
      }});
    }
  }

  render() {

    const {viewport} = this.state;

    return (
      <MapGL
        ref={this._map}
        mapStyle={MAP_STYLE}
        interactiveLayerIds={['sf-neighborhoods-fill']}
        {...viewport}
        width="100%"
        height="100%"
        onClick={this._onClick}
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN} >

        <ControlPanel containerComponent={this.props.containerComponent} />

      </MapGL>
    );
  }

}

export function renderToDom(container) {
  render(<App/>, container);
}
