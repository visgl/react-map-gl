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
import MapGL from 'react-map-gl';

import ZIPCODES_SF from '../data/feature-example-sf.json';
import CITIES from '../data/cities.json';

const location = CITIES[0];

for (const feature of ZIPCODES_SF.features) {
  feature.properties.value = Math.random() * 1000;
}

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default class NotInteractiveExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: location.latitude,
        longitude: location.longitude,
        zoom: 11
      }
    };
  }

  render() {
    return <MapGL { ...this.state.viewport } { ...this.props }/>;
  }
}

NotInteractiveExample.propTypes = propTypes;
