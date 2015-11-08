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
var d3 = require('d3');
var r = require('r-dom');
var Immutable = require('immutable');
var COMPOSITE_TYPES = require('canvas-composite-types');
var scaleRelativeToZoom = require('./../utils').scaleRelativeToZoom;

function scaleRelativeToZoom(radius, relativeToZoom, zoom) {
  return radius * Math.pow(2, zoom) / Math.pow(2, relativeToZoom);
}

var ScatterplotOverlay = React.createClass({
  displayName: 'ScatterplotOverlay',

  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    project: React.PropTypes.func,
    isDragging: React.PropTypes.bool,
    dots: React.PropTypes.instanceOf(Immutable.List),
    latLngAccessor: React.PropTypes.func,
    radiusAccesor: React.PropTypes.func,
    renderWhileDragging: React.PropTypes.bool,
    globalOpacity: React.PropTypes.number,
    dotFill: React.PropTypes.string,
    compositeOperation: React.PropTypes.oneOf(COMPOSITE_TYPES),
    zoom: React.PropTypes.number,
    initZoom: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      latLngAccessor: function latLngAccessor(dot) {
        return [dot.get('location').get(0), dot.get('location').get(1)];
      },
      radiusAccesor: function radiusAccesor(dot){
        return dot.get('value');
      },
      renderWhileDragging: true,
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
    var pixelRatio = window.devicePixelRatio;
    var canvas = this.getDOMNode();
    var ctx = canvas.getContext('2d');
    var props = this.props;
    var fill = this.props.dotFill;
    var scalar = scaleRelativeToZoom(this.props.zoom, this.props.initZoom);
    ctx.save();
    ctx.scale(pixelRatio, pixelRatio);
    ctx.clearRect(0, 0, props.width, props.height);
    ctx.globalCompositeOperation = this.props.compositeOperation;
    if ((this.props.renderWhileDragging || !this.props.isDragging) &&
      this.props.dots
    ) {
      this.props.dots.forEach(function _forEach(dot) {
        var latLng = this.props.latLngAccessor(dot);
        var radius = this.props.radiusAccesor(dot);
        radius *= scalar;
        var pixel = this.props.project(latLng);
        var pixelRounded = [d3.round(pixel.x, 1), d3.round(pixel.y, 1)];
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
    var pixelRatio = window.devicePixelRatio;
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
