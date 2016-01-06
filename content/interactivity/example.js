var assign = require('object-assign');
var MapGL = require('react-map-gl');
var React = require('react');
var Immutable = require('immutable');
var rasterTileStyle = require('raster-tile-style');

var InteractiveMap = React.createClass({
  getInitialState() {
    var tileSource = '//tile.stamen.com/toner/{z}/{x}/{y}.png';
    var mapStyle = Immutable.fromJS(rasterTileStyle([tileSource]));
    return {
      viewport: {
        latitude: 37.78,
        longitude: -122.45,
        zoom: 11,
        width: 800,
        height: 800,
        startDragLngLat: null,
        isDragging: null
      },
      mapStyle: mapStyle
    };
  },

  _onChangeViewport(newViewport) {
    var viewport = assign({}, this.state.viewport, newViewport);
    this.setState({viewport});
  },

  render() {
    var {mapStyle, viewport} = this.state;
    return <MapGL
      onChangeViewport={this._onChangeViewport}
      mapStyle={mapStyle}
      {...viewport}
    />;
  }
});

module.exports = InteractiveMap;