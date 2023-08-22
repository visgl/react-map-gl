# Marker

React component that wraps the base library's `Marker` class ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker) | [Maplibre](https://maplibre.org/maplibre-gl-js-docs/api/markers/#marker)).


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```tsx
import * as React from 'react';
import Map, {Marker} from 'react-map-gl';

function App() {
  return <Map
    mapboxAccessToken="<Mapbox access token>"
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
    <Marker longitude={-100} latitude={40} anchor="bottom" >
      <img src="./pin.png" />
    </Marker>
  </Map>;
}
```

  </TabItem>
  <TabItem value="maplibre" label="Maplibre">


```tsx
import * as React from 'react';
import Map, {Marker} from 'react-map-gl/maplibre';

function App() {
  return <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_key"
  >
    <Marker longitude={-100} latitude={40} anchor="bottom" >
      <img src="./pin.png" />
    </Marker>
  </Map>;
}
```

  </TabItem>
</Tabs>

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

The offset in pixels as a [PointLike](https://docs.mapbox.com/mapbox-gl-js/api/geography/#pointlike) object to apply relative to the element's center. Negatives indicate left and up.

#### `pitchAlignment`: 'map' | 'viewport' | 'auto' {#pitchalignment}

Default: `'auto'`

- `map` aligns the `Marker` to the plane of the map.
- `viewport` aligns the `Marker` to the plane of the viewport.
- `auto` automatically matches the value of `rotationAlignment`.

#### `popup`: Popup | null {#popup}

An instance of the `Popup` class ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup) | [Maplibre](https://maplibre.org/maplibre-gl-js-docs/api/markers/#popup)) to attach to this marker. If undefined or null, any popup set on this Marker instance is unset.

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

Any options supported by the `Marker` class ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker) | [Maplibre](https://maplibre.org/maplibre-gl-js-docs/api/markers/#marker)), such as

- `anchor`
- `color`
- `scale`
- `clickTolerance`


## Methods

The underlying native `Marker` instance is accessible via a [React ref](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) hook.
You may use it to call any imperative methods:

<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```tsx
import * as React from 'react';
import {useRef, useMemo, useCallback} from 'react';
import Map, {Marker} from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

function App() {
  const markerRef = useRef<mapboxgl.Marker>();

  const popup = useMemo(() => {
    return mapboxgl.Popup().setText('Hello world!');
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

  </TabItem>
  <TabItem value="maplibre" label="Maplibre">


```tsx
import * as React from 'react';
import {useRef, useMemo, useCallback} from 'react';
import Map, {Marker} from 'react-map-gl/maplibre';
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

  </TabItem>
</Tabs>

## Source

[marker.ts](https://github.com/visgl/react-map-gl/tree/7.0-release/src/components/marker.ts)
