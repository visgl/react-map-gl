# FullscreenControl

![Since v4.1](https://img.shields.io/badge/since-v4.1-green)

This is a React equivalent of Mapbox's [FullscreenControl](https://www.mapbox.com/mapbox-gl-js/api/#fullscreencontrol).

```js
import * as React from 'react';
import ReactMapGL, {FullscreenControl} from 'react-map-gl';

const fullscreenControlStyle= {
  right: 10,
  top: 10
};

function App() {
  const [viewport, setViewport] = React.useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14
  });
  return (
    <ReactMapGL {...viewport} width="100vw" height="100vh" onViewportChange={setViewport}>
      <FullscreenControl style={fullscreenControlStyle} />
    </ReactMapGL>
  );
}
```

## Properties

##### `container` (HTMLElement)

`container` is the compatible DOM element which should be made full screen. By default, the map container element will be made full screen.

##### `label` (String)

- default: `Toggle fullscreen`

Label applied to the fullscreen control button.

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
[fullscreen-control.js](https://github.com/visgl/react-map-gl/tree/6.0-release/src/components/fullscreen-control.js)

