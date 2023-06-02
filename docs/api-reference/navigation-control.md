# NavigationControl

React component that wraps the base library's `NavigationControl` class ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/markers/#navigationcontrol) | [Maplibre](https://maplibre.org/maplibre-gl-js-docs/api/markers/#navigationcontrol)).


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```tsx
import * as React from 'react';
import Map, {NavigationControl} from 'react-map-gl';

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
    <NavigationControl />
  </Map>;
}
```

  </TabItem>
  <TabItem value="maplibre" label="Maplibre">


```tsx
import * as React from 'react';
import Map, {NavigationControl} from 'react-map-gl/maplibre';

function App() {
  return <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_key"
  >
    <NavigationControl />
  </Map>;
}
```

  </TabItem>
</Tabs>


## Properties

### Reactive Properties

#### `style`: CSSProperties {#style}

CSS style override that applies to the control's container.

### Other Properties

The properties in this section are not reactive. They are only used when the component first mounts.

Any options supported by the `NavigationControl` class ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/markers/#navigationcontrol) | [Maplibre](https://maplibre.org/maplibre-gl-js-docs/api/markers/#navigationcontrol)), such as

- `showCompass`
- `showZoom`
- `visualizePitch`

Plus the following:

#### `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' {#position}

Default: `'top-right'`

Placement of the control relative to the map.


## Source

[navigation-control.ts](https://github.com/visgl/react-map-gl/tree/7.0-release/src/components/navigation-control.ts)
