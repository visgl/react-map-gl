# AttributionControl

React component that wraps maplibre-gl's [AttributionControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/AttributionControl/) class.


```tsx
import * as React from 'react';
import {Map, AttributionControl} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

function App() {
  return <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    mapStyle="https://demotiles.maplibre.org/style.json"
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

Any [options](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/AttributionControlOptions/) supported by the `AttributionControl` class, such as

- `compact`
- `customAttribution`

Plus the following:

#### `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' {#position}

Default: `'bottom-right'`

Placement of the control relative to the map.


## Source

[attribution-control.ts](https://github.com/visgl/react-map-gl/tree/8.0-release/modules/react-maplibre/src/components/attribution-control.ts)
