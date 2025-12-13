# NavigationControl

React component that wraps mapbox-gl's [NavigationControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#navigationcontrol) class.

```tsx
import * as React from 'react';
import Map, {NavigationControl} from 'react-map-gl/mapbox';
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
    <NavigationControl />
  </Map>;
}
```


## Properties

### Reactive Properties

#### `style`: CSSProperties {#style}

CSS style override that applies to the control's container.

### Other Properties

The properties in this section are not reactive. They are only used when the component first mounts.

Any options supported by the `NavigationControl` class ([Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/markers/#navigationcontrol) | [Maplibre](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/NavigationControlOptions/)), such as

- `showCompass`
- `showZoom`
- `visualizePitch`

Plus the following:

#### `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' {#position}

Default: `'top-right'`

Placement of the control relative to the map.


## Source

[navigation-control.ts](https://github.com/visgl/react-map-gl/tree/8.0-release/modules/react-mapbox/src/components/navigation-control.ts)
