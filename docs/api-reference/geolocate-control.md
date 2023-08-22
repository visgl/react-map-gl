# GeolocateControl

React component that wraps the base library's `GeolocateControl` class ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol) | [Maplibre](https://maplibre.org/maplibre-gl-js-docs/api/markers/#geolocatecontrol)).


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```tsx
import * as React from 'react';
import Map, {GeolocateControl} from 'react-map-gl';

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

  </TabItem>
  <TabItem value="maplibre" label="Maplibre">

```tsx
import * as React from 'react';
import Map, {GeolocateControl} from 'react-map-gl/maplibre';

function App() {
  return <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_key"
  >
    <GeolocateControl />
  </Map>;
}
```

  </TabItem>
</Tabs>


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

Any options supported by the `GeolocateControl` class ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol) | [Maplibre](https://maplibre.org/maplibre-gl-js-docs/api/markers/#geolocatecontrol)), such as

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

<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```tsx
import * as React from 'react';
import {useRef, useEffect} from 'react';
import Map, {GeolocateControl} from 'react-map-gl';
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

  </TabItem>
  <TabItem value="maplibre" label="Maplibre">


```tsx
import * as React from 'react';
import {useRef, useEffect} from 'react';
import Map, {GeolocateControl} from 'react-map-gl/maplibre';
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

  </TabItem>
</Tabs>


## Source

[geolocate-control.ts](https://github.com/visgl/react-map-gl/tree/7.0-release/src/components/geolocate-control.ts)
