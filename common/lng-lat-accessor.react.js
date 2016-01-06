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
var path = require('path');
var fs = require('fs');
var CodeSnippet = require('./code-snippet.react');
var Markdown = require('./markdown.react');

function LngLatAccessor() {
  return r.div([
    r.h4('lngLatAccessor'),
    r(Markdown, {
      text: 'Have location information in a different format? You can use ' +
        'the `lngLatAccessor` prop to provide your own accessor. It will ' +
        'be called with each location as the first argument. Here\'s the ' +
        'default `lngLatAccessor`.'
    }),
    r(CodeSnippet, {
      language: 'js',
      text: fs.readFileSync(path.join(__dirname, './lng-lat-accessor.js'),
        'utf-8')
    })
  ]);
}

module.exports = LngLatAccessor;
