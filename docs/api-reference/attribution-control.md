# AttributionControl

React component that wraps [AttributionControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#attributioncontrol).

```js
import * as React from 'react';
import Map, {AttributionControl} from 'react-map-gl';

function App() {
  return <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    {
      // disable the default attribution
    }
    attributionControl={false}
  >
    <AttributionControl customAttribution="Map design by me" />
  </Map>;
}
```

## Properties

Note that the following properties are not reactive. They are only used when the component first mounts.

#### `compact`: boolean | undefined

- If `true` , force a compact attribution that shows the full attribution on mouse hover.
- If `false` , force the full attribution control.
- If unset, shows a responsive attribution that collapses when the map is less than 640 pixels wide.

Note that your attribution must adhere to Mapbox's [guidelines](https://docs.mapbox.com/help/getting-started/attribution/).

#### `customAttribution`: string | string[]

String or strings to show in addition to any other attributions.

#### `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

Default: `'bottom-right'`

Placement of the control relative to the map.

#### `style`: CSSProperties

CSS style override that applies to the control's container.

## Source

[attribution-control.ts](https://github.com/visgl/react-map-gl/tree/7.0-release/src/components/attribution-control.ts)
