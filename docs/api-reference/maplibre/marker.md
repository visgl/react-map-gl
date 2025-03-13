# Marker

React component that wraps maplibre-gl's [Marker](https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/) class.


```tsx
import * as React from 'react';
import {Map, Marker} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

function App() {
  return <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    mapStyle="https://demotiles.maplibre.org/style.json"
  >
    <Marker longitude={-100} latitude={40} anchor="bottom" >
      <img src="./pin.png" />
    </Marker>
  </Map>;
}
```


If `Marker` is mounted with child components, then its content will be rendered to the specified location. If it is mounted with no content, then a default marker will be used.

## Properties

### Reactive Properties

#### `draggable`: boolean {#draggable}

Default: `false`

If `true`, the marker is able to be dragged to a new position on the map.

#### `latitude`: number {#latitude}

Required. The latitude of the anchor location.

#### `longitude`: number {#longitude}

Required. The longitude of the anchor location.

#### `offset`: [PointLike](./types.md#pointlike) {#offset}

Default: `null`

The offset in pixels as a [PointLike](./types.md#pointlike) object to apply relative to the element's center. Negatives indicate left and up.

#### `pitchAlignment`: 'map' | 'viewport' | 'auto' {#pitchalignment}

Default: `'auto'`

- `map` aligns the `Marker` to the plane of the map.
- `viewport` aligns the `Marker` to the plane of the viewport.
- `auto` automatically matches the value of `rotationAlignment`.

#### `popup`: Popup | null {#popup}

An instance of the [Popup](https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/) class to attach to this marker. If undefined or null, any popup set on this Marker instance is unset.

#### `rotation`: number {#rotation}

Default: `0`

The rotation angle of the marker in degrees, relative to its `rotationAlignment` setting. A positive value will rotate the marker clockwise.

#### `rotationAlignment`: 'map' | 'viewport' | 'auto' {#rotationalignment}

Default: `'auto'`

- `map` aligns the `Marker`'s rotation relative to the map, maintaining a bearing as the map rotates.
- `viewport` aligns the `Marker`'s rotation relative to the viewport, agnostic to map rotations.
- `auto` is equivalent to `viewport`.

#### `style`: CSSProperties {#style}

CSS style override that applies to the marker's container.

### Callbacks

#### `onClick`: (evt: [MapEvent](./types.md#mapevent)) => void {#onclick}

Called when the marker is clicked on.

#### `onDragStart`: (evt: [MarkerDragEvent](./types.md#markerdragevent)) => void {#ondragstart}

Called when dragging starts, if `draggable` is `true`.

#### `onDrag`: (evt: [MarkerDragEvent](./types.md#markerdragevent)) => void {#ondrag}

Called while dragging, if `draggable` is `true`.

#### `onDragEnd`: (evt: [MarkerDragEvent](./types.md#markerdragevent)) => void {#ondragend}

Called when dragging ends, if `draggable` is `true`.


### Other Properties

The properties in this section are not reactive. They are only used when the component first mounts.

Any [options](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MarkerOptions/) supported by the `Marker` class, such as

- `anchor`
- `color`
- `scale`
- `clickTolerance`


## Methods

The underlying native `Marker` instance is accessible via a [React ref](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) hook.
You may use it to call any imperative methods:


```tsx
import * as React from 'react';
import {useRef, useMemo, useCallback} from 'react';
import {Map, Marker} from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';

function App() {
  const markerRef = useRef<maplibregl.Marker>();

  const popup = useMemo(() => {
    return maplibregl.Popup().setText('Hello world!');
  }, [])

  const togglePopup = useCallback(() => {
    markerRef.current?.togglePopup();
  }, []);

  return <>
    <Map>
      <Marker longitude={-122.4} latitude={37.8} color="red" popup={popup} ref={markerRef} />
    </Map>
    <button onClick={togglePopup}>Toggle popup</button>
  </>;
}
```

## Source

[marker.ts](https://github.com/visgl/react-map-gl/tree/8.0-release/modules/react-maplibre/src/components/marker.ts)
