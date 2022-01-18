# ScaleControl

React component that wraps [ScaleControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#scalecontrol).

```js
import * as React from 'react';
import Map, {ScaleControl} from 'react-map-gl';

function App() {
  return <Map
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

#### maxWidth: string

Default: `100`

The maximum length of the scale control in pixels.

#### position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

Default: `'bottom-left'`

Placement of the control relative to the map. Note that this prop is only used when the component first mounts.

#### unit: 'imperial' | 'metric' | 'nautical'

Default: `'metric'`

Unit of the distance.


## Source

[scale-control.ts](https://github.com/visgl/react-map-gl/tree/7.0-dev/src/components/scale-control.ts)
