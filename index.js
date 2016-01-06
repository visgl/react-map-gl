'use strict';

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

var r = require('r-dom');
var assign = require('object-assign');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var createHistory = require('history/lib/createHashHistory');
var document = require('global/document');
var history = createHistory({queryKey: false});
var routes = [
  {
    title: 'Getting Started',
    component: require('./content/getting-started'),
    path: '/'
  }, {
    title: 'Interactivity',
    component: require('./content/interactivity')
  }, {
    title: 'Scatterplot',
    component: require('./content/scatterplot')
  }, {
    title: 'Draggable Points',
    component: require('./content/draggable-points')
  }, {
    title: 'Third Party Overlays',
    component: require('./content/third-party-overlay')
  }
].map(function _map(content) {
  var slug = content.title.toLowerCase().replace(/ /g, '-');
  return assign({path: slug}, content);
});
var Sidebar = React.createClass({
  render: function render() {
    return r.div(routes.map(function each(content) {
      var title = content.title;
      return r.a({style: {display: 'block'}, href: '#' + content.path}, title);
    }));
  }
});

ReactDOM.render(r(Sidebar), document.getElementById('sidebar'));
ReactDOM.render(r(Router, {
  routes: routes,
  history: history
}), document.getElementById('content'));
