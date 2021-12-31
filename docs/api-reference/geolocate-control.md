# GeolocateControl

![Since v7.0](https://img.shields.io/badge/since-v7.0-green)

React component that wraps [GeolocateControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocateControl).

```js
import * as React from 'react';
import {Map, GeolocateControl} from 'react-map-gl';

function App() {
  return <Map
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

## Methods

#### trigger(): boolean

Trigger a geolocation event.

Returns: `true` if successful.


## Properties

Note that the following properties are not reactive. They are only used when the component first mounts.

### Tracking options

#### positionOptions: PositionOptions

A Geolocation API [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) object

#### trackUserLocation: boolean

Default: `false`

If `true` the GeolocateControl becomes a toggle button and when active the map will receive updates to the user's location as it changes. 

### Render options

#### fitBoundsOptions: FitBoundsOptions

Default: `{maxZoom: 15}`

A ([fitBounds](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#fitbounds)) options object to use when the map is panned and zoomed to the user's location.

#### position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

Default: `'top-right'`

Placement of the control relative to the map.

#### showAccuracyCircle: boolean

Default: `true`

Draw a transparent circle will be drawn around the user location indicating the accuracy (95% confidence level) of the user's location. Set to `false` to disable. 
This only has effect if `showUserLocation` is `true`. 

#### showUserHeading: boolean

Default: `false`

If `true`, an arrow will be drawn next to the user location dot indicating the device's heading.
This only has affect when `trackUserLocation` is `true`.

#### showUserLocation: boolean

Default: `true`

Show a dot on the map at the user's location. Set to `false` to disable.

### Callbacks

#### onGeolocate: (evt: GeolocateEvent) => void

Called on each Geolocation API position update that returned as success.

#### onError: (evt: GeolocateErrorEvent) => void

Called on each Geolocation API position update that returned as an error.

#### onOutOfMaxBounds: (evt: GeolocateEvent) => void

Called on each Geolocation API position update that returned as success but user position is out of map `maxBounds`.

#### onTrackUserLocationStart: (evt: MapboxEvent) => void

Called when the GeolocateControl changes to the active lock state.

#### onTrackUserLocationEnd: (evt: MapboxEvent) => void

Called when the GeolocateControl changes to the background state.
