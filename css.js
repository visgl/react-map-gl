'use strict';

var jss = require('js-stylesheet');
var fs = require('fs');
var d3 = require('d3');

function addStyleSheet(text) {
  d3.select('body').append('style')
    .attr('type', 'text/css')
    .text(text);
}

jss({
  body: {
    'font-family': 'helvetica'
  },
  h1: {
    'font-size': '40px',
    'font-weight': '300'
  }
});

addStyleSheet(
  fs.readFileSync('node_modules/highlight.js/styles/tomorrow.css', 'utf-8')
);
