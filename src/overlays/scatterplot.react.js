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

var React = require('react');
var window = require('global/window');
var r = require('r-dom');
var round = require('../utils.js').round;
var Immutable = require('immutable');
var COMPOSITE_TYPES = require('canvas-composite-types');
var ViewportMercator = require('viewport-mercator-project');

var ScatterplotOverlay = React.createClass({

  displayName: 'ScatterplotOverlay',

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    latitude: React.PropTypes.number.isRequired,
    longitude: React.PropTypes.number.isRequired,
    zoom: React.PropTypes.number.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    locations: React.PropTypes.instanceOf(Immutable.List).isRequired,
    lngLatAccessor: React.PropTypes.func.isRequired,
    renderWhileDragging: React.PropTypes.bool,
    globalOpacity: React.PropTypes.number.isRequired,
    dotRadius: React.PropTypes.number.isRequired,
    dotFill: React.PropTypes.string.isRequired,
    compositeOperation: React.PropTypes.oneOf(COMPOSITE_TYPES).isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      lngLatAccessor: function lngLatAccessor(location) {
        return [location.get(0), location.get(1)];
      },
      renderWhileDragging: true,
      dotRadius: 4,
      dotFill: '#1FBAD6',
      globalOpacity: 1,
      // Same as browser default.
      compositeOperation: 'source-over'
    };
  },

  componentDidMount: function componentDidMount() {
    this._redraw();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._redraw();
  },

  _redraw: function _redraw() {
    var pixelRatio = window.devicePixelRatio || 1;
    var canvas = this.refs.overlay;
    var ctx = canvas.getContext('2d');
    var props = this.props;
    var radius = this.props.dotRadius;
    var fill = this.props.dotFill;
    ctx.save();
    ctx.scale(pixelRatio, pixelRatio);
    ctx.clearRect(0, 0, props.width, props.height);
    ctx.globalCompositeOperation = this.props.compositeOperation;
    var mercator = ViewportMercator(this.props);
    if ((this.props.renderWhileDragging || !this.props.isDragging) &&
      this.props.locations
    ) {
      this.props.locations.forEach(function _forEach(location) {
        var pixel = mercator.project(this.props.lngLatAccessor(location));
        var pixelRounded = [round(pixel[0], 1), round(pixel[1], 1)];
        if (pixelRounded[0] + radius >= 0 &&
            pixelRounded[0] - radius < props.width &&
            pixelRounded[1] + radius >= 0 &&
            pixelRounded[1] - radius < props.height
        ) {
          ctx.fillStyle = fill;
          ctx.beginPath();
          ctx.arc(pixelRounded[0], pixelRounded[1], radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }, this);
    }
    ctx.restore();
  },

  render: function render() {
    var pixelRatio = window.devicePixelRatio || 1;
    return r.canvas({
      ref: 'overlay',
      width: this.props.width * pixelRatio,
      height: this.props.height * pixelRatio,
      style: {
        width: this.props.width + 'px',
        height: this.props.height + 'px',
        position: 'absolute',
        pointerEvents: 'none',
        opacity: this.props.globalOpacity,
        left: 0,
        top: 0
      }
    });
  }
});

module.exports = ScatterplotOverlay;
