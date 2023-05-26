# Marker

React component that wraps [Marker](https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker).

```js
import * as React from 'react';
import Map, {Marker} from 'react-map-gl';

function App() {
  return <Map
    mapLib={import('mapbox-gl')}
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

If `Marker` is mounted with child components, then its content will be rendered to the specified location. If it is mounted with no content, then a default marker will be used.

## Properties

### Render options

#### `anchor`: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' {#anchor}

Default: `'center'`

A string indicating the part of the Marker that should be positioned closest to the coordinate set via `longitude` and `latitude`.

#### `color`: string {#color}

Default: `'#3FB1CE'`

The color to use for the default marker if the component contains no content.

#### `clickTolerance`: number {#clicktolerance}

Default: `null` (inherits [Map](./map.md)'s `clickTolerance`)

The max number of pixels a user can shift the mouse pointer during a click on the marker for it to be considered a valid click (as opposed to a marker drag).

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

#### `rotation`: number {#rotation}

Default: `0`

The rotation angle of the marker in degrees, relative to its `rotationAlignment` setting. A positive value will rotate the marker clockwise.

#### `rotationAlignment`: 'map' | 'viewport' | 'auto' {#rotationalignment}

Default: `'auto'`

- `map` aligns the `Marker`'s rotation relative to the map, maintaining a bearing as the map rotates.
- `viewport` aligns the `Marker`'s rotation relative to the viewport, agnostic to map rotations.
- `auto` is equivalent to `viewport`.

#### `scale`: number {#scale}

Default: `1`

The scale to use for the default marker if the component contains no content.
The default scale (`1`) corresponds to a height of `41px` and a width of `27px`.

This prop is not reactive (only used when the marker is mounted).

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


## Source

[marker.ts](https://github.com/visgl/react-map-gl/tree/7.0-release/src/components/marker.ts)
