# Interactivity

Being a stateless component, the `<MapGL>` instance won't change what's shown in
its viewport unless it receives new props.

To update the `<MapGL>` component's viewport, use the `onChangeViewport` callback.
A `viewport` object includes the set of props that determines what to show in the
map so if you're using JSX, the following...

```js
<MapGL
  width={' + this.state.map.width + '}
  height={' + this.state.map.height + '}
  latitude={' + d3.round(this.state.map.latitude, 3) + '}
  longitude={' + d3.round(this.state.map.longitude, 3) + '}
  zoom={' + d3.round(this.state.map.zoom, 3) + '}
  mapStyle={mapStyle} />
```
is equivalent to...'}),

```js
<MapGL {...viewport} mapStyle={mapStyle} />
```

assuming that...

```js
var viewport = {
  width: ' + this.state.map.width + ',
  height: ' + this.state.map.height + ',
  latitude: ' + d3.round(this.state.map.latitude, 3) + ',
  longitude: ' + d3.round(this.state.map.longitude, 3) + ',
  zoom: ' + d3.round(this.state.map.zoom, 3) + '
  };'
```

To support panning and zooming, pass a callback function as the `onChangeViewport` prop.

TODO - interactive example
```js
r(MapGL, assign({onChangeViewport: this._onChangeViewport},
  this.state.map), [
    r(Attribute, this.state.map)
  ]
),
```

```js
render() {
  var {viewport} = this.state;
  return <MapGL
    {...viewport}
    onChangeViewport={viewport => this.setState({viewport})}
  />;
}
```

Alternatively, to prevent the component from being interactive, don't pass it an `onChangeViewport()` callback.

TODO - Interactive Example
```js
      r(MapGL, assign({}, this.state.map, {height: 200}), [
        r(Attribute, assign({}, this.state.map, {height: 200}))
      ]),
```

The `viewport` object returned from `onChangeViewport()` also includes two other important pieces of state. They're `isDragging` and `startDragLngLat`. To support typical interactive usecases, pass them back as props to the <MapGL /> component. The component works this way to be stateless.'
      }),
## Complete example Here's a complete example you can copy and paste into your own project.'

```js
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
```
