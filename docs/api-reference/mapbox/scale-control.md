# ScaleControl

React component that wraps mapbox-gl's [ScaleControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#scalecontrol) class.

```tsx
import * as React from 'react';
import Map, {ScaleControl} from 'react-map-gl/mapbox';
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
    <ScaleControl />
  </Map>;
}
```


## Properties

### Reactive Properties

#### `maxWidth`: string {#maxwidth}

Default: `100`

The maximum length of the scale control in pixels.

#### `style`: CSSProperties {#style}

CSS style override that applies to the control's container.

#### `unit`: 'imperial' | 'metric' | 'nautical' {#unit}

Default: `'metric'`

Unit of the distance.


### Other Properties

The properties in this section are not reactive. They are only used when the component first mounts.
  
#### `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' {#position}

Default: `'top-right'`

Placement of the control relative to the map.


## Source

[scale-control.ts](https://github.com/visgl/react-map-gl/tree/8.0-release/modules/react-mapbox/src/components/scale-control.ts)
