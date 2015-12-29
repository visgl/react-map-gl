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
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var createHistory = require('history/lib/createHashHistory');
var document = require('global/document');

var history = createHistory({
    queryKey: false
});

var contents = {
    'Getting Started':
        require('./content/getting-started/getting-started'),
    'Scatterplot':
        require('./content/scatterplot/scatterplot'),
    'Draggable Points':
        require('./content/draggable-points/draggable-points'),
    'Third Party Overlays':
        require('./content/third-party-overlay/third-party-overlay')
};

var titles = Object.keys(contents);

var Sidebar = React.createClass({
    render: function render() {
        var items = [];
        for (var i = 0; i < titles.length; i++) {
            var title = titles[i];
            items.push(
                r.a({
                    href: '#' + title
                }, title)
            );
            items.push(r.br());
        }
        return r.div(items);
    }
});

var routes = [{
    path: '/',
    component: contents['Getting Started']
}];

for (var i = 0; i < titles.length; i++) {
    var title = titles[i];
    routes.push({
        path: title,
        component: contents[title]
    });
}

ReactDOM.render(r(Sidebar), document.getElementById('sidebar'));
ReactDOM.render(r(Router, {routes: routes, history: history}),
document.getElementById('content'));
