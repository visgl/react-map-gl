// Copyright (c) 2015 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import {InteractiveMap, ScatterplotOverlay, Marker} from 'react-map-gl';
import DeckGL, {ArcLayer} from 'deck.gl';
import Immutable from 'immutable';
/* global window */

// San Francisco
import SF_FEATURE from './data/feature-example-sf.json';
import CITIES from './data/cities.json';
const location = CITIES[0];

// Example data.
const locations = Immutable.fromJS(new Array(4000).fill(0).map(() => [
  location.longitude + Math.random() * 0.01,
  location.latitude + Math.random() * 0.01
]));

const MARKER_STYLE = {
  cursor: 'pointer'
};

const MARKER_ICON = `M18.2,15.7L18.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S0,4.5,0,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C18.1,15.8,18.2,15.8,18.2,15.7z`;

function buildStyle({fill = 'red', stroke = 'blue'}) {
  return Immutable.fromJS({
    version: 8,
    name: 'Example raster tile source',
    sources: {
      'my-geojson-polygon-source': {
        type: 'geojson',
        data: SF_FEATURE
      }
    },
    layers: [
      {
        id: 'geojson-polygon-fill',
        source: 'my-geojson-polygon-source',
        type: 'fill',
        paint: {'fill-color': fill, 'fill-opacity': 0.4},
        interactive: true
      }, {
        id: 'geojson-polygon-stroke',
        source: 'my-geojson-polygon-source',
        type: 'line',
        paint: {'line-color': stroke, 'line-width': 4},
        interactive: false
      }
    ]
  });
}

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default class Example extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: location.latitude,
        longitude: location.longitude,
        zoom: 11,
        bearing: 180,
        pitch: 60,
        startDragLngLat: null,
        isDragging: false
      },
      mapStyle: buildStyle({stroke: '#FF00FF', fill: 'green'})
    };
    autobind(this);
  }

  componentWillMount() {
    const colors = ['red', 'green', 'blue'];
    let i = 0;
    window.setInterval(function interval() {
      this.setState({
        mapStyle: buildStyle({
          stroke: colors[i % colors.length],
          fill: colors[(i + 1) % colors.length]
        })
      });
      i = i + 1;
    }.bind(this), 2000);
  }

  _onChangeViewport(opt) {
    this.setState({viewport: opt});
  }

  _onClickFeatures(features) {
    window.console.log(features);
  }

  _renderCityMarker(city, index) {
    return (
      <Marker key={index}
        longitude={city.longitude} latitude={city.latitude}
        offsetLeft={-10} offsetTop={-24}>
        <svg width={20} viewBox='0 0 20 24' style={MARKER_STYLE}>
          <path fill='#d00' d={MARKER_ICON}/>
        </svg>
      </Marker>
    );
  }

  render() {
    const viewport = {
      // mapStyle: this.state.mapStyle,
      ...this.state.viewport,
      ...this.props
    };
    return (
      <InteractiveMap
        { ...viewport }
        maxPitch={85}
        onChangeViewport={ this._onChangeViewport }
        onClickFeatures={ this._onClickFeatures }
        perspectiveEnabled={ true }
        // setting to `true` should cause the map to flicker because all sources
        // and layers need to be reloaded without diffing enabled.
        preventStyleDiffing={ false }>

        <ScatterplotOverlay
          { ...viewport }
          locations={ locations }
          dotRadius={ 2 }
          globalOpacity={ 1 }
          compositeOperation="screen"/>

        <DeckGL {...viewport} layers={[
          new ArcLayer({
            data: [{sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.45669, 37.781]}],
            strokeWidth: 4,
            getSourceColor: x => [0, 0, 255],
            getTargetColor: x => [0, 255, 0]
          })
        ]}/>

        { CITIES.map(this._renderCityMarker) }

      </InteractiveMap>
    );
  }
}

Example.propTypes = propTypes;
