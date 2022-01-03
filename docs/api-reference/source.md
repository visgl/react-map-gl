# Source

![Since v5.1](https://img.shields.io/badge/since-v5.1-green)

This component allows apps to create a [map source](https://docs.mapbox.com/mapbox-gl-js/style-spec/#sources) using React. It may contain [Layer](/docs/api-reference/layer.md) components as children.

```js
import * as React from 'react';
import Map, {Source, Layer} from 'react-map-gl';

const geojson = {
  type: 'FeatureCollection',
  features: [
    {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
  ]
};

const layerStyle = {
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
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
    <Source id="my-data" type="geojson" data={geojson}>
      <Layer {...layerStyle} />
    </Source>
  </Map>;
}
```

## Properties

The props provided to this component should be conforming to the [Mapbox source specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/#sources)or [CanvasSourceOptions](https://docs.mapbox.com/mapbox-gl-js/api/#canvassourceoptions).

When props change _shallowly_, the component will attempt to update the source. Do not define objects/arrays inline to avoid perf hit.

Once a `<Source>` is mounted, the following props should not change. If add/remove multiple JSX sources dynamically, make sure you use React's [key prop](https://reactjs.org/docs/lists-and-keys.html#keys) to give each element a stable identity.

#### id: string

Unique identifier of the source. If not provided, a default id will be assigned.

#### type: string

Required. Type of the source.

## Source

[source.js](https://github.com/visgl/react-map-gl/tree/7.0-dev/src/components/source.ts)
