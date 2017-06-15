# Draggable Points Overlay

This is an example overlay that renders draggable points over a map.

```jsx
var DraggablePointsOverlay = require('./draggable-points-overlay');

<MapGL {...viewport} mapStyle={mapStyle}>
  <DraggablePointsOverlay
    points={this.state.draggablePoints}
    onAddPoint={this._onAddPoint}
    onUpdatePoint={this._updatePoint}
    renderPoint={point => <circle r="10" style={{fill: 'red'}}/>}
  />
</MapGL>
```

## Props

#### points

An [ImmutableJS](https://facebook.github.io/immutable-js/) [List](https://facebook.github.io/immutable-js/docs/#/List) of geo locations.

```js
const points = Immutable.fromJS([
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
function renderPoint(point) {
  const scale = point.get('id') / 10 + 1;
  return (
    <g transform={'scale(' + scale + ')'}>
      <circle r="10" />
      <text style={{fill: 'white', textAnchor: 'middle'}} y="6">
        {point.get('id')}
      </text>
    </g>
  );
}
```

#### onUpdatePoint

A required prop called whenever the position of a point is being updated by the user. It's first argument is an object that contains the selected elements `key` (returned from `keyAccessor`) and the location as a `[lng, lat]` array.

Here's what a typical callback looks like.'

```
function updatePoint({key, location}) {
  const points = this.state.points.map(point => {
    const id = point.get('id');
    return id === key ? point.set('location', List(location)) : point;
  });
  this.setState({points: points});
}
```

#### onAddPoint

A required prop called whenever the user right clicks on the map. It's passed the `[lng, lat]` array of where the user clicked.

```js
function addPoint(location) {
  var {points} = this.state;
  var point = Immutable.fromJS({id: points.last().get('id') + 1, location});
  this.setState({points: points.push(point)});
}
```
