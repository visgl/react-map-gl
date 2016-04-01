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
var window = require('global/window');

// San Francisco
var location = require('./../data/cities.json')[0];

function buildStyle(opts) {
  opts = assign({
    fill: 'red',
    stroke: 'blue'
  }, opts);
  return Immutable.fromJS({
    version: 8,
    name: 'Example raster tile source',
    sources: {
      'my-geojson-polygon-source': {
        type: 'geojson',
        data: require('./../data/feature-example-sf.json')
      }
    },
    layers: [
      {
        id: 'geojson-polygon-fill',
        source: 'my-geojson-polygon-source',
        type: 'fill',
        paint: {'fill-color': opts.fill, 'fill-opacity': 0.4},
        interactive: true
      }, {
        id: 'geojson-polygon-stroke',
        source: 'my-geojson-polygon-source',
        type: 'line',
        paint: {'line-color': opts.stroke, 'line-width': 4},
        interactive: false
      }
    ]
  });
}

var StyleDiffingExample = React.createClass({

  displayName: 'StyleDiffingExample',

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
      },
      mapStyle: buildStyle({stroke: '#FF00FF', fill: 'green'})
    };
  },

  componentDidMount: function componentDidMount() {
    var i = 0;
    var colors = ['red', 'green', 'blue'];
    window.setInterval(function interval() {
      this.setState({
        mapStyle: buildStyle({
          stroke: colors[i % colors.length],
          fill: colors[(i + 1) % colors.length]
        })
      });
      i = i + 1;
    }.bind(this), 2000);
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

  _onClickFeatures: function _onClickFeatures(features) {
    window.console.log(features);
  },

  render: function render() {
    var viewport = assign({
      mapStyle: this.state.mapStyle
    }, this.state.viewport, this.props);
    return r(MapGL, assign({}, viewport, {
      onChangeViewport: this._onChangeViewport,
      onClickFeatures: this._onClickFeatures,
      // setting to `true` should cause the map to flicker because all sources
      // and layers need to be reloaded without diffing enabled.
      preventStyleDiffing: false
    }));
  }
});

module.exports = StyleDiffingExample;
