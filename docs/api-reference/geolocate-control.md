# GeolocateControl

React component that wraps [GeolocateControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocateControl).

```js
import * as React from 'react';
import Map, {GeolocateControl} from 'react-map-gl';

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

Imperative methods are accessible via a [React ref](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) hook:

```js
import * as React from 'react';
import Map, {GeolocateControl} from 'react-map-gl';

function App() {
  const geolocateControlRef = React.useRef();

  React.useEffect(() => {
    geolocateControlRef.current.trigger();
  }, [])

  return <Map><GeolocateControl ref={geolocateControlRef} /></Map>;
}
```

#### trigger(): boolean

Trigger a geolocation event.

Returns: `true` if successful.


## Properties

Note that the following properties are not reactive. They are only used when the component first mounts.

### Tracking options

#### positionOptions: [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions)

A Geolocation API [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) object

#### trackUserLocation: boolean

Default: `false`

If `true` the GeolocateControl becomes a toggle button and when active the map will receive updates to the user's location as it changes. 

### Render options

#### fitBoundsOptions: [FitBoundsOptions](/docs/api-reference/types.md#fitboundsoptions)

Default: `{maxZoom: 15}`

A ([fitBounds](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#fitbounds)) options object to use when the map is panned and zoomed to the user's location.

#### position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

Default: `'top-right'`

Placement of the control relative to the map.

#### style: CSSProperties

CSS style override that applies to the control's container.

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

#### onGeolocate: (evt: [GeolocateResultEvent](/docs/api-reference/types.md#geolocateresultevent)) => void

Called on each Geolocation API position update that returned as success.

#### onError: (evt: [GeolocateErrorEvent](/docs/api-reference/types.md#geolocateerrorevent)) => void

Called on each Geolocation API position update that returned as an error.

#### onOutOfMaxBounds: (evt: [GeolocateResultEvent](/docs/api-reference/types.md#geolocateresultevent)) => void

Called on each Geolocation API position update that returned as success but user position is out of map `maxBounds`.

#### onTrackUserLocationStart: (evt: [GeolocateEvent](/docs/api-reference/types.md#geolocateevent)) => void

Called when the GeolocateControl changes to the active lock state.

#### onTrackUserLocationEnd: (evt: [GeolocateEvent](/docs/api-reference/types.md#geolocateevent)) => void

Called when the GeolocateControl changes to the background state.


## Source

[geolocate-control.ts](https://github.com/visgl/react-map-gl/tree/7.0-dev/src/components/geolocate-control.ts)
