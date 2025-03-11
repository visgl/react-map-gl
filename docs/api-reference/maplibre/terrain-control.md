# TerrainControl

React component that wraps maplibre-gl's [TerrainControl](https://maplibre.org/maplibre-gl-js/docs/API/classes/TerrainControl/) class.

```tsx
import * as React from 'react';
import {Map, MapStyle, TerrainControl} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

// https://maplibre.org/maplibre-gl-js/docs/examples/3d-terrain/
const MAP_STYLE: MapStyle = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap Contributors',
      maxzoom: 19
    },
    terrainSource: {
      type: 'raster-dem',
      url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
      tileSize: 256
    }
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm'
    }
  ],
  terrain: {
    source: 'terrainSource',
    exaggeration: 1
  },
  sky: {}
};

function App() {
  return <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    mapStyle={MAP_STYLE}
  >
    <TerrainControl />
  </Map>;
}
```


## Properties

### Reactive Properties

#### `style`: CSSProperties {#style}

CSS style override that applies to the control's container.


### Other Properties

The properties in this section are not reactive. They are only used when the component first mounts.
  
Any [options](https://maplibre.org/maplibre-style-spec/terrain/) supported by the `TerrainControl` class, such as

- `source`
- `exageration`

Plus the following:

#### `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' {#position}

Default: `'top-right'`

Placement of the control relative to the map.


## Source

[terrain-control.ts](https://github.com/visgl/react-map-gl/tree/8.0-release/modules/react-maplibre/src/components/terrain-control.ts)
