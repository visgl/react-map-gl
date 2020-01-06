# Layer

![Since v5.1](https://img.shields.io/badge/since-v5.1-green)

This component allows apps to create a [map layer](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers) using React.

```js
import React from 'react';
import ReactMapGL, {Layer} from 'react-map-gl';

const parkLayer = {
  id: 'landuse_park',
  type: 'fill',
  source: 'mapbox',
  'source-layer': 'landuse',
  filter: ['==', 'class', 'park']
};

class Map extends React.Component {
  render() {
    const {parkColor = '#dea'} = this.props;
    return (
      <ReactMapGL latitude={37.78} longitude={-122.41} zoom={8}>
        <Layer {...parkLayer} paint={{'fill-color': parkColor}} />
      </ReactMapGL>
    );
  }
}
```

## Properties

The props provided to this component should be conforming to the [Mapbox layer specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers).

When props change *shallowly*, the component will perform style diffing to update the layer. Avoid defining constant objects/arrays inline may help performance.

### Identity Properties

Once a `<Layer>` is mounted, the following props should not change. If you add/remove multiple JSX layers dynamically, make sure you use React's [key prop](https://reactjs.org/docs/lists-and-keys.html#keys) to give each element a stable identity.

##### `id` {String} (optional)
Unique identifier of the layer. If not provided, a default id will be assigned.

##### `type` {String} (required)
Type of the layer.

### Options

##### `beforeId` {String} (optional)
The ID of an existing layer to insert this layer before. If this prop is omitted, the layer will be appended to the end of the layers array. This is useful when using dynamic layers with a map style from a URL.

Note that layers are added by the order that they mount. They are *NOT* reordered later if their relative positions in the JSX tree change. If dynamic reordering is desired, you should manipulate `beforeId` for consistent behavior.

##### `source` {String} (optional)
`source` is required by some layer types in the Mapbox style specification. If `<Layer>` is used as the child of a [Source](/docs/components/source.md) component, this prop will be overwritten by the id of the parent source.

## Source
[layer.js](https://github.com/uber/react-map-gl/tree/5.2-release/src/components/layer.js)

