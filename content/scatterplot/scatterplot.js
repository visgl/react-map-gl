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
var r = require('r-dom');
var React = require('react');
var fs = require('fs');
var MapGL = require('react-map-gl');
var d3 = require('d3');
var Immutable = require('immutable');

var ScatterPlotOverlay = require('react-map-gl/src/overlays/scatterplot.react');

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
        isDragging: true,
      },
      locations: Immutable.fromJS(d3.range(2000).map(function _map() {
        return [-122.408 + wiggle(0.01), 37.788 + wiggle(0.01)];
      }))
    };
  },

  _onChangeViewport: function _onChangeViewport(opt) {
      this.setState({map: assign({}, this.state.map, opt)});
  },

  render: function render() {
    return r.div([
      r(Markdown, {text: fs.readFileSync(__dirname + '/scatterplot-example.md', 'utf-8')}),

      r(CodeSnippet, {
        language: 'html',
        text: '<MapGL\n' +
        '  width={' + this.state.map.width + '}\n' +
        '  height={' + this.state.map.height + '}\n' +
        '  latitude={' + d3.round(this.state.map.latitude, 3) + '}\n' +
        '  longitude={' + d3.round(this.state.map.longitude, 3) + '}\n' +
        '  zoom={' + d3.round(this.state.map.zoom, 3) + '}\n' +
        '  mapStyle={mapStyle}>\n\n' +
        '    <ScatterPlotOverlay \n' +
        '      {...viewport}\n' +
        '      locations={locations}\n' +
        '      dotRadius={2} \n' +
        '      globalOpacity={1} \n' +
        '      compositeOperation=\'screen\' />\n\n' +
        '</MapGL>'
      }),

      r(Markdown, {
        text: 'Where `locations` is an [ImmutableJS](https://facebook.github.' +
          'io/immutable-js/) List of longitude/latitude pairs'
      }),

      r(CodeSnippet, {
        language: 'js',
        text: fs.readFileSync(__dirname + '/locations-snippet.txt', 'utf-8')
      }),

      r(MapGL, assign({onChangeViewport: this._onChangeViewport},
        this.state.map), [
        r(ScatterPlotOverlay, assign({}, this.state.map, {
          locations: this.state.locations,
          dotRadius: 2,
          globalOpacity: 1,
          compositeOperation: 'screen'
        }))
      ]),
    ]);
  }

});
