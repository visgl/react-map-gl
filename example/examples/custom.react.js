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
var window = require('global/window');
var alphaify = require('alphaify');
var transform = require('svg-transform');
var Immutable = require('immutable');
var r = require('r-dom');

var MapGL = require('../../src/index.js');
var CanvasOverlay = require('../../src/overlays/canvas.react');
var SVGOverlay = require('../../src/overlays/svg.react');

// San Francisco
var location = require('./../data/cities.json')[0];

var wiggle = (function _wiggle() {
  var normal = d3.random.normal();
  return function __wiggle(scale) {
    return normal() * scale;
  };
}());

// Example data.
var locations = Immutable.fromJS(d3.range(30).map(function _map() {
  return [location.longitude + wiggle(0.01), location.latitude + wiggle(0.01)];
}));

var OverlayExample = React.createClass({

  displayName: 'OverlayExample',

  PropTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: 12.4,
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

  render: function render() {
    return r(MapGL, assign({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      zoom: this.state.zoom,
      startDragLatLng: this.state.startDragLatLng,
      isDragging: this.state.isDragging,
      width: this.props.width,
      height: this.props.height,
      onChangeViewport: this.props.onChangeViewport || this._onChangeViewport
    }, this.props), [
      r(CanvasOverlay, {redraw: function _redrawCanvas(opt) {
        var p1 = opt.project([location.longitude, location.latitude]);
        opt.ctx.clearRect(0, 0, opt.width, opt.height);
        opt.ctx.strokeStyle = alphaify('#1FBAD6', 0.4);
        opt.ctx.lineWidth = 2;
        locations.forEach(function forEach(loc, index) {
          opt.ctx.beginPath();
          var p2 = opt.project(loc.toArray());
          opt.ctx.moveTo(p1[0], p1[1]);
          opt.ctx.lineTo(p2[0], p2[1]);
          opt.ctx.stroke();
          opt.ctx.beginPath();
          opt.ctx.fillStyle = alphaify('#1FBAD6', 0.4);
          opt.ctx.arc(p2[0], p2[1], 6, 0, 2 * Math.PI);
          opt.ctx.fill();
          opt.ctx.beginPath();
          opt.ctx.fillStyle = '#FFFFFF';
          opt.ctx.textAlign = 'center';
          opt.ctx.fillText(index, p2[0], p2[1] + 4);
        });
      }}),
      // We use invisible SVG elements to support interactivity.
      r(SVGOverlay, {
        redraw: function _redrwaSVGOverlay(opt) {
          var p1 = opt.project([location.longitude, location.latitude]);
          var style = {
            // transparent but still clickable.
            fill: 'rgba(0, 0, 0, 0)'
          };
          return r.g({
            style: {
              pointerEvents: 'all',
              cursor: 'pointer'
            }
          }, [r.circle({
              style: assign({}, style, {stroke: alphaify('#1FBAD6', 0.8)}),
              r: 10,
              onClick: function onClick() {
                var windowAlert = window.alert;
                windowAlert('center');
              },
              transform: transform([{translate: p1}]),
              key: 0
            })].concat(locations.map(function _map(loc, index) {
              return r.circle({
                style: style,
                r: 6,
                onClick: function onClick() {
                  var windowAlert = window.alert;
                  windowAlert('dot ' + index);
                },
                transform: transform([{translate: opt.project(loc.toArray())}]),
                key: index + 1
              });
            }, this))
          );
        }.bind(this)
      })
    ]);
  }
});

module.exports = OverlayExample;
