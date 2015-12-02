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
var Immutable = require('immutable');
var r = require('r-dom');
var transform = require('svg-transform');
var document = require('global/document');
var nop = require('nop');
var config = require('../config');
var mouse = require('../utils').relativeMousePosition;
var ViewportMercator = require('viewport-mercator-project');

var DraggablePointsOverlay = React.createClass({

  displayName: 'DraggablePointsOverlay',

  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    latitude: React.PropTypes.number.isRequired,
    longitude: React.PropTypes.number.isRequired,
    zoom: React.PropTypes.number.isRequired,
    points: React.PropTypes.instanceOf(Immutable.List).isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    keyAccessor: React.PropTypes.func.isRequired,
    lngLatAccessor: React.PropTypes.func.isRequired,
    onAddPoint: React.PropTypes.func.isRequired,
    onUpdatePoint: React.PropTypes.func.isRequired,
    renderPoint: React.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      keyAccessor: function keyAccessor(point) {
        return point.get('id');
      },
      lngLatAccessor: function lngLatAccessor(point) {
        return point.get('location').toArray();
      },
      onAddPoint: nop,
      onUpdatePoint: nop,
      renderPoint: nop,
      isDragging: false
    };
  },

  getInitialState: function _getInitialState() {
    return {
      draggedPointKey: null
    };
  },

  _onDragStart: function _onDragStart(point, event) {
    event.stopPropagation();
    document.addEventListener('mousemove', this._onDrag, false);
    document.addEventListener('mouseup', this._onDragEnd, false);
    this.setState({draggedPointKey: this.props.keyAccessor(point)});
  },

  _onDrag: function _onDrag(event) {
    event.stopPropagation();
    var pixel = mouse(this.refs.container, event);
    var mercator = ViewportMercator(this.props);
    var lngLat = mercator.unproject(pixel);
    var key = this.state.draggedPointKey;
    this.props.onUpdatePoint({key: key, location: lngLat});
  },

  _onDragEnd: function _onDragEnd(event) {
    event.stopPropagation();
    document.removeEventListener('mousemove', this._onDrag, false);
    document.removeEventListener('mouseup', this._onDragEnd, false);
    this.setState({draggedPoint: null});
  },

  _addPoint: function _addPoint(event) {
    event.stopPropagation();
    event.preventDefault();
    var pixel = mouse(this.refs.container, event);
    var mercator = ViewportMercator(this.props);
    this.props.onAddPoint(mercator.unproject(pixel));
  },

  render: function render() {
    var points = this.props.points;
    var mercator = ViewportMercator(this.props);
    return r.svg({
      ref: 'container',
      width: this.props.width,
      height: this.props.height,
      style: assign({
        pointerEvents: 'all',
        position: 'absolute',
        left: 0,
        top: 0,
        cursor: this.props.isDragging ?
          config.CURSOR.GRABBING : config.CURSOR.GRAB
      }, this.props.style),
      onContextMenu: this._addPoint
    }, [
      r.g({style: {cursor: 'pointer'}}, points.map(function _map(point, index) {
        var pixel = mercator.project(this.props.lngLatAccessor(point));
        return r.g({
          key: index,
          transform: transform([{translate: pixel}]),
          onMouseDown: this._onDragStart.bind(this, point),
          style: {
            pointerEvents: 'all'
          }
        }, this.props.renderPoint.call(this, point, pixel));
      }, this))
    ]);
  }
});

module.exports = DraggablePointsOverlay;
