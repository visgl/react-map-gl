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
var alphaify = require('alphaify');
var r = require('r-dom');
var React = require('react');
var fs = require('fs');
var MapGL = require('react-map-gl');
var d3 = require('d3');
var Immutable = require('immutable');

var HeatmapOverlay = require('react-map-gl-heatmap-overlay');

var stamenMapStyle = require('../../common/stamen-map-style');
var CodeSnippet = require('../../common/code-snippet.react');
var Markdown = require('../../common/markdown');

module.exports = React.createClass({

  getInitialState: function getInitialState() {
    var normal = d3.random.normal();
    function wiggle(scale) {
      return normal() * scale;
    }
    return {
      map: {
        latitude: 37.78,
        longitude: -122.45,
        zoom: 11,
        mapStyle: stamenMapStyle,
        width: 700,
        height: 450,
      },
      locations: d3.range(2000).map(function _map() {
        return {
          longitude: -122.408 + wiggle(0.01),
          latitude: 37.788 + wiggle(0.01)
        };
      })
    };
  },

  _onChangeViewport: function _onChangeViewport(opt) {
      this.setState({map: assign({}, this.state.map, opt)});
  },

  render: function render() {
    return r.div([
      r(Markdown, {
        text: fs.readFileSync(__dirname + '/third-party-overlays.md', 'utf-8')
      }),

      r(CodeSnippet, {
        language: 'js',
        text: fs.readFileSync(__dirname + '/overlay-props.txt', 'utf-8')
      }),

      r(Markdown, {
        text: fs.readFileSync(__dirname + '/third-party-overlay-example.md', 'utf-8')
      }),

      r(CodeSnippet, {
        language: 'html',
        text: '<MapGL width={' + this.state.map.width + '} ' +
        'height={' + this.state.map.height + '} ' +
        'latitude={' + d3.round(this.state.map.latitude, 3) + '} ' +
        'longitude={' + d3.round(this.state.map.longitude, 3) + '} ' +
        'zoom={' + d3.round(this.state.map.zoom, 3) + '} ' +
        'mapStyle={mapStyle}>\n' +
        '  <HeatmapOverlay ...overlayProps /> \n' +
        '</MapGL>'
      }),

      r(MapGL, assign({onChangeViewport: this._onChangeViewport}, this.state.map), [

        r(HeatmapOverlay, assign({}, this.state.map, {
          locations: this.state.locations,
          latLngAccessor: function latLngAccessor(location) {
            return location.toArray();
          },
          intensityAccessor: function intensityAccessor() {
            return 1 / 10;
          },
          sizeAccessor: function sizeAccessor() {
            return 10;
          }
        }))
      ])
    ]);
  }

});
