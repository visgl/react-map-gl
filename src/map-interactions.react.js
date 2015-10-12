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
var ReactDOM = require('react-dom');
var MapboxGL = require('mapbox-gl');
var Point = MapboxGL.Point;
var document = require('global/document');
var window = require('global/window');
var r = require('r-dom');
var noop = require('./noop');

var ua = typeof window.navigator !== 'undefined' ?
  window.navigator.userAgent.toLowerCase() : '';
var firefox = ua.indexOf('firefox') !== -1;

function mousePos(el, event) {
  var rect = el.getBoundingClientRect();
  event = event.touches ? event.touches[0] : event;
  return new Point(
    event.clientX - rect.left - el.clientLeft,
    event.clientY - rect.top - el.clientTop
  );
}

/* eslint-disable max-len */
// Portions of the code below originally from:
// https://github.com/mapbox/mapbox-gl-js/blob/master/js/ui/handler/scroll_zoom.js
/* eslint-enable max-len */

var MapInteractions = React.createClass({

  displayName: 'MapInteractions',

  PropTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    onMouseDown: React.PropTypes.func,
    onMouseDrag: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onZoom: React.PropTypes.func,
    onZoomEnd: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onMouseDown: noop,
      onMouseDrag: noop,
      onMouseUp: noop,
      onZoom: noop,
      onZoomEnd: noop
    };
  },

  getInitialState: function getInitialState() {
    return {
      startPos: null,
      pos: null,
      mouseWheelPos: null
    };
  },

  _getMousePos: function _getMousePos(event) {
    var el = ReactDOM.findDOMNode(this.refs.container);
    return mousePos(el, event);
  },

  _onMouseDown: function _onMouseDown(event) {
    var pos = this._getMousePos(event);
    this.setState({startPos: pos, pos: pos});
    this.props.onMouseDown({pos: pos});
    document.addEventListener('mousemove', this._onMouseDrag, false);
    document.addEventListener('mouseup', this._onMouseUp, false);
  },

  _onMouseDrag: function _onMouseDrag(event) {
    var pos = this._getMousePos(event);
    this.setState({pos: pos});
    this.props.onMouseDrag({pos: pos});
  },

  _onMouseUp: function _onMouseUp(event) {
    document.removeEventListener('mousemove', this._onMouseDrag, false);
    document.removeEventListener('mouseup', this._onMouseUp, false);
    var pos = this._getMousePos(event);
    this.setState({pos: pos});
    this.props.onMouseUp({pos: pos});
  },

  _onMouseMove: function _onMouseMove(event) {
    var pos = this._getMousePos(event);
    this.props.onMouseMove({pos: pos});
  },

  /* eslint-disable complexity, max-statements */
  _onWheel: function _onWheel(event) {
    event.stopPropagation();
    event.preventDefault();
    var value = event.deltaY;
    // Firefox doubles the values on retina screens...
    if (firefox && event.deltaMode === window.WheelEvent.DOM_DELTA_PIXEL) {
      value /= window.devicePixelRatio;
    }
    if (event.deltaMode === window.WheelEvent.DOM_DELTA_LINE) {
      value *= 40;
    }

    var type = this.state.mouseWheelType;
    var timeout = this.state.mouseWheelTimeout;
    var lastValue = this.state.mouseWheelLastValue;
    var time = this.state.mouseWheelTime;

    var now = (window.performance || Date).now();
    var timeDelta = now - (time || 0);

    var pos = this._getMousePos(event);
    time = now;

    if (value !== 0 && value % 4.000244140625 === 0) {
      // This one is definitely a mouse wheel event.
      type = 'wheel';
      // Normalize this value to match trackpad.
      value = Math.floor(value / 4);
    } else if (value !== 0 && Math.abs(value) < 4) {
      // This one is definitely a trackpad event because it is so small.
      type = 'trackpad';
    } else if (timeDelta > 400) {
      // This is likely a new scroll action.
      type = null;
      lastValue = value;

      // Start a timeout in case this was a singular event, and delay it by up
      // to 40ms.
      timeout = window.setTimeout(function setTimeout() {
        var _type = 'wheel';
        this._zoom(-this.state.mouseWheelLastValue, this.state.mouseWheelPos);
        this.setState({mouseWheelType: _type});
      }.bind(this), 40);
    } else if (!this._type) {
      // This is a repeating event, but we don't know the type of event just
      // yet.
      // If the delta per time is small, we assume it's a fast trackpad;
      // otherwise we switch into wheel mode.
      type = Math.abs(timeDelta * value) < 200 ? 'trackpad' : 'wheel';

      // Make sure our delayed event isn't fired again, because we accumulate
      // the previous event (which was less than 40ms ago) into this event.
      if (timeout) {
        window.clearTimeout(timeout);
        timeout = null;
        value += lastValue;
      }
    }

    // Slow down zoom if shift key is held for more precise zooming
    if (event.shiftKey && value) {
      value = value / 4;
    }

    // Only fire the callback if we actually know what type of scrolling device
    // the user uses.
    if (type) {
      this._zoom(-value, pos);
    }

    this.setState({
      mouseWheelTime: time,
      mouseWheelPos: pos,
      mouseWheelType: type,
      mouseWheelTimeout: timeout,
      mouseWheelLastValue: lastValue
    });
  },
  /* eslint-enable complexity, max-statements */

  _zoom: function _zoom(delta, pos) {

    // Scale by sigmoid of scroll wheel delta.
    var scale = 2 / (1 + Math.exp(-Math.abs(delta / 100)));
    if (delta < 0 && scale !== 0) {
      scale = 1 / scale;
    }
    this.props.onZoom({pos: pos, scale: scale});
    window.clearTimeout(this._zoomEndTimeout);
    this._zoomEndTimeout = window.setTimeout(function _setTimeout() {
      this.props.onZoomEnd();
    }.bind(this), 200);
  },

  render: function render() {
    return r.div({
      ref: 'container',
      onMouseMove: this._onMouseMove,
      onMouseDown: this._onMouseDown,
      onWheel: this._onWheel,
      style: {
        width: this.props.width,
        height: this.props.height,
        position: 'relative'
      }
    }, this.props.children);
  }
});

module.exports = MapInteractions;
