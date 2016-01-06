// Copyright (c) 2016 Uber Technologies, Inc.

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
var r = require('r-dom');
var React = require('react');
var fs = require('fs');
var MapGL = require('react-map-gl');
var d3 = require('d3');
var path = require('path');
var HeatmapOverlay = require('react-map-gl-heatmap-overlay');
var stamenMapStyle = require('../../common/stamen-map-style');
var CodeSnippet = require('../../common/code-snippet.react');
var Markdown = require('../../common/markdown.react');
var Attribute = require('../../common/attribute.react');

var TYPICAL_VIEWPORT_TEXT = fs.readFileSync(path.join(__dirname,
  './typical-viewport.js'), 'utf-8');

var INTRODUCTION_TEXT = fs.readFileSync(path.join(__dirname,
  'introduction.md'), 'utf-8');

var HEATMAP_TEXT = fs.readFileSync(path.join(__dirname,
  'intro-heatmap-overlay.md'), 'utf-8');

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
        height: 450
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
        text: INTRODUCTION_TEXT
      }),

      r(CodeSnippet, {language: 'html', text: TYPICAL_VIEWPORT_TEXT}),

      r(Markdown, {text: HEATMAP_TEXT}),

      r(CodeSnippet, {
        language: 'html',
        text: '<MapGL {...viewport} mapStyle={mapStyle}>\n' +
          '  <HeatmapOverlay \n' +
          '    {...viewport}\n' +
          '    locations={locations}\n' +
          '    intensityAccessor={location => 1 / 10}\n' +
          '    sizeAccessor={location => 40}\n' +
          '  />\n' +
          '</MapGL>'
      }),

      r(MapGL,
        assign({onChangeViewport: this._onChangeViewport}, this.state.map), [
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
          })),
          r(Attribute, this.state.map)
        ]),
      r(Markdown, {
        text: 'If you\'re planning on creating an overlay resuable overlay, ' +
          'fork the [react-map-gl-example-overlay](https://github.com' +
          '/vicapow/react-map-gl-example-overlay) project.'
      })
    ]);
  }
});
