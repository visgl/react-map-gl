# Source

![Since v5.1](https://img.shields.io/badge/since-v5.1-green)

This component allows apps to create a [map source](https://docs.mapbox.com/mapbox-gl-js/style-spec/#sources) using React. It may contain [Layer](/docs/api-reference/layer.md) components as children.

```js
import * as React from 'react';
import ReactMapGL, {Source, Layer} from 'react-map-gl';

const EMPTY_STYLE = {
  version: 8,
  sources: {},
  layers: []
};

const geojson = {
  type: 'FeatureCollection',
  features: [
    {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
  ]
};

class Map extends React.Component {
  render() {
    return (
      <ReactMapGL latitude={37.78} longitude={-122.41} zoom={8} mapStyle={EMPTY_STYLE}>
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer
            id="point"
            type="circle"
            paint={{
              'circle-radius': 10,
              'circle-color': '#007cbf'
            }} />
        </Source>
      </ReactMapGL>
    );
  }
}
```

## Properties

The props provided to this component should be conforming to the [Mapbox source specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/#sources)or [CanvasSourceOptions](https://docs.mapbox.com/mapbox-gl-js/api/#canvassourceoptions).

[mapStyle](https://visgl.github.io/react-map-gl/docs/api-reference/static-map#mapstyle) defaults to `mapbox://styles/mapbox/light-v8` which requires a token, to use an empty base map, you need to override the prop. See the `EMPTY_STYLE` object in the example.

When props change _shallowly_, the component will attempt to update the source. Do not define objects/arrays inline to avoid perf hit.

Once a `<Source>` is mounted, the following props should not change. If add/remove multiple JSX sources dynamically, make sure you use React's [key prop](https://reactjs.org/docs/lists-and-keys.html#keys) to give each element a stable identity.

##### `id` (String)

Unique identifier of the source. If not provided, a default id will be assigned.

##### `type` (String, required)

Type of the source.

## Source

[source.js](https://github.com/visgl/react-map-gl/tree/5.2-release/src/components/source.js)
