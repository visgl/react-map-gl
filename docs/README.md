# Overview

react-map-gl is a react friendly API wrapper around MapboxGL JS.

## Example

```js
import MapGL from 'react-map-gl';

<MapGL
  width={400}
  height={400}
  latitude={37.7577}
  longitude={-122.4376}
  zoom={8}
  onChangeViewport={viewport => {
    const {latitude, longitude, zoom} = viewport;
    // Optionally call `setState` and use the state to update the map.
  }}
/>
```
