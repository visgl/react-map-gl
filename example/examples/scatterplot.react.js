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

import Immutable from 'immutable';
import d3 from 'd3';

import React, {PropTypes, Component} from 'react';
import autobind from 'autobind-decorator';

import MapGL from '../../src/index.js';
import ScatterplotOverlay from '../../src/overlays/scatterplot.react';

// San Francisco
import CITIES from './../data/cities.json';
const location = CITIES[0];

const normal = d3.random.normal();
function wiggle(scale) {
  return normal() * scale;
}

// Example data.
const locations = Immutable.fromJS(d3.range(4000).map(
  () => [location.longitude + wiggle(0.01), location.latitude + wiggle(0.01)]
));

const PROP_TYPES = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default class ScatterplotOverlayExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: location.latitude,
        longitude: location.longitude,
        zoom: 11,
        startDragLngLat: null,
        isDragging: false
      }
    };
  }

  @autobind
  _onChangeViewport(opt) {
    if (this.props.onChangeViewport) {
      return this.props.onChangeViewport(opt);
    }
    this.setState({
      viewport: {
        latitude: opt.latitude,
        longitude: opt.longitude,
        zoom: opt.zoom,
        startDragLngLat: opt.startDragLngLat,
        isDragging: opt.isDragging
      }
    });
  }

  render() {
    const viewport = {...this.state.viewport, ...this.props};
    return (
      <MapGL
        { ...viewport }
        onChangeViewport={ this._onChangeViewport }>

        <ScatterplotOverlay
          { ...viewport }
          locations={ locations }
          dotRadius={ 2 }
          globalOpacity={ 1 }
          compositeOperation="screen"/>

      </MapGL>
    );
  }
}

ScatterplotOverlayExample.propTypes = PROP_TYPES;
