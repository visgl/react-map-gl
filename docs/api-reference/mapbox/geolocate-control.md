# GeolocateControl

React component that wraps mapbox-gl's [GeolocateControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol) class.

```tsx
import * as React from 'react';
import Map, {GeolocateControl} from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

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

Any options supported by the `GeolocateControl` class ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol) | [Maplibre](https://maplibre.org/maplibre-gl-js/docs/API/classes/GeolocateControl/)), such as

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
import Map, {GeolocateControl} from 'react-map-gl/mapbox';
import type mapboxgl from 'mapbox-gl';

function App() {
  const geoControlRef = useRef<mapboxgl.GeolocateControl>();

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

[geolocate-control.ts](https://github.com/visgl/react-map-gl/tree/8.0-release/modules/react-mapbox/src/components/geolocate-control.ts)
