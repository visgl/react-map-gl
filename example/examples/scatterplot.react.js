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
'use strict';

var assign = require('object-assign');
var React = require('react');
var r = require('r-dom');
var Immutable = require('immutable');
var d3 = require('d3');

var MapGL = require('../../src/index.js');
var ScatterplotOverlay = require('../../src/overlays/scatterplot.react');

// San Francisco
var location = require('./../data/cities.json')[0];

var normal = d3.random.normal();
function wiggle(scale) {
  return normal() * scale;
}

// Example data.
var locations = Immutable.fromJS(d3.range(4000).map(function _map() {
  return [location.longitude + wiggle(0.01), location.latitude + wiggle(0.01)];
}));

var ScatterplotOverlayExample = React.createClass({

  displayName: 'ScatterplotOverlayExample',

  PropTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      viewport: {
        latitude: location.latitude,
        longitude: location.longitude,
        zoom: 11,
        startDragLngLat: null,
        isDragging: false
      }
    };
  },

  _onChangeViewport: function _onChangeViewport(opt) {
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
  },

  render: function render() {
    var viewport = assign({}, this.state.viewport, this.props);
    return r(MapGL, assign({}, viewport, {
      onChangeViewport: this._onChangeViewport
    }), [
      r(ScatterplotOverlay, assign({}, viewport, {
        locations: locations,
        dotRadius: 2,
        globalOpacity: 1,
        compositeOperation: 'screen'
      }))
    ]);
  }
});

module.exports = ScatterplotOverlayExample;
