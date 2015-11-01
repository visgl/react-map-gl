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
  return [location.latitude + wiggle(0.01), location.longitude + wiggle(0.01)];
}));

var ScatterplotOverlayExample = React.createClass({

  displayName: 'ScatterplotOverlayExample',

  PropTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: 11,
      startDragLatLng: null,
      isDragging: false
    };
  },

  _onChangeViewport: function _onChangeViewport(opt) {
    this.setState({
      latitude: opt.latitude,
      longitude: opt.longitude,
      zoom: opt.zoom,
      startDragLatLng: opt.startDragLatLng,
      isDragging: opt.isDragging
    });
  },

  render: function render() {
    return r(MapGL, assign({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      zoom: this.state.zoom,
      isDragging: this.state.isDragging,
      startDragLatLng: this.state.startDragLatLng,
      width: this.props.width,
      height: this.props.height,
      onChangeViewport: this.props.onChangeViewport || this._onChangeViewport
    }, this.props), [
      r(ScatterplotOverlay, {
        locations: locations,
        dotRadius: 2,
        globalOpacity: 1,
        compositeOperation: 'screen',
        defaultZoom: 11,
        zoom: this.state.zoom
      })
    ]);
  }
});

module.exports = ScatterplotOverlayExample;
