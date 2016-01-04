'use strict';

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

var r = require('r-dom');
var d3 = require('d3');
var fs = require('fs');
var React = require('react');
var assign = require('object-assign');
var MapGL = require('react-map-gl');
var path = require('path');

var Markdown = require('../../common/markdown');
var CodeSnippet = require('../../common/code-snippet.react');
var stamenMapStyle = require('../../common/stamen-map-style');

module.exports = React.createClass({
  getInitialState: function getInitialState() {
    return {
      map: {
        latitude: 37.78,
        longitude: -122.45,
        zoom: 11,
        mapStyle: stamenMapStyle,
        width: 700,
        height: 450
      }
    };
  },

  _onChangeViewport: function _onChangeViewport(opt) {
    this.setState({map: assign({}, this.state.map, opt)});
  },

  render: function render() {
    return r.div([
      r(Markdown, {
        text: fs.readFileSync(
          path.join(__dirname, 'interactivity.md'), 'utf-8'
        )
      }),

      r(CodeSnippet, {
        language: 'html',
        text: '<MapGL\n' +
          '  width={' + this.state.map.width + '}\n' +
          '  height={' + this.state.map.height + '}\n' +
          '  latitude={' + d3.round(this.state.map.latitude, 3) + '}\n' +
          '  longitude={' + d3.round(this.state.map.longitude, 3) + '}\n' +
          '  zoom={' + d3.round(this.state.map.zoom, 3) + '}\n' +
          '  mapStyle={mapStyle} />'
      }),

      r(Markdown, {text: 'is equivalent to...'}),

      r(CodeSnippet, {
        language: 'html',
        text: '<MapGL {...viewport} mapStyle={mapStyle} />'
      }),

      r(Markdown, {text: 'assuming that...'}),

      r(CodeSnippet, {
        language: 'js',
        text: 'var viewport = {\n' +
          '  width: ' + this.state.map.width + ',\n' +
          '  height: ' + this.state.map.height + ',\n' +
          '  latitude: ' + d3.round(this.state.map.latitude, 3) + ',\n' +
          '  longitude: ' + d3.round(this.state.map.longitude, 3) + ',\n' +
          '  zoom: ' + d3.round(this.state.map.zoom, 3) + '\n' +
          '};'
      }),

      r(Markdown, {text: 'To support interactivity, pass a callback function ' +
        'as the `onChangeViewport` prop.'}),

      r(CodeSnippet, {
        language: 'html',
        text: 'render() {\n' +
        '  var {viewport} = this.state;\n' +
        '  return <MapGL\n' +
        '    {...viewport}\n' +
        '    onChangeViewport={viewport => this.setState({viewport})}\n' +
        '  />;\n' +
        '}'
      }),

      r(MapGL,
        assign({onChangeViewport: this._onChangeViewport}, this.state.map)
      )
    ]);
  }

});
