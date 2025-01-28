# LogoControl

React component that wraps maplibre-gl's [LogoControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/LogoControl/) class.

```tsx
import * as React from 'react';
import {Map, LogoControl} from 'react-map-gl/maplibre';
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
    <LogoControl />
  </Map>;
}
```


## Properties

### Reactive Properties

#### `style`: CSSProperties {#style}

CSS style override that applies to the control's container.


### Other Properties

The properties in this section are not reactive. They are only used when the component first mounts.
  
Any [options](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/LogoControlOptions/) supported by the `LogoControl` class, such as

- `compact`

Plus the following:

#### `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' {#position}

Default: `'top-right'`

Placement of the control relative to the map.


## Source

[logo-control.ts](https://github.com/visgl/react-map-gl/tree/master/modules/maplibre/src/components/logo-control.ts)
