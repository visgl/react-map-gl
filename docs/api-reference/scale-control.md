# Scale Control

![Since v5.2](https://img.shields.io/badge/since-v5.2-green)

This is a React equivalent of Mapbox's [ScaleControl](https://docs.mapbox.com/mapbox-gl-js/api/#scalecontrol).

```js
import * as React from 'react';
import ReactMapGL, {ScaleControl} from 'react-map-gl';

const scaleControlStyle= {
  left: 20,
  bottom: 100
};

function App() {
  const [viewport, setViewport] = React.useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14
  });
  return (
    <ReactMapGL {...viewport} width="100vw" height="100vh" onViewportChange={setViewport}>
      <ScaleControl maxWidth={100} unit="metric" style={scaleControlStyle} />
    </ReactMapGL>
  );
}
```

## Properties

##### `maxWidth` (Number)

- default: `100`

The maximum length of the scale control in pixels.

##### `unit` (String)

- default: `'metric'`

Unit of the distance, one of `'imperial'`, `'metric'` or `'nautical'`.

##### `className` (String)

Assign a custom class name to the container of this control.

##### `style` (Object)

- default: `{position: 'absolute'}`

A [React style](https://reactjs.org/docs/dom-elements.html#style) object applied to this control.

##### `captureScroll` (Boolean)

- default: `false`

Stop propagation of mouse wheel event to the map component. Can be used to stop map from zooming when this component is scrolled.

##### `captureDrag` (Boolean)

- default: `true`

Stop propagation of dragstart event to the map component. Can be used to stop map from panning when this component is dragged.

##### `captureClick` (Boolean)

- default: `true`

Stop propagation of click event to the map component. Can be used to stop map from calling the `onClick` callback when this component is clicked.

##### `captureDoubleClick` (Boolean)

- default: `true`

Stop propagation of dblclick event to the map component. Can be used to stop map from zooming when this component is double clicked.

##### `capturePointerMove` (Boolean)

- default: `false`

Stop propagation of pointermove event to the map component. Can be used to stop map from calling the `onMouseMove` or `onTouchMove` callback when this component is hovered.

## Styling

Like its Mapbox counterpart, this control relies on the mapbox-gl stylesheet to work properly. Make sure to add the stylesheet to your page.

## Source

[scale-control.js](https://github.com/visgl/react-map-gl/tree/6.0-release/src/components/scale-control.js)
