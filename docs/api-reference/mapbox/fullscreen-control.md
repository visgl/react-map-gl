# FullscreenControl

React component that wraps mapbox-gl's [FullscreenControl](https://docs.mapbox.com/mapbox-gl-js/api/markers/#fullscreencontrol) class.

```tsx
import * as React from 'react';
import Map, {FullscreenControl} from 'react-map-gl/mapbox';
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
    <FullscreenControl />
  </Map>;
}
```


## Properties

### Reactive Properties

#### `style`: CSSProperties {#style}

CSS style override that applies to the control's container.


### Other Properties

The properties in this section are not reactive. They are only used when the component first mounts.

#### `containerId`: string {#containerid}

Id of the DOM element which should be made full screen. By default, the map container element will be made full screen.
  
#### `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' {#position}

Default: `'top-right'`

Placement of the control relative to the map.


## Source

[fullscreen-control.ts](https://github.com/visgl/react-map-gl/tree/7.1-release/src/components/fullscreen-control.tsx)
