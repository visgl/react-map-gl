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

var r = require('r-dom');
var React = require('react');
var ReactDOM = require('react-dom');
var document = require('global/document');
var setLocationHash = require('set-location-hash');

var contents = {
  'Getting Started': require('./content/getting-started/getting-started'),
  'Scatterplot': require('./content/scatterplot/scatterplot'),
  'Draggable Points': require('./content/draggable-points/draggable-points'),
  'Third Party Overlays': require('./content/third-party-overlay/third-party-overlay'),
}

var titles = Object.keys(contents);

var MenuItem = React.createClass({

  componentDidMount: function() {
    if (this.props.active) {
      this.handleClick();
    }
  },

  handleClick: function() {
    ReactDOM.render(r(this.props.component), this.props.content);
    setLocationHash(this.props.title);
  },

  render: function() {
      return r.p({
        className: 'menuitem',
        onClick: this.handleClick
      }, this.props.title);
  }

});


module.exports = React.createClass({

  render: function(render) {
    var items = [];
    for (var i = 0; i < titles.length; i++) {
      var title = titles[i];
      var component = contents[title];
      items.push(r(MenuItem, {
        title: title,
        component: component,
        content: this.props.content,
        active: this.props.active === title
      }));
    }
    return r.div(items);
  }

});
