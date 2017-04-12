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

/* window */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MapGL, {autobind} from 'react-map-gl';
import Immutable from 'immutable';

// San Francisco
import SF_FEATURE from '../data/feature-example-sf.json';
import CITIES from '../data/cities.json';

const location = CITIES[0];

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

export default class StyleDiffingExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: location.latitude,
        longitude: location.longitude,
        zoom: 11,
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

  _onChangeViewport(viewport) {
    this.setState({viewport});
  }

  _onClickFeatures(features) {
    window.console.log(features);
  }

  render() {
    const viewport = {
      mapStyle: this.state.mapStyle,
      ...this.state.viewport,
      ...this.props
    };
    return (
      <MapGL
        { ...viewport }
        onChangeViewport={ this._onChangeViewport }
        onClickFeatures={ this._onClickFeatures }
        // setting to `true` should cause the map to flicker because all sources
        // and layers need to be reloaded without diffing enabled.
        preventStyleDiffing={ false }/>
    );
  }
}

StyleDiffingExample.propTypes = propTypes;
