# Popup


## Properties

![Since v7.0](https://img.shields.io/badge/since-v7.0-green)

React component that wraps [Popup](https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup).

```js
import * as React from 'react';
import {Map, Popup} from 'react-map-gl';

function App() {
  const [showPopup, setShowPopup] = React.useState(true);

  return <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
    {showPopup && (
      <Popup longitude={-100} latitude={40}
        anchor="bottom"
        onClose={() => setShowPopup(false)}>
        You are here
      </Popup>}
  </Map>;
}
```

### Render options

#### anchor: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | undefined

A string indicating the part of the popup that should be positioned closest to the coordinate, set via `longitude` and `latitude`. 
If unset, the anchor will be dynamically set to ensure the popup falls within the map container with a preference for `'bottom'`.

#### className: string

Space-separated CSS class names to add to popup container.

#### closeButton: boolean

Default: `true`

If `true`, a close button will appear in the top right corner of the popup.

#### closeOnClick: boolean

Default: `true`

If `true`, the popup will close when the map is clicked.

#### closeOnMove: boolean

Default: `false`

If `true`, the popup will closed when the map moves.

#### focusAfterOpen: boolean

Default: `true`

If `true`, the popup will try to focus the first focusable element inside the popup.

#### offset: number | PointLike | Record<string, PointLike>

Default: `null`

A pixel offset applied to the popup's location specified as:

- a single number specifying a distance from the popup's location
- a PointLike specifying a constant offset
- an object of Points specifing an offset for each anchor position.

Negative offsets indicate left and up.

#### maxWidth: string

Default: `240px`

A string that sets the CSS property of the popup's maximum width.

### Callbacks

#### onOpen: (evt: MapboxEvent) => void

Called when the popup is opened manually or programatically.

#### onClose: (evt: MapboxEvent) => void

Called when the popup is closed manually or programatically.
