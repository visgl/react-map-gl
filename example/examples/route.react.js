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
var d3 = require('d3');
var r = require('r-dom');
var alphaify = require('alphaify');
var window = require('global/window');
var windowAlert = window.alert;

var MapGL = require('../../src/index.js');
var SVGOverlay = require('../../src/overlays/svg.react');
var CanvasOverlay = require('../../src/overlays/canvas.react');

var ROUTES = require('./../data/routes-example.json');

var color = d3.scale.category10();

var RouteOverlayExample = React.createClass({
  displayName: 'RouteOverlayExample',

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      latitude: 37.7736092599127,
      longitude: -122.42312591099463,
      zoom: 12.011557070552028,
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

  _renderRoute: function _renderRoute(points, index) {
    return r.g({style: {pointerEvents: 'click', cursor: 'pointer'}}, [
      r.g({
        style: {pointerEvents: 'visibleStroke'},
        onClick: function onClick() {
          windowAlert('route ' + index);
        }
      }, [
        r.path({
          d: 'M' + points.join('L'),
          style: {
            fill: 'none',
            stroke: alphaify(color(index), 0.7),
            strokeWidth: 6
          }
        })
      ])
    ]);
  },

  _redrawSVGOverlay: function _redrawSVGOverlay(opt) {
    var routes = ROUTES.map(function _map(route, index) {
      var points = route.coordinates.map(opt.project).map(function __map(p) {
        return [d3.round(p.x, 1), d3.round(p.y, 1)];
      });
      return r.g({key: index}, this._renderRoute(points, index));
    }, this);
    return r.g(routes);
  },

  _redrawCanvasOverlay: function _redrawCanvasOverlay(opt) {
    var ctx = opt.ctx;
    var width = opt.width;
    var height = opt.height;
    ctx.clearRect(0, 0, width, height);
    ROUTES.map(function _map(route, index) {
      route.coordinates.map(opt.project).forEach(function _forEach(p, i) {
        var point = [d3.round(p.x, 1), d3.round(p.y, 1)];
        ctx.fillStyle = d3.rgb(color(index)).brighter(1).toString();
        ctx.beginPath();
        ctx.arc(point[0], point[1], 2, 0, Math.PI * 2);
        ctx.fill();
      });
    });
  },

  render: function render() {
    return r(MapGL, assign({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      zoom: this.state.zoom,
      width: this.props.width,
      height: this.props.height,
      startDragLatLng: this.state.startDragLatLng,
      isDragging: this.state.isDragging,
      onChangeViewport: this.props.onChangeViewport || this._onChangeViewport
    }, this.props), [
      r(SVGOverlay, {redraw: this._redrawSVGOverlay}),
      r(CanvasOverlay, {redraw: this._redrawCanvasOverlay})
    ]);
  }
});

module.exports = RouteOverlayExample;
