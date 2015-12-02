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

var MapGL = require('../../src/index.js');
var ChoroplethOverlay = require('../../src/overlays/choropleth.react');

// San Francisco
var location = require('./../data/cities.json')[0];
var _zipcodesSF = require('./../data/feature-example-sf.json');

_zipcodesSF.features.forEach(function _forEach(feature) {
  feature.properties.value = Math.random() * 1000;
});

var ZIPCODES_SF = Immutable.fromJS(_zipcodesSF);

var ChoroplethOverlayExample = React.createClass({
  displayName: 'ChoroplethOverlayExample',

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

  _onChangeViewport: function _onChangeViewport(viewport) {
    if (this.props.onChangeViewport) {
      return this.props.onChangeViewport(viewport);
    }
    this.setState({viewport: viewport});
  },

  render: function render() {
    var mapProps = assign({}, this.state.viewport, this.props, {
      onChangeViewport: this._onChangeViewport
    });
    return r(MapGL, mapProps, [
      r(ChoroplethOverlay, assign({}, mapProps, {
        globalOpacity: 0.8,
        colorDomain: [0, 500, 1000],
        colorRange: ['#31a354', '#addd8e', '#f7fcb9'],
        renderWhileDragging: false,
        features: ZIPCODES_SF.get('features')
      }))
    ]);
  }
});

module.exports = ChoroplethOverlayExample;
