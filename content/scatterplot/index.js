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

var assign = require('object-assign');
var r = require('r-dom');
var React = require('react');
var fs = require('fs');
var MapGL = require('react-map-gl');
var d3 = require('d3');
var Immutable = require('immutable');
var path = require('path');
var COMPOSITE_TYPES = require('canvas-composite-types');
var SAMPLE_COLORS = [
  '#1FBAD6',
  '#3DE600',
  '#FFAF03',
  '#F173FF',
  '#73FF93'
];

var ScatterPlotOverlay = require('react-map-gl/src/overlays/scatterplot.react');

var stamenMapStyle = require('../../common/stamen-map-style');
var CodeSnippet = require('../../common/code-snippet.react');
var Markdown = require('../../common/markdown.react');
var LngLatAccessor = require('../../common/lng-lat-accessor.react');

function PropLabel(props) {
  var style = {width: 200, display: 'inline-block'};
  return r.label({style: style}, r.h4({style: {display: 'inline', padding: 0}},
    props.children));
}

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
        isDragging: false
      },
      locations: Immutable.fromJS(d3.range(2000).map(function _map() {
        return [-122.408 + wiggle(0.01), 37.788 + wiggle(0.01)];
      })),
      scatterPlotStyle: {
        compositeOperation: 'screen',
        dotRadius: 2,
        globalOpacity: 1,
        renderWhileDragging: true,
        dotFill: '#00B4E6'
      }
    };
  },

  _onChangeViewport: function _onChangeViewport(opt) {
    this.setState({map: assign({}, this.state.map, opt)});
  },

  _onChangeScatterPlotStyle: function _onChangeScatterPlotStyle(name, type) {
    return function _onChange(event) {
      var style = assign(this.state.scatterPlotStyle);
      if (type !== Boolean) {
        style[name] = type(event.target.value);
      } else {
        style[name] = !style[name];
      }
      this.setState({scatterPlotStyle: style});
    }.bind(this);
  },

  render: function render() {
    var plotStyle = this.state.scatterPlotStyle;
    var dotRadius = plotStyle.dotRadius;
    var globalOpacity = plotStyle.globalOpacity;
    var renderWhileDragging = plotStyle.renderWhileDragging;
    var compositeOperation = plotStyle.compositeOperation;
    var dotFill = plotStyle.dotFill;
    return r.div([
      r(Markdown, {
        text: fs.readFileSync(
          path.join(__dirname, 'scatter-plot-example.md'),
          'utf-8'
        )
      }),
      r(CodeSnippet, {
        language: 'js',
        text: 'var ScatterPlotOverlay = require(\'react-map-gl/src/overlays' +
          '/scatterplot.react\');'
      }),
      r(MapGL,
        assign({onChangeViewport: this._onChangeViewport}, this.state.map),
        [
          r(ScatterPlotOverlay, assign({}, this.state.map, {
            locations: this.state.locations,
            dotRadius: dotRadius,
            globalOpacity: globalOpacity,
            compositeOperation: compositeOperation,
            dotFill: dotFill,
            renderWhileDragging: renderWhileDragging
          }))
        ]
      ),
      r.div([
        r(PropLabel, 'dotRadius: '),
        r.input({
          type: 'range',
          max: 20,
          min: 1,
          step: 1,
          value: dotRadius,
          onChange: this._onChangeScatterPlotStyle('dotRadius', Number)
        })
      ]),
      r.div([
        r(PropLabel, 'globalOpacity: '),
        r.input({
          type: 'range',
          max: 1,
          min: 0,
          step: 0.01,
          value: globalOpacity,
          onChange: this._onChangeScatterPlotStyle('globalOpacity', Number)
        })
      ]),
      r.div([
        r(PropLabel, 'renderWhileDragging: '),
        r.input({
          type: 'checkbox',
          checked: renderWhileDragging,
          onChange: this._onChangeScatterPlotStyle('renderWhileDragging',
            Boolean)
        })
      ]),
      r.div([
        r(PropLabel, 'compositeOperation'),
        r.select({
          value: compositeOperation,
          onChange: this._onChangeScatterPlotStyle('compositeOperation', String)
        }, COMPOSITE_TYPES.map(function _map(type) {
          return r.option({value: type}, type);
        }))
      ]),
      r.div([
        r(PropLabel, 'dotFill'),
        r.select({
          value: dotFill,
          onChange: this._onChangeScatterPlotStyle('dotFill', String)
        }, SAMPLE_COLORS.map(function _map(color) {
          return r.option({value: color}, color);
        }))
      ]),
      r(CodeSnippet, {
        language: 'js',
        text:
          '<MapGL\ {...viewport} mapStyle={mapStyle}>\n' +
          '    <ScatterPlotOverlay \n' +
          '      {...viewport}\n' +
          '      locations={locations}\n' +
          '      dotRadius={' + dotRadius + '} \n' +
          '      globalOpacity={' + globalOpacity + '} \n' +
          '      compositeOperation="' + compositeOperation + '"\n' +
          '      dotFill="' + dotFill + '"\n' +
          '      renderWhileDragging={' + renderWhileDragging + '} \n' +
          '    />\n ' +
          '</MapGL>'
      }),
      r(Markdown, {
        text: '#### locations \nWhere `locations` is an ' +
          '[ImmutableJS](https://facebook.github.' +
          'io/immutable-js/) [List](https://facebook.github.io/immutable-js' +
          '/docs/#/List).'
      }),
      r(CodeSnippet, {
        language: 'js',
        text: fs.readFileSync(path.join(__dirname, 'locations-snippet.js'),
          'utf-8')
      }),
      r(LngLatAccessor)
    ]);
  }
});
