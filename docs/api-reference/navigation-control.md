# NavigationControl

React component that wraps [NavigationControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#navigationcontrol).

```js
import * as React from 'react';
import Map, {NavigationControl} from 'react-map-gl';

function App() {
  return <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
    <NavigationControl />
  </Map>;
}
```

## Properties

Note that the following properties are not reactive. They are only used when the component first mounts.

#### position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

Default: `'top-right'`

Placement of the control relative to the map.

#### showCompass: boolean

Default: `true`

If `true` the compass button is included.

#### showZoom: boolean

Default: `true`

If true the zoom-in and zoom-out buttons are included.

#### visualizePitch: boolean

Default: `false`

If `true` the pitch is visualized by rotating X-axis of compass.


## Source

[navigation-control.ts](https://github.com/visgl/react-map-gl/tree/7.0-dev/src/components/navigation-control.ts)
