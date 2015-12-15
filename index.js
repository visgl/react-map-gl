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
var Immutable = require('immutable');
var React = require('react');
var document = require('global/document');
var markdown = require('./markdown');
var fs = require('fs');
var MapGL = require('react-map-gl');
var ScatterPlotOverlay = require('react-map-gl/src/overlays/scatterplot.react');
/* eslint-disable max-len */
var DraggablePoints = require('react-map-gl/src/overlays/draggable-points.react');
/* eslint-enable max-len */
var HeatmapOverlay = require('react-map-gl-heatmap-overlay');
var stamenMapStyle = require('./stamen-map-style');
var CodeSnippet = require('./code-snippet.react');
var d3 = require('d3');

var initialPoints = [
  {location: [37.79450507471435, -122.39508481737994], id: 0},
  {location: [37.79227619464379, -122.39750244137034], id: 1},
  {location: [37.789251178427776, -122.4013303460217], id: 2},
  {location: [37.786862920252986, -122.40475531334141], id: 3},
  {location: [37.78861431712821, -122.40505751634022], id: 4},
  {location: [37.79060449046487, -122.40556118800487], id: 5},
  {location: [37.790047247333675, -122.4088854209916], id: 6},
  {location: [37.79275381746233, -122.4091876239904], id: 7},
  {location: [37.795619489534374, -122.40989276432093], id: 8},
  {location: [37.79792786675678, -122.41049717031848], id: 9},
  {location: [37.80031576728801, -122.4109001076502], id: 10},
  {location: [37.79920142331301, -122.41916032295062], id: 11}
];

var pointIds = initialPoints[initialPoints.length - 1].id;

var Docs = React.createClass({

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
        width: 450,
        height: 450,
        startDragLatLng: null
      },
      draggablePoints: Immutable.fromJS(initialPoints),
      locations: Immutable.fromJS(d3.range(2000).map(function _map() {
        return [37.788 + wiggle(0.01), -122.408 + wiggle(0.01)];
      }))
    };
  },

  _onAddPoint: function _onAddPoint(_location) {
    var points = this.state.draggablePoints.push(new Immutable.Map({
      location: new Immutable.List(_location),
      id: ++pointIds
    }));
    this.setState({draggablePoints: points});
  },

  _onUpdatePoint: function _onUpdatePoint(opt) {
    var index = this.state.draggablePoints.findIndex(function filter(p) {
      return p.get('id') === opt.key;
    });
    var point = this.state.draggablePoints.get(index);
    point = point.set('location', new Immutable.List(opt.location));
    var points = this.state.draggablePoints.set(index, point);
    this.setState({draggablePoints: points});
  },

  _onChangeViewport: function _onChangeViewport(opt) {
    this.setState({map: assign({}, this.state.map, opt)});
  },

  render: function render() {
    return r.div({
      style: {
        width: 900,
        margin: '30px auto auto auto'
      }
    }, [
      r.h1('react-map-gl'),
      r(markdown, {text: fs.readFileSync('text/introductions.md', 'utf-8')}),
      r(CodeSnippet, {
        language: 'html',
        text: '<MapGL width={' + this.state.map.width + '} ' +
        'height={' + this.state.map.height + '} ' +
        'latitude={' + d3.round(this.state.map.latitude, 3) + '} ' +
        'longitude={' + d3.round(this.state.map.longitude, 3) + '} ' +
        'zoom={' + d3.round(this.state.map.zoom, 3) + '} ' +
        'mapStyle={maStyle}/>'
      }),
      r.br(),
      r(MapGL, assign({onChangeViewport: this._onChangeViewport},
        this.state.map)),
      r.br(),
      r(markdown, {
        text: fs.readFileSync('text/scatterplot-example.md', 'utf-8')
      }),
      r(CodeSnippet, {
        language: 'html',
        text: '<MapGL width={' + this.state.map.width + '} ' +
        'height={' + this.state.map.height + '} ' +
        'latitude={' + d3.round(this.state.map.latitude, 3) + '} ' +
        'longitude={' + d3.round(this.state.map.longitude, 3) + '} ' +
        'zoom={' + d3.round(this.state.map.zoom, 3) + '} ' +
        'mapStyle={maStyle}>\n' +
          '  <ScatterPlotOverlay \n' +
          '    locations={locations}\n' +
          '    dotRadius={2} \n' +
          '    globalOpacity={1} \n' +
          '    compositeOperation=\'screen\' /> \n' +
        '</MapGL>'
      }),
      r.br(),
      r(markdown, {
        text: 'Where `locations` is an [ImmutableJS](https://facebook.github.' +
          'io/immutable-js/) List of logitude/latitude pairs'
      }),
      r(CodeSnippet, {
        language: 'js',
        text: fs.readFileSync('text/locations-snippet.txt', 'utf-8')
      }),
      r(MapGL, assign({onChangeViewport: this._onChangeViewport},
        this.state.map), [
        r(ScatterPlotOverlay, {
          locations: this.state.locations,
          dotRadius: 2,
          globalOpacity: 1,
          compositeOperation: 'screen'
        })
      ]),
      r.br(),
      r(markdown, {
        text: fs.readFileSync('text/draggable-points-overlay.md', 'utf-8')
      }),
      r(MapGL, assign({onChangeViewport: this._onChangeViewport},
        this.state.map), [
        r(DraggablePoints, {
          points: this.state.draggablePoints,
          onAddPoint: this._onAddPoint,
          onUpdatePoint: this._onUpdatePoint,
          renderPoint: function renderPoint(point, pixel) {
            return r.g({}, [
              r.circle({
                r: 10,
                style: {
                  fill: alphaify('#1FBAD6', 0.5),
                  pointerEvents: 'all'
                }
              }),
              r.text({
                style: {fill: 'white', textAnchor: 'middle'},
                y: 5
              }, point.get('id'))
            ]);
          }
        })
      ]),
      r.br(),
      r(markdown, {
        text: fs.readFileSync('text/third-party-overlays.md', 'utf-8')
      }),
      r(CodeSnippet, {
        language: 'js',
        text: fs.readFileSync('text/overlay-props.txt', 'utf-8')
      }),
      r(markdown, {
        text: fs.readFileSync('text/third-party-overlay-example.md', 'utf-8')
      }),
      r(CodeSnippet, {
        language: 'html',
        text: '<MapGL width={' + this.state.map.width + '} ' +
        'height={' + this.state.map.height + '} ' +
        'latitude={' + d3.round(this.state.map.latitude, 3) + '} ' +
        'longitude={' + d3.round(this.state.map.longitude, 3) + '} ' +
        'zoom={' + d3.round(this.state.map.zoom, 3) + '} ' +
        'mapStyle={maStyle}>\n' +
        '  <HeatmapOverlay ...overlayProps /> \n' +
        '</MapGL>'
      }),
      r(MapGL, assign({onChangeViewport: this._onChangeViewport},
        this.state.map), [
        r(HeatmapOverlay, {
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
        })
      ])
    ]);
  }
});

React.render(r(Docs), document.body);

/* eslint-disable no-unused-vars */
var css = require('./css');
/* eslint-enable no-unused-vars */
