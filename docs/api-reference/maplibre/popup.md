# Popup

React component that wraps maplibre-gl's [Popup](https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/) class.


```tsx
import * as React from 'react';
import {useState} from 'react';
import {Map, Popup} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

function App() {
  const [showPopup, setShowPopup] = useState<boolean>(true);

  return <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    mapStyle="https://demotiles.maplibre.org/style.json"
  >
    {showPopup && (
      <Popup longitude={-100} latitude={40}
        anchor="bottom"
        onClose={() => setShowPopup(false)}>
        You are here
      </Popup>)}
  </Map>;
}
```


## Properties

### Reactive Properties

#### `anchor`: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | undefined {#anchor}

A string indicating the part of the popup that should be positioned closest to the coordinate, set via `longitude` and `latitude`. 
If unset, the anchor will be dynamically set to ensure the popup falls within the map container with a preference for `'bottom'`.

#### `className`: string {#classname}

Space-separated CSS class names to add to popup container.

#### `offset`: number | [PointLike](./types.md#pointlike) | Record\<string, [PointLike](./types.md#pointlike)\> {#offset}

Default: `null`

A pixel offset applied to the popup's location specified as:

- a single number specifying a distance from the popup's location
- a PointLike specifying a constant offset
- an object of Points specifing an offset for each anchor position.

Negative offsets indicate left and up.

#### `maxWidth`: string {#maxwidth}

Default: `240px`

A string that sets the CSS property of the popup's maximum width.

#### `style`: CSSProperties {#style}

CSS style override that applies to the popup's container.

### Callbacks

#### `onOpen`: (evt: [PopupEvent](./types.md#popupevent)) => void {#onopen}

Called when the popup is opened.

#### `onClose`: (evt: [PopupEvent](./types.md#popupevent)) => void {#onclose}

Called when the popup is closed by the user clicking on the close button or outside (if `closeOnClick: true`).


### Other Properties

The properties in this section are not reactive. They are only used when the component first mounts.

Any [options](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/PopupOptions/) supported by the `Popup` class, such as

- `closeButton`
- `closeOnClick`
- `closeOnMove`
- `focusAfterOpen`


## Methods

The underlying native `Popup` instance is accessible via a [React ref](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) hook.
You may use it to call any imperative methods:


```tsx
import * as React from 'react';
import {useRef, useEffect} from 'react';
import {Map, Popup} from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';

function App() {
  const popupRef = useRef<maplibregl.Popup>();

  useEffect(() => {
    popupRef.current?.trackPointer();
  }, [popupRef.current])

  return <Map>
    <Popup longitude={-122.4} latitude={37.8} ref={popupRef} >
      Tooltip
    </Popup>
  </Map>;
}
```


## Source

[popup.ts](https://github.com/visgl/react-map-gl/tree/master/modules/maplibre/src/components/popup.ts)
