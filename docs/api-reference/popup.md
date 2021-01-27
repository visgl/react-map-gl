# Popup

![Since v3.0](https://img.shields.io/badge/since-v3.0-green)

This is a React equivalent of Mapbox's [Popup Control](https://www.mapbox.com/mapbox-gl-js/api/#popup), which can be used to
show tooltip popups with custom HTML content at specific locations on the map.

```js
import * as React from 'react';
import ReactMapGL, {Popup} from 'react-map-gl';

function App() {
  const [viewport, setViewport] = React.useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14
  });
  const [showPopup, togglePopup] = React.useState(false);

  return (
    <ReactMapGL {...viewport} width="100vw" height="100vh" onViewportChange={setViewport}>
      {showPopup && <Popup
          latitude={37.78}
          longitude={-122.41}
          closeButton={true}
          closeOnClick={false}
          onClose={() => togglePopup(false)}
          anchor="top" >
          <div>You are here</div>
        </Popup>}
    </ReactMapGL>
  );
}
```

## Properties

##### `latitude` (Number, required)

Latitude of the anchor.

##### `longitude` (Number, required)

Longitude of the anchor.

##### `altitude` (Number)

- default: `0`

Altitude of the anchor.

##### `offsetLeft` (Number)

- default: `0`

Offset of the anchor from the left in pixels, negative number indicates left.

##### `offsetTop` (Number)

- default: `0`

Offset of the anchor from the top in pixels, negative number indicates up.

##### `closeButton` (Boolean)

- default: `true`

If `true`, a close button will appear in the top right corner of the popup.

##### `closeOnClick` (Boolean)

- default: `true`

If `true`, the popup will closed when the map is clicked.

##### `tipSize` (Number)

- default: `10`

Size of the tip pointing to the coordinate.

##### `anchor` (String)

- default: `bottom`

A string indicating the popup's position relative to the coordinate.
Options are `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, and `bottom-right`.

##### `dynamicPosition` (Boolean)

- default: `true`

If `true`, the anchor will be dynamically adjusted to ensure the popup falls within the map container.

##### `sortByDepth` (Boolean)

- default: `false`

If `true`, the order of the popups will be dynamically rearranged to ensure that the ones anchored closer to the camera are rendered on top. Useful when showing multiple popups in a tilted map.

##### `onClose` (Function)

Callback when the user closes the popup.

##### `className` (String)

Assign a custom class name to the container of this control.

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

[popup.js](https://github.com/visgl/react-map-gl/tree/5.3-release/src/components/popup.js)

