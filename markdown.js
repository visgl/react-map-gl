'use strict';

var marked = require('marked');
var r = require('r-dom');
var React = require('react');
var hljs = require('highlight.js');
var d3 = require('d3');

module.exports = React.createClass({
  displayName: 'Markdown',

  propTypes: {
    text: React.PropTypes.string.isRequired
  },

  render: function render() {
    return r.div({
      dangerouslySetInnerHTML: {
        __html: marked(this.props.text)
      }
    });
  }
});
