/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';
import DeckGL, {ArcLayer} from 'deck.gl';
import MapGL from 'react-map-gl';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        longitude: -122.45,
        latitude: 37.78,
        zoom: 11,
        bearing: 0,
        pitch: 30,
        width: window.innerWidth,
        height: window.innerHeight
      },
    };
  }

  _onViewportChange = (viewport) => {
    this.setState({viewport});
  }

  render() {
    const {viewport} = this.state;

    return (
      <MapGL
        { ...viewport }
        maxPitch={85}
        onViewportChange={ this._onViewportChange } >

        <DeckGL {...viewport} layers={[
          new ArcLayer({
            data: [
              {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.45669, 37.781]}
            ],
            strokeWidth: 4,
            getSourceColor: x => [0, 0, 255],
            getTargetColor: x => [0, 255, 0]
          })
        ]}/>

      </MapGL>
    );
  }
}

export function renderToDom() {
  render(<App/>, document.body.appendChild(document.createElement('div')));
}
