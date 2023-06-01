# ScaleControl

React component that wraps the base library's `ScaleControl` class ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/markers/#scalecontrol) | [Maplibre](https://maplibre.org/maplibre-gl-js-docs/api/markers/#scalecontrol)).


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```tsx
import * as React from 'react';
import Map, {ScaleControl} from 'react-map-gl';

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


  </TabItem>
  <TabItem value="maplibre" label="Maplibre">


```tsx
import * as React from 'react';
import Map, {ScaleControl} from 'react-map-gl/maplibre';

function App() {
  return <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_key"
  >
    <ScaleControl />
  </Map>;
}
```

  </TabItem>
</Tabs>


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

[scale-control.ts](https://github.com/visgl/react-map-gl/tree/7.0-release/src/components/scale-control.ts)
