# Source

This component allows apps to create a [map source](https://maplibre.org/maplibre-style-spec/sources/) using React. It may contain [Layer](./layer.md) components as children.


```tsx
import * as React from 'react';
import {Map, Source, Layer} from 'react-map-gl/maplibre';
import type {CircleLayer} from 'react-map-gl/maplibre';
import type {FeatureCollection} from 'geojson';
import 'maplibre-gl/dist/maplibre-gl.css';

const geojson: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
  ]
};

const layerStyle: CircleLayer = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};

function App() {
  return <Map
    initialViewState={{
      longitude: -122.4,
      latitude: 37.8,
      zoom: 14
    }}
    mapStyle="https://demotiles.maplibre.org/style.json"
  >
    <Source id="my-data" type="geojson" data={geojson}>
      <Layer {...layerStyle} />
    </Source>
  </Map>;
}
```


## Properties

The props provided to this component should be conforming to the [Mapbox source specification](https://maplibre.org/maplibre-style-spec/sources/) or [CanvasSourceSpecification](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/CanvasSourceSpecification/).

When props change _shallowly_, the component will attempt to update the source. Do not define objects/arrays inline to avoid perf hit.

Once a `<Source>` is mounted, the following props should not change. If add/remove multiple JSX sources dynamically, make sure you use React's [key prop](https://reactjs.org/docs/lists-and-keys.html#keys) to give each element a stable identity.

#### `id`: string {#id}

Unique identifier of the source. If not provided, a default id will be assigned.

#### `type`: string {#type}

Required. Type of the source.

## Source

[source.ts](https://github.com/visgl/react-map-gl/tree/8.0-release/modules/react-maplibre/src/components/source.ts)
