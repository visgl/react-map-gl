# GeolocateControl

React component that wraps [GeolocateControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocateControl).

```js
import * as React from 'react';
import Map, {GeolocateControl} from 'react-map-gl';

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
  const geolocateControlRef = React.useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  return <Map><GeolocateControl ref={geolocateControlRef} /></Map>;
}
```

#### `trigger()`: boolean {#trigger}

Trigger a geolocation event.

Returns: `true` if successful.


## Properties

Note that the following properties are not reactive. They are only used when the component first mounts.

### Tracking options

#### `positionOptions`: [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) {#positionoptions}

A Geolocation API [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) object

#### `trackUserLocation`: boolean {#trackuserlocation}

Default: `false`

If `true` the GeolocateControl becomes a toggle button and when active the map will receive updates to the user's location as it changes. 

### Render options

#### `fitBoundsOptions`: [FitBoundsOptions](./types.md#fitboundsoptions) {#fitboundsoptions}

Default: `{maxZoom: 15}`

A ([fitBounds](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#fitbounds)) options object to use when the map is panned and zoomed to the user's location.

#### `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' {#position}

Default: `'top-right'`

Placement of the control relative to the map.

#### `style`: CSSProperties {#style}

CSS style override that applies to the control's container.

#### `showAccuracyCircle`: boolean {#showaccuracycircle}

Default: `true`

Draw a transparent circle will be drawn around the user location indicating the accuracy (95% confidence level) of the user's location. Set to `false` to disable. 
This only has effect if `showUserLocation` is `true`. 

#### `showUserHeading`: boolean {#showuserheading}

Default: `false`

If `true`, an arrow will be drawn next to the user location dot indicating the device's heading.
This only has affect when `trackUserLocation` is `true`.

#### `showUserLocation`: boolean {#showuserlocation}

Default: `true`

Show a dot on the map at the user's location. Set to `false` to disable.

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


## Source

[geolocate-control.ts](https://github.com/visgl/react-map-gl/tree/7.0-release/src/components/geolocate-control.ts)
