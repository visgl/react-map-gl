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
import {InteractiveMap} from 'react-map-gl';
/* global window */

const windowAlert = window.alert;

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};

export default class ClickExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.7736092599127,
        longitude: -122.42312591099463,
        zoom: 12.011557070552028
      }
    };
    this._onViewportChange = this._onViewportChange.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  _onViewportChange(viewport) {
    this.setState({viewport});
  }

  _onClick({lngLat}) {
    windowAlert(lngLat);
  }

  render() {
    const viewport = {
      ...this.state.viewport,
      ...this.props
    };
    return (
      <InteractiveMap
        {...viewport}
        scrollZoom={false}
        onViewportChange={this._onViewportChange}
        onClick={this._onClick}
      />
    );
  }
}

ClickExample.propTypes = propTypes;
