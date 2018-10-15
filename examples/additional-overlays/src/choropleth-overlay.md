# Choropleth Overlay

This is an example overlay that draws choropleths over a map using canvas. Adjust the more interesting props using the controls below.


```js
const ChoroplethOverlay = require('./choropleth-overlay');

<MapGL {...viewport} mapStyle={mapStyle}>
    <ChoroplethOverlay
      features={this.state.features}
      colorDomain={[0, 100]}
      colorRange={['hsl(0.8, 1, 0.8)', 'hsl(0, 1, 1)']}
      valueAccessor={f => f.properties.value}
      globalOpacity={0.8}
      renderWhileDragging={true}
    />
</MapGL>
```

## Props

#### features
An [ImmutableJS](https://facebook.github.io/immutable-js/) [List](https://facebook.github.io/immutable-js/docs/#/List) of GeoJSON features.

```js
const features = Immutable.fromJS([
  {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [...]
    }
  },
  ...
]);
```

#### valueAccessor

Use the `valueAccessor` prop to provide the value in a custom property. It's called with each feature as the first argument. Here's the default `valueAccessor`.

```js
function valueAccessor(feature) {
  return feature.get('properties').get('value');
}
```

#### colorDomain

An array of values to be passed to [d3.scaleLinear.domain](https://github.com/d3/d3-scale#linear-scales).
It reflects the range of input values of all features.


#### colorRange

An array of strings to be passed to [d3.scaleLinear.range](https://github.com/d3/d3-scale#linear-scales).
It reflects the range of output colors for all features.


#### renderWhileDragging

If the overlay should redraw when the user is dragging the map. Default `true`.


#### globalOpacity

Opacity of the dots when drawing into the canvas. Default `1`.
