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
var alphaify = require('alphaify');

var MapGL = require('../../src/index.js');
var DraggableOverlay = require('../../src/overlays/draggable-points.react');
var SVGOverlay = require('../../src/overlays/svg.react');

// A mock example path.
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

var ids = initialPoints[initialPoints.length - 1].id;

var GeodataCreator = React.createClass({

  displayName: 'GeodataCreatorExample',

  PropTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      longitude: -122.40677,
      latitude: 37.78949,
      zoom: 12.76901,
      startDragLatLng: null,
      isDragging: false,
      points: Immutable.fromJS(initialPoints)
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

  _onAddPoint: function _onAddPoint(_location) {
    var points = this.state.points.push(new Immutable.Map({
      location: new Immutable.List(_location),
      id: ++ids
    }));
    this.setState({points: points});
  },

  _onUpdatePoint: function _onUpdatePoint(opt) {
    var index = this.state.points.findIndex(function filter(p) {
      return p.get('id') === opt.key;
    });
    var point = this.state.points.get(index);
    point = point.set('location', new Immutable.List(opt.location));
    var points = this.state.points.set(index, point);
    this.setState({points: points});
  },

  render: function render() {
    return r.div([
      r(MapGL, assign({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        zoom: this.state.zoom,
        width: this.props.width,
        height: this.props.height,
        startDragLatLng: this.state.startDragLatLng,
        isDragging: this.state.isDragging,
        style: {float: 'left'},
        onChangeViewport: this.props.onChangeViewport || this._onChangeViewport
      }, this.props), [
        r(SVGOverlay, {redraw: function _redraw(opt) {
          if (!this.state.points.size) {
            return null;
          }
          var d = 'M' + this.state.points.map(function _map(point) {
            var p = opt.project(point.get('location').toArray());
            return [p.x, p.y];
          }).join('L');
          return r.path({
            style: {stroke: '#1FBAD6', strokeWidth: 2, fill: 'none'},
            d: d
          });
        }.bind(this)}),
        r(DraggableOverlay, {
          points: this.state.points,
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
      ])
    ]);
  }
});

module.exports = GeodataCreator;
