# GeolocateControl

React component that wraps maplibre-gl's [GeolocateControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/GeolocateControl/) class.

```tsx
import * as React from 'react';
import {Map, GeolocateControl} from 'react-map-gl/maplibre';
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
    <GeolocateControl />
  </Map>;
}
```


## Properties

### Reactive Properties

#### `style`: CSSProperties {#style}

CSS style override that applies to the control's container.

### Callbacks

#### `onGeolocate`: (evt: [GeolocateResultEvent](./types.md#geolocateresultevent)) => void {#ongeolocate}

Called on each Geolocation API position update that returned as success.

#### `onError`: (evt: [GeolocateErrorEvent](./types.md#geolocateerrorevent)) => void {#onerror}

Called on each Geolocation API position update that returned as an error.

#### `onOutOfMaxBounds`: (evt: [GeolocateResultEvent](./types.md#geolocateresultevent)) => void {#onoutofmaxbounds}

Called on each Geolocation API position update that returned as success but user position is out of map `maxBounds`.

#### `onTrackUserLocationStart`: (evt: [GeolocateEvent](./types.md#geolocateevent)) => void {#ontrackuserlocationstart}

Called when the GeolocateControl changes to the active lock state.

#### `onTrackUserLocationEnd`: (evt: [GeolocateEvent](./types.md#geolocateevent)) => void {#ontrackuserlocationend}

Called when the GeolocateControl changes to the background state.


### Other Properties

The properties in this section are not reactive. They are only used when the component first mounts.

Any [options](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/GeolocateControlOptions/) supported by the `GeolocateControl` class, such as

- `positionOptions`
- `fitBoundsOptions`
- `trackUserLocation`
- `showAccuracyCircle`
- `showUserLocation`

Plus the following:

#### `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' {#position}

Default: `'bottom-right'`

Placement of the control relative to the map.


## Methods

The underlying native `GeolocateControl` instance is accessible via a [React ref](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) hook.
You may use it to call any imperative methods:


```tsx
import * as React from 'react';
import {useRef, useEffect} from 'react';
import {Map, GeolocateControl} from 'react-map-gl/maplibre';
import type maplibregl from 'maplibre-gl';

function App() {
  const geoControlRef = useRef<maplibregl.GeolocateControl>();

  useEffect(() => {
    // Activate as soon as the control is loaded
    geoControlRef.current?.trigger();
  }, [geoControlRef.current]);

  return <Map>
    <GeolocateControl ref={geoControlRef} />
  </Map>;
}
```


## Source

[geolocate-control.ts](https://github.com/visgl/react-map-gl/tree/8.0-release/modules/react-maplibre/src/components/geolocate-control.ts)
