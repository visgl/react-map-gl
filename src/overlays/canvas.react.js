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
var ViewportMercator = require('viewport-mercator-project');
var window = require('global/window');
var r = require('r-dom');

var CanvasOverlay = React.createClass({

  displayName: 'CanvasOverlay',

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    latitude: React.PropTypes.number.isRequired,
    longitude: React.PropTypes.number.isRequired,
    zoom: React.PropTypes.number.isRequired,
    redraw: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired
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
    ctx.save();
    ctx.scale(pixelRatio, pixelRatio);
    var mercator = ViewportMercator(this.props);
    this.props.redraw({
      width: this.props.width,
      height: this.props.height,
      ctx: ctx,
      project: mercator.project,
      unproject: mercator.unproject,
      isDragging: this.props.isDragging
    });
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
        left: 0,
        top: 0
      }
    });
  }
});

module.exports = CanvasOverlay;
