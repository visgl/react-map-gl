# AttributionControl

React component that wraps mapbox-gl's [AttributionControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#attributioncontrol) class.

```tsx
import * as React from 'react';
import Map, {AttributionControl} from 'react-map-gl/mapbox';
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
    // disable the default attribution
    attributionControl={false}
  >
    <AttributionControl customAttribution="Map design by me" />
  </Map>;
}
```

## Properties

### Reactive Properties

#### `style`: CSSProperties {#style}

CSS style override that applies to the control's container.

### Other Properties

The properties in this section are not reactive. They are only used when the component first mounts.

Any options supported by the `AttributionControl` class ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/markers/#attributioncontrol) | [Maplibre](https://maplibre.org/maplibre-gl-js/docs/API/classes/AttributionControl/)), such as

- `compact`
- `customAttribution`

Plus the following:

#### `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' {#position}

Default: `'bottom-right'`

Placement of the control relative to the map.


## Source

[attribution-control.ts](https://github.com/visgl/react-map-gl/tree/8.0-release/modules/react-mapbox/src/components/attribution-control.ts)
