# Layer

This component allows apps to create a [map layer](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers) using React.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="map-library">
  <TabItem value="mapbox" label="Mapbox">

```tsx
import * as React from 'react';
import Map, {Layer} from 'react-map-gl';
import type {FillLayer} from 'react-map-gl';

const parkLayer: FillLayer = {
  id: 'landuse_park',
  type: 'fill',
  source: 'mapbox',
  'source-layer': 'landuse',
  filter: ['==', 'class', 'park'],
  paint: {
    'fill-color': '#4E3FC8'
  }
};

function App() {
  return <Map
    mapboxAccessToken="<Mapbox access token>"
    initialViewState={{
      longitude: -122.4,
      latitude: 37.8,
      zoom: 14
    }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
    <Layer {...parkLayer} />
  </Map>;
}
```

  </TabItem>
  <TabItem value="maplibre" label="Maplibre">


```tsx
import * as React from 'react';
import Map, {Layer} from 'react-map-gl/maplibre';
import type {FillLayer} from 'react-map-gl/maplibre';

const parkLayer: FillLayer = {
  id: 'landuse_park',
  type: 'fill',
  source: 'mapbox',
  'source-layer': 'landuse',
  filter: ['==', 'class', 'park'],
  paint: {
    'fill-color': '#4E3FC8'
  }
};

function App() {
  return <Map
    initialViewState={{
      longitude: -122.4,
      latitude: 37.8,
      zoom: 14
    }}
    mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_key"
  >
    <Layer {...parkLayer} />
  </Map>;
}
```

  </TabItem>
</Tabs>

## Properties

The props provided to this component should be conforming to the [Mapbox layer specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers).

When props change *shallowly*, the component will perform style diffing to update the layer. Avoid defining constant objects/arrays inline may help performance.

### Identity Properties

Once a `<Layer>` is mounted, the following props should not change. If you add/remove multiple JSX layers dynamically, make sure you use React's [key prop](https://reactjs.org/docs/lists-and-keys.html#keys) to give each element a stable identity.

#### `id`: string {#id}

Unique identifier of the layer. If not provided, a default id will be assigned.

#### `type`: string {#type}

Required. Type of the layer.

### Options

#### `beforeId`: string {#beforeid}

The ID of an existing layer to insert this layer before. If this prop is omitted, the layer will be appended to the end of the layers array. This is useful when using dynamic layers with a map style from a URL.

Note that layers are added by the order that they mount. They are *NOT* reordered later if their relative positions in the JSX tree change. If dynamic reordering is desired, you should manipulate `beforeId` for consistent behavior.

#### `source`: string {#source}

`source` is required by some layer types in the Mapbox style specification. If `<Layer>` is used as the child of a [Source](./source.md) component, this prop will be overwritten by the id of the parent source.


## Source

[layer.ts](https://github.com/visgl/react-map-gl/tree/7.0-release/src/components/layer.ts)
