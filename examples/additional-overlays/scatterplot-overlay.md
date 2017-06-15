# Scatter Plot Overlay

This is an example overlay that draws a scatterplot over a map using canvas. Adjust the more interesting props using the controls below.


```js
const ScatterplotOverlay = require('./scatterplot-overlay');

<MapGL {...viewport} mapStyle={mapStyle}>
    <ScatterplotOverlay
      locations={this.state.locations}
      dotRadius={1}
      globalOpacity={0.8}
      compositeOperation="lighter"
      dotFill="blue"
      renderWhileDragging={true}
    />
</MapGL>
```

## Props

#### locations
An [ImmutableJS](https://facebook.github.io/immutable-js/) [List](https://facebook.github.io/immutable-js/docs/#/List) of points.

```js
const locations = Immutable.fromJS([
  [-122.39851786165565, 37.78736425435588],
  [-122.40015469418074, 37.78531678199267],
  [-122.4124101516789, 37.80051001607987],
  // ...
]);
```

#### lngLatAccessor

Use the `lngLatAccessor` prop to provide the location in a custom format. It's called with each location as the first argument. Here's the default `lngLatAccessor`.

```js
function lngLatAccessor(location) {
  return [location.get(0), location.get(1)];
}
```

#### renderWhileDragging

If the overlay should redraw when the user is dragging the map. Default `true`.

#### dotRadius

Radius of the dots. Default `4`.

#### dotFill

Color of the dots. Default `#1FBAD6`.

#### globalOpacity

Opacity of the dots when drawing into the canvas. Default `1`.

#### compositeOperation

`globalCompositeOperation` of the canvas. This prop can be used to control blending modes.
Default `source-over`.
