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
var d3Array = require('d3-array');
var d3Scale = require('d3-scale');
var r = require('r-dom');
var Immutable = require('immutable');

var ChoroplethOverlay = React.createClass({

  displayName: 'ChoroplethOverlay',

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    latitude: React.PropTypes.number.isRequired,
    longitude: React.PropTypes.number.isRequired,
    zoom: React.PropTypes.number.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    renderWhileDragging: React.PropTypes.bool.isRequired,
    globalOpacity: React.PropTypes.number.isRequired,
    /**
      * An Immutable List of feature objects.
      */
    features: React.PropTypes.instanceOf(Immutable.List),
    colorDomain: React.PropTypes.array,
    colorRange: React.PropTypes.array.isRequired,
    valueAccessor: React.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      renderWhileDragging: true,
      globalOpacity: 1,
      colorDomain: null,
      colorRange: ['#FFFFFF', '#1FBAD6'],
      valueAccessor: function valueAccessor(feature) {
        return feature.get('properties').get('value');
      }
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
    var canvas = this.refs.overlay;
    var ctx = canvas.getContext('2d');
    var mercator = ViewportMercator(this.props);

    ctx.save();
    ctx.scale(pixelRatio, pixelRatio);
    ctx.clearRect(0, 0, this.props.width, this.props.height);

    function projectPoint(lon, lat) {
      var point = mercator.project([lon, lat]);
      /* eslint-disable no-invalid-this */
      this.stream.point(point[0], point[1]);
      /* eslint-enable no-invalid-this */
    }

    if (this.props.renderWhileDragging || !this.props.isDragging) {
      // var transform = d3.geo.transform({point: projectPoint});
      // var path = d3.geo.path().projection(transform).context(ctx);
      this._drawFeatures(ctx, path);
    }
    ctx.restore();
  },

  _drawFeatures: function _drawFeatures(ctx, path) {
    var colorDomain = this.props.colorDomain;
    var features = this.props.features;
    if (!features) {
      return;
    }
    if (!colorDomain) {
      colorDomain = d3Array.extent(features.toArray(), this.props.valueAccessor);
    }
    var colorScale = d3Scale.scaleLinear()
      .domain(colorDomain)
      .range(this.props.colorRange)
      .clamp(true);
    features.forEach(function _forEach(feature) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = '1';
      ctx.fillStyle = colorScale(this.props.valueAccessor(feature));
      var geometry = feature.get('geometry');
      path({
        type: geometry.get('type'),
        coordinates: geometry.get('coordinates').toJS()
      });
      ctx.fill();
      ctx.stroke();
    }, this);
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

module.exports = ChoroplethOverlay;
