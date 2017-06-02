# Draggable Points Overlay

```js
var ScatterPlotOverlay = require('react-map-gl/src/overlays/scatterplot.react;
```

This is a live example of the [`<DraggablePoints>`](https://github.com/uber/react-map-gl/blob/master/src/overlays/draggable-points.react.js) overlay.

TODO - live example
```
      r(MapGL, this.state.map, [
        r(DraggablePoints, assign({}, this.state.map, {
          points: this.state.draggablePoints,
          // onAddPoint: this._onAddPoint,
          onUpdatePoint: this._onUpdatePoint,
          renderPoint: function renderPoint(point) {
            return r.circle({r: 10, style: {fill: 'red'}});
          }
        })),
        r(Attribute, this.state.map)
      ]),
```

```js
  <MapGL {...viewport} mapStyle={mapStyle}>
    <DraggablePoints
      {...viewport}
      points={points}
      onUpdatePoint={this._updatePoint}
      renderPoint={point => <circle r="10" style={{fill: 'red'}}/>}
    />
  </MapGL>
```

## Props

#### points

'Expected to be an [ImmutableJS](https://facebook.github.io/immutable-js/) [List](https://facebook.github.io/immutable-js/docs/#/List) of locations.

```js
var points = Immutable.fromJS([\n'
  {location:[-122.39508481737994, 37.79450507471435 ], id: 0},
  {location:[-122.39750244137034, 37.79227619464379 ], id: 1},
  {location:[-122.4013303460217,  37.789251178427776], id: 2},
  ...
]);
```

#### lngLatAccessor

Use the `lngLatAccessor` prop to provide the location in a custom format. It's called with each location as the first argument. Here's the default `lngLatAccessor`.

```js
function lngLatAccessor(point) {
  return point.get('location').toArray();
}
```

#### keyAccessor

The `keyAccessor` is what allows the ' +
`<DraggablePointsOverlay>` to uniquely identify each point. ' +
The default `keyAccessor` assumes each point has an `id` property.'

```js
function keyAccessor(point) {
  return point.get('id');
}
```

#### renderPoint

A required prop used to control the look of each point. It takes as the first argument the `point` to be rendered. The return value should be a React SVG element. Here's a more complex example then the one above.

```js
<MapGL {...viewport} mapStyle={mapStyle}>
    <DraggablePoints
      {...viewport}
      points={points}
      onUpdatePoint={this.updatePoint}
      renderPoint={point => {
        var scale = point.get('id') / 10 + 1;
        return <g transform={'scale(' + scale + ')'}>
          <circle r="10"></circle>
          <text style={{fill: 'white', textAnchor: 'middle'}} y="6">
            {point.get('id')}
          </text>
        </g>;
      }}
    />
</MapGL>
```


TODO - live example
```
r(MapGL, this.state.map, [
  r(DraggablePoints, assign({}, this.state.map, {
    points: this.state.draggablePoints,
    // onAddPoint: this._onAddPoint,
    onUpdatePoint: this._onUpdatePoint,
    renderPoint: function renderPoint(point) {
      var scale = point.get('id') / 10 + 1;
      return r.g({transform: 'scale(' + scale + ')'}, [
        r.circle({r: 5, style: {fill: 'red'}}),
        r.rect({width: 2, height: 10, transform: 'translate(-1, -5)'}),
        r.rect({width: 10, height: 2, transform: 'translate(-5, -1)'}),
        r.text({
          style: {
            fill: 'black',
            textAnchor: 'middle',
            stroke: 'white',
            strokeWidth: 0.5},
          x: 5
        }, point.get('id'))
      ]);
    }
  })),
  r(Attribute, this.state.map)
])
```

#### onUpdatePoint

A required prop called whenever the position of a point is being updated by the user. It's first argument is an object that contains the selected elements `key` (returned from `keyAccessor`) and the location as a `[lng, lat]` array.

Here's what a typical callback looks like.'

```
updatePoint({key, location}) {
  var points = this.state.points.map(point => {
    var id = point.get('id');
    return id === key ? point.set('location', List(location)) : point;
  });
  this.setState({points: points});
}
```

#### onAddPoint

A required prop called whenever the user right clicks on the map. It's passed the `[lng, lat]` array of where the user clicked.

```js
addPoint(location) {
  var {points} = this.state;
  var point = Immutable.fromJS({id: points.last().get('id') + 1, location});
  this.setState({points: points.push(point)});
}
```
