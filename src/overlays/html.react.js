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
var r = require('r-dom');
var assign = require('object-assign');

var HTMLOverlay = React.createClass({
  displayName: 'HTMLOverlay',
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    redraw: React.PropTypes.func,
    project: React.PropTypes.func,
    isDragging: React.PropTypes.bool
  },
  render: function render() {
    var style = assign({}, {
      position: 'absolute',
      pointerEvents: 'none',
      width: this.props.width,
      height: this.props.height,
      left: 0,
      top: 0
    }, this.props.style);
    return r.div({
      ref: 'overlay',
      style: style
    }, this.props.redraw({
      width: this.props.width,
      height: this.props.height,
      project: this.props.project,
      isDragging: this.props.isDragging
    }));
  }
});

module.exports = HTMLOverlay;
