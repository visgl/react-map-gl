# ScaleControl

React component that wraps maplibre-gl's [ScaleControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/ScaleControl/) class.

```tsx
import * as React from 'react';
import {Map, ScaleControl} from 'react-map-gl/maplibre';
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

[scale-control.ts](https://github.com/visgl/react-map-gl/tree/8.0-release/modules/react-maplibre/src/components/scale-control.ts)
