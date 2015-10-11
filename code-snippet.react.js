'use strict';

var r = require('r-dom');
var React = require('react');
var hljs = require('highlight.js');
var d3 = require('d3');

module.exports = React.createClass({
  displayName: 'CodeSnippet',

  propTypes: {
    text: React.PropTypes.string.isRequired
  },

  _updateHighlight: function _updateHighlight() {
    var code = d3.select(this.getDOMNode()).select('code').node();
    hljs.highlightBlock(code);
  },

  componentDidMount: function componentDidMount() {
    this._updateHighlight();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._updateHighlight();
  },

  render: function render() {
    return r.pre({}, [
      r.code({className: this.props.language}, this.props.text)
    ]);
  }
});
