'use strict';

var assign = require('object-assign');
var r = require('r-dom');
var Immutable = require('immutable');
var React = require('react');
var document = require('global/document');
var markdown = require('./markdown');
var fs = require('fs');
var MapGL = require('react-map-gl');
var ScatterPlotOverlay = require('react-map-gl/src/overlays/scatterplot.react');
var osmMapStyle = require('./osm-map-style');
var CodeSnippet = require('./code-snippet.react');
var d3 = require('d3');

var Docs = React.createClass({

  getInitialState: function getInitialState() {
    var normal = d3.random.normal();
    function wiggle(scale) {
      return normal() * scale;
    }
    return {
      map: {
        latitude: 37.78,
        longitude: -122.45,
        zoom: 11,
        mapStyle: osmMapStyle,
        width: 450,
        height: 450,
        startDragLatLng: null
      },
      locations: Immutable.fromJS(d3.range(4000).map(function _map() {
        return [37.788 + wiggle(0.01), -122.408 + wiggle(0.01)];
      }))
    };
  },

  _onChangeViewport: function _onChangeViewport(opt) {
    this.setState({map: assign({}, this.state.map, opt)});
  },

  render: function render() {
    return r.div({
      style: {
        width: 900,
        margin: '30px auto auto auto'
      }
    }, [
      r.h1('react-map-gl'),
      r(markdown, {text: fs.readFileSync('text/introductions.md', 'utf-8')}),
      r(CodeSnippet, {
        language: 'html',
        text: '<MapGL width={' + this.state.map.width + '} ' +
        'height={' + this.state.map.height + '} ' +
        'latitude={' + d3.round(this.state.map.latitude, 3) + '} ' +
        'longitude={' + d3.round(this.state.map.longitude, 3) + '} ' +
        'zoom={' + d3.round(this.state.map.zoom, 3) + '} ' +
        'mapStyle={maStyle}/>'
      }),
      r.br(),
      r(MapGL, assign({onChangeViewport: this._onChangeViewport},
        this.state.map)),
      r.br(),
      r(markdown, {
        text: fs.readFileSync('text/scatterplot-example.md', 'utf-8')
      }),
      r(CodeSnippet, {
        language: 'html',
        text: '<MapGL width={' + this.state.map.width + '} ' +
        'height={' + this.state.map.height + '} ' +
        'latitude={' + d3.round(this.state.map.latitude, 3) + '} ' +
        'longitude={' + d3.round(this.state.map.longitude, 3) + '} ' +
        'zoom={' + d3.round(this.state.map.zoom, 3) + '} ' +
        'mapStyle={maStyle}>\n' +
          '  <ScatterPlotOverlay \n' +
          '    locations={locations}\n' +
          '    dotRadius={2} \n' +
          '    globalOpacity={1} \n' +
          '    compositeOperation=\'screen\' /> \n' +
        '</MapGL>'
      }),
      r.br(),
      r(MapGL, assign({onChangeViewport: this._onChangeViewport},
        this.state.map), [
        r(ScatterPlotOverlay, {
          locations: this.state.locations,
          dotRadius: 2,
          globalOpacity: 1,
          compositeOperation: 'screen'
        })
      ])
    ]);
  }
});

React.render(r(Docs), document.body);

/* eslint-disable no-unused-vars */
var css = require('./css');
/* eslint-enable no-unused-vars */
