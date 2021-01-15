# AttributionControl

![Since v5.3](https://img.shields.io/badge/since-v5.3-green)

This is a React equivalent of Mapbox's [AttributionControl](https://docs.mapbox.com/mapbox-gl-js/api/#attributioncontrol).

```js
import * as React from 'react';
import ReactMapGL, {AttributionControl} from 'react-map-gl';

const attributionStyle= {
  right: 0,
  top: 0
};

function App() {
  const [viewport, setViewport] = React.useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14
  });
  return (
    <ReactMapGL {...viewport} width="100vw" height="100vh" onViewportChange={setViewport}
      attributionControl={false} >
      <AttributionControl compact={true} style={attributionStyle} />
    </ReactMapGL>
  );
}
```

## Properties

##### `toggleLabel` (String)

- default: `'Toggle Attribution'`

Label applied to the toggle button.

##### `compact` (Boolean)

If `true`, force a compact attribution that shows the full attribution on mouse hover. If `false`, force the full attribution control. When undefined, shows a responsive attribution that collapses when the map is less than 640 pixels wide.

##### `customAttribution` (String|[String])

String or strings to show in addition to any other attributions.

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

[attribution-control.js](https://github.com/visgl/react-map-gl/tree/6.0-release/src/components/attribution-control.js)
