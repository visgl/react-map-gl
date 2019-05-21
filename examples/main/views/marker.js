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
import MapGL, {Marker} from 'react-map-gl';
import bartStations from '../../data/bart-station.json';

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default class MainExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.7749,
        longitude: -122.4194,
        zoom: 12
      }
    };
    this._onViewportChange = this._onViewportChange.bind(this);
  }

  _onViewportChange(viewport) {
    this.setState({viewport});
  }

  _renderMarker(station, i) {
    const {name, coordinates} = station;
    return (
      <Marker key={i} longitude={coordinates[0]} latitude={coordinates[1]}>
        <div className="station">
          <span>{name}</span>
        </div>
      </Marker>
    );
  }

  render() {
    const viewport = {...this.state.viewport, ...this.props};

    return (
      <MapGL {...viewport} dragRotate={false} onViewportChange={this._onViewportChange}>
        {bartStations.map(this._renderMarker)}
      </MapGL>
    );
  }
}

MainExample.propTypes = propTypes;
